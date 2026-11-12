/**
 * On a touch screen a hero item first shows its preview (with its own link) instead of
 * leaving the page straight away; tapping it again, or the link in the preview, opens it.
 * Mouse and keyboard keep the normal link behaviour, since pointing or focusing already
 * shows the preview.
 */
export const previewOnFirstTap = (link: HTMLElement, show: () => void, isShown: () => boolean) => {
  let touch = false;
  /* Read before the tap's own focus shows the preview. */
  let shownBefore = false;
  link.addEventListener('pointerdown', (event) => {
    touch = event.pointerType === 'touch' || event.pointerType === 'pen';
    shownBefore = isShown();
  });
  link.addEventListener('click', (event) => {
    if (!touch || shownBefore) return;
    event.preventDefault();
    show();
  });
};
