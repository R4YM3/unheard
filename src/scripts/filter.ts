/**
 * Progressive client-side filter over server-rendered lists. Without JavaScript the full
 * list stays visible and the filter field stays hidden. Nothing is stored or sent.
 */
export const enhanceFilter = (rootSelector: string, singular: string, plural: string) => {
  const root = document.querySelector<HTMLElement>(rootSelector);
  const field = root?.querySelector<HTMLElement>('[data-filter]');
  const input = field?.querySelector<HTMLInputElement>('input');
  const status = field?.querySelector<HTMLElement>('[data-filter-status]');
  if (!root || !field || !input || !status) return;
  const items = [...root.querySelectorAll<HTMLElement>('[data-filter-item]')];
  const groups = [...root.querySelectorAll<HTMLElement>('[data-filter-group]')];

  const apply = () => {
    const query = input.value.trim().toLowerCase();
    let visible = 0;
    for (const item of items) {
      const match = !query || (item.dataset.terms ?? '').includes(query);
      item.hidden = !match;
      if (match) visible += 1;
    }
    for (const group of groups) {
      group.hidden = !group.querySelector('[data-filter-item]:not([hidden])');
    }
    status.textContent = query
      ? visible === 0
        ? `Geen ${plural} gevonden voor “${input.value.trim()}”.`
        : `${visible} ${visible === 1 ? singular : plural} gevonden.`
      : '';
  };

  field.hidden = false;
  input.addEventListener('input', apply);
  const initial = new URLSearchParams(location.search).get('q');
  if (initial) {
    input.value = initial;
    apply();
  }
};
