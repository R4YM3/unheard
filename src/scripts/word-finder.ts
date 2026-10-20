/**
 * Enhances the server-rendered word finder: one question at a time, a personal overview,
 * print and a local text download. Answers live only in the form fields of this tab; there
 * is no storage, no network request and no analytics.
 */
import { buildResult, resultToText } from '../lib/word-finder.mjs';

type Model = Parameters<typeof buildResult>[0];
type Page = { href: string; title: string; text?: string };
type Payload = { model: Model; pages: Record<string, Page>; deepening: string[] };

const help = [
  'Direct gevaar: bel 112.',
  'Gedachten aan zelfdoding: bel 113 of 0800-0113, of chat via 113.nl (gratis, dag en nacht).',
  'Zorgen over huiselijk geweld of misbruik, ook als man: Veilig Thuis, 0800-2000 (gratis en anoniem).',
];

export const enhanceWordFinder = () => {
  const root = document.querySelector<HTMLElement>('[data-finder]');
  const raw = document.querySelector('[data-finder-data]')?.textContent;
  const form = root?.querySelector<HTMLFormElement>('[data-finder-form]');
  const result = root?.querySelector<HTMLElement>('[data-finder-result]');
  const controls = root?.querySelector<HTMLElement>('[data-finder-controls]');
  const status = root?.querySelector<HTMLElement>('[data-finder-status]');
  const notes = root?.querySelector<HTMLFormElement>('[data-finder-notes]');
  if (!root || !raw || !form || !result || !controls || !status || !notes) return;
  const { model, pages, deepening } = JSON.parse(raw) as Payload;
  const steps = [...form.querySelectorAll<HTMLFieldSetElement>('[data-step]')];
  const prev = controls.querySelector<HTMLButtonElement>('[data-finder-prev]')!;
  const skip = controls.querySelector<HTMLButtonElement>('[data-finder-skip]')!;
  const next = controls.querySelector<HTMLButtonElement>('[data-finder-next]')!;
  let current = 0;

  const say = (message: string) => {
    status.textContent = '';
    setTimeout(() => (status.textContent = message), 50);
  };

  const answers = () =>
    Object.fromEntries(
      model.questions.map((question) => [
        question.id,
        [...form.querySelectorAll<HTMLInputElement>(`input[name="${question.id}"]:checked`)].map(
          (input) => input.value,
        ),
      ]),
    );

  const show = (index: number, focus = true) => {
    current = index;
    root.dataset.state = 'steps';
    result.hidden = true;
    form.hidden = false;
    steps.forEach((step, stepIndex) => (step.hidden = stepIndex !== index));
    prev.hidden = index === 0;
    next.textContent = index === steps.length - 1 ? 'Bekijk mijn overzicht' : 'Volgende vraag';
    if (focus) steps[index].querySelector<HTMLElement>('[data-step-focus]')?.focus();
  };

  const fill = (name: string, items: Node[]) => {
    const section = result.querySelector<HTMLElement>(`[data-result="${name}"]`)!;
    const list = section.querySelector('[data-result-list]')!;
    list.replaceChildren(...items);
    section.hidden = items.length === 0;
  };
  const element = (tag: string, text?: string, className?: string) => {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    if (className) node.className = className;
    return node;
  };
  const pageItem = (key: string) => {
    const page = pages[key];
    const item = element('li');
    const link = element('a', page.title, 'text-link') as HTMLAnchorElement;
    link.href = page.href;
    item.append(link);
    if (page.text) item.append(element('span', page.text, 'finder-links__text'));
    return item;
  };

  const showResult = () => {
    const outcome = buildResult(model, answers());
    fill(
      'safety',
      outcome.safetyTexts.map((text) => element('p', text)),
    );
    result.querySelector<HTMLElement>('[data-result="empty"]')!.hidden = !outcome.empty;
    fill(
      'acknowledged',
      outcome.acknowledged.map((text) => element('li', text)),
    );
    fill(
      'routes',
      outcome.routes.map((route) => {
        const block = element('div', undefined, 'finder-route');
        block.append(element('h4', route.title), element('p', route.recognition));
        return block;
      }),
    );
    fill('reading', [...new Set([...outcome.feelings, ...outcome.patterns])].map(pageItem));
    fill(
      'reflections',
      outcome.reflections.map((question) => element('li', question)),
    );
    fill('next', outcome.next.map(pageItem));
    root.dataset.state = 'result';
    form.hidden = true;
    result.hidden = false;
    result.querySelector<HTMLElement>('#finder-result-heading')?.focus();
    return outcome;
  };

  const clearAll = () => {
    form.reset();
    notes.reset();
    result.querySelectorAll('[data-result-list]').forEach((list) => list.replaceChildren());
    show(0);
    say('Alles is gewist. Je kunt opnieuw beginnen.');
  };

  const download = () => {
    const outcome = buildResult(model, answers());
    const include = notes.querySelector<HTMLInputElement>('[data-finder-include]')?.checked;
    const fields = [...notes.querySelectorAll('textarea')];
    const text = resultToText(outcome, pages, {
      toUrl: (href) => new URL(href, document.baseURI).href,
      help,
      notes: include
        ? deepening.map((question, index) => ({ question, answer: fields[index]?.value ?? '' }))
        : [],
    });
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
    const link = Object.assign(document.createElement('a'), {
      href: url,
      download: 'ongehoord-mijn-overzicht.txt',
    });
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    say('Het bestand is gedownload naar dit apparaat.');
  };

  form.addEventListener('submit', (event) => event.preventDefault());
  notes.addEventListener('submit', (event) => event.preventDefault());
  form.addEventListener('change', (event) => {
    const input = event.target as HTMLInputElement;
    if (input.type !== 'checkbox' || !input.checked) return;
    const group = form.querySelectorAll<HTMLInputElement>(`input[name="${input.name}"]`);
    group.forEach((other) => {
      if (
        other !== input &&
        (input.hasAttribute('data-exclusive') || other.hasAttribute('data-exclusive'))
      )
        other.checked = false;
    });
  });
  prev.addEventListener('click', () => show(Math.max(0, current - 1)));
  skip.addEventListener('click', () => {
    steps[current].querySelectorAll('input').forEach((input) => (input.checked = false));
    if (current === steps.length - 1) showResult();
    else show(current + 1);
  });
  next.addEventListener('click', () => {
    if (current === steps.length - 1) showResult();
    else show(current + 1);
  });
  root.querySelector('[data-finder-edit]')?.addEventListener('click', () => show(0));
  root.querySelector('[data-finder-print]')?.addEventListener('click', () => window.print());
  root.querySelector('[data-finder-download]')?.addEventListener('click', download);
  root.querySelector('[data-finder-clear]')?.addEventListener('click', clearAll);
  // A page restored from the back/forward cache must not show someone else's answers.
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) clearAll();
  });

  root.querySelectorAll<HTMLElement>('[data-finder-nojs]').forEach((note) => (note.hidden = true));
  controls.hidden = false;
  show(0, false);
};
