export const elementIsVisibleInViewport = (
  el: HTMLElement,
  options: { partiallyVisible: boolean } = {
    partiallyVisible: false,
  }
) => {
  const { partiallyVisible } = options;
  const { top, left, bottom, right } = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  return partiallyVisible
    ? ((top > 0 && top < innerHeight) ||
        (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};
