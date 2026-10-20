/**
 * Rules for "Help me woorden vinden". Pure functions, no DOM, no storage, no network: the
 * same module runs in the browser, in `node --test` and in validate-content.
 *
 * The result never contains a score, percentage, verdict or label. Route order only decides
 * which reading suggestions come first; the counts are never shown.
 *
 * @typedef {'concern' | 'danger' | 'crisis'} Safety
 * @typedef {{ id: string, label: string, ack?: string, routes: string[], exclusive?: boolean, safety?: Safety }} Option
 * @typedef {{ id: string, prompt: string, hint?: string, multiple: boolean, options: Option[] }} Question
 * @typedef {{ id: string, title: string, recognition: string, feelings: string[], patterns: string[], reflections: string[], next: string[] }} Route
 * @typedef {{ reading: string[], reflections: string[], next: string[] }} General
 * @typedef {{ questions: Question[], routes: Route[], general: General, empty: string, safety: Record<Safety, string> }} Model
 * @typedef {Record<string, string[]>} Answers question id → chosen option ids
 * @typedef {{ href: string, title: string, text?: string }} Page
 */

export const limits = { routes: 3, feelings: 3, patterns: 5, reflections: 3, next: 4 };
const safetyOrder = ['crisis', 'danger', 'concern'];

const unique = (values) => [...new Set(values)];

/**
 * Drops unknown questions and options, collapses single-choice questions to one answer and
 * lets an exclusive option ("Geen van deze") win over the others.
 * @param {Model} model
 * @param {Answers} answers
 * @returns {Answers}
 */
export const cleanAnswers = (model, answers = {}) => {
  /** @type {Answers} */
  const clean = {};
  for (const question of model.questions) {
    const known = new Map(question.options.map((option) => [option.id, option]));
    let chosen = unique((answers[question.id] ?? []).filter((id) => known.has(id)));
    const exclusive = chosen.filter((id) => known.get(id)?.exclusive);
    if (exclusive.length > 0) chosen = [exclusive.at(-1)];
    if (!question.multiple) chosen = chosen.slice(-1);
    if (chosen.length > 0) clean[question.id] = chosen;
  }
  return clean;
};

/**
 * @param {Model} model
 * @param {Answers} answers
 */
export const buildResult = (model, answers) => {
  const clean = cleanAnswers(model, answers);
  const chosen = model.questions.flatMap((question) =>
    (clean[question.id] ?? []).map(
      (id) => /** @type {Option} */ (question.options.find((option) => option.id === id)),
    ),
  );
  const acknowledged = chosen.flatMap((option) => (option.ack ? [option.ack] : []));

  const weight = new Map();
  for (const option of chosen)
    for (const route of option.routes) weight.set(route, (weight.get(route) ?? 0) + 1);
  const routeOrder = model.routes.map((route) => route.id);
  const routes = [...weight.keys()]
    .sort((a, b) => weight.get(b) - weight.get(a) || routeOrder.indexOf(a) - routeOrder.indexOf(b))
    .slice(0, limits.routes)
    .map((id) => /** @type {Route} */ (model.routes.find((route) => route.id === id)));

  const present = new Set(chosen.flatMap((option) => (option.safety ? [option.safety] : [])));
  const safety = safetyOrder.filter((level) => present.has(level));

  // Take the first item of every route, then the second, so each route gets a turn.
  const roundRobin = (pick, max) => {
    const lists = routes.map(pick);
    const longest = Math.max(0, ...lists.map((list) => list.length));
    const merged = [];
    for (let index = 0; index < longest; index += 1)
      for (const list of lists) if (list[index]) merged.push(list[index]);
    return unique(merged).slice(0, max);
  };

  const empty = acknowledged.length === 0 && routes.length === 0;
  return {
    empty,
    acknowledged,
    safety,
    safetyTexts: safety.map((level) => model.safety[level]),
    routes: routes.map(({ id, title, recognition }) => ({ id, title, recognition })),
    feelings: roundRobin((route) => route.feelings, limits.feelings),
    patterns: routes.length
      ? roundRobin((route) => route.patterns, limits.patterns)
      : model.general.reading,
    reflections: routes.length
      ? roundRobin((route) => route.reflections, limits.reflections)
      : model.general.reflections.slice(0, limits.reflections),
    next: unique([...roundRobin((route) => route.next, limits.next), ...model.general.next]).slice(
      0,
      limits.next + model.general.next.length,
    ),
  };
};

/**
 * Every rule the content must follow so the UI and the result stay valid.
 * @param {Model} model
 * @param {Set<string>} publishedKeys translationKeys of published pages
 * @returns {string[]} problems, empty when the model is valid
 */
export const validateModel = (model, publishedKeys) => {
  const problems = [];
  const routeIds = new Set(model.routes.map((route) => route.id));
  if (routeIds.size !== model.routes.length) problems.push('route ids must be unique');
  const questionIds = new Set(model.questions.map((question) => question.id));
  if (questionIds.size !== model.questions.length) problems.push('question ids must be unique');
  if (model.questions.length < 5 || model.questions.length > 7)
    problems.push(`expected 5–7 questions, found ${model.questions.length}`);
  const optionIds = new Set();
  const used = new Set();
  for (const question of model.questions) {
    for (const option of question.options) {
      if (optionIds.has(option.id)) problems.push(`option id "${option.id}" is used twice`);
      optionIds.add(option.id);
      if (!option.exclusive && !option.ack)
        problems.push(`option "${option.id}" needs an acknowledgement (ack)`);
      for (const route of option.routes) {
        used.add(route);
        if (!routeIds.has(route))
          problems.push(`option "${option.id}" uses unknown route ${route}`);
      }
    }
  }
  for (const route of model.routes) {
    if (!used.has(route.id)) problems.push(`route "${route.id}" is never reachable`);
    if (route.reflections.length < 2 || route.reflections.length > 3)
      problems.push(`route "${route.id}" needs 2–3 reflection questions`);
    if (route.patterns.length === 0) problems.push(`route "${route.id}" needs reading links`);
  }
  const keys = [
    ...model.routes.flatMap((route) => [...route.feelings, ...route.patterns, ...route.next]),
    ...model.general.reading,
    ...model.general.next,
  ];
  for (const key of unique(keys))
    if (!publishedKeys.has(key)) problems.push(`"${key}" is not a published page`);
  // Negations such as "geen score" are allowed; the claims themselves are not.
  const text = JSON.stringify(model).replace(/\bgeen (?:score|percentage|uitslag)\b/gi, '');
  for (const [pattern, reason] of [
    [/\d+\s?%|\bprocent\b|\bpercentage\b/i, 'percentages'],
    [/\bscore\b|\buitslag\b|\brisico(?:score|klasse)\b/i, 'scores or verdicts'],
    [/\b(?:is|zijn) (?:een )?(?:narcist|sociopaat|psychopaat)\b/i, 'labels a person'],
    [/\bje bent (?:\w+ )?(?:misbruikt|slachtoffer)\b/i, 'verdicts'],
  ])
    if (pattern.test(text)) problems.push(`content contains ${reason}`);
  return problems;
};

/**
 * Plain-text card for the local download. Pages resolve to absolute URLs via `toUrl`.
 * @param {ReturnType<typeof buildResult>} result
 * @param {Record<string, Page>} pages
 * @param {{ toUrl: (href: string) => string, notes?: { question: string, answer: string }[], help: string[] }} options
 */
export const resultToText = (result, pages, { toUrl, notes = [], help }) => {
  const line = (key) => (pages[key] ? `- ${pages[key].title}: ${toUrl(pages[key].href)}` : '');
  const section = (title, rows) =>
    rows.filter(Boolean).length ? [title, ...rows.filter(Boolean), ''] : [];
  return [
    'Ongehoord · Mijn overzicht',
    'Gemaakt in je eigen browser. Niet opgeslagen en niet verstuurd.',
    'Dit is geen test, geen uitslag en geen diagnose.',
    '',
    ...section('Hulp', [...result.safetyTexts, ...help]),
    ...section(
      'Wat je herkende',
      result.acknowledged.map((text) => `- ${text}`),
    ),
    ...section(
      'Mogelijke patronen om over te lezen',
      result.routes.map((route) => `- ${route.title}: ${route.recognition}`),
    ),
    ...section('Om verder te lezen', [...result.feelings, ...result.patterns].map(line)),
    ...section(
      'Vragen om bij stil te staan',
      result.reflections.map((question) => `- ${question}`),
    ),
    ...section('Mogelijke volgende stappen', result.next.map(line)),
    ...section(
      'Wat ik eigenlijk heb meegemaakt',
      notes
        .filter((note) => note.answer.trim())
        .map((note) => `${note.question}\n${note.answer.trim()}\n`),
    ),
  ]
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .concat('\n');
};
