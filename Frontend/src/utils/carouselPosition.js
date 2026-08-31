const EDGE_TOLERANCE = 8;

/**
 * Normalizes fractional scroll offsets so carousel controls do not appear at
 * an edge because of sub-pixel layout, scroll snapping, or browser zoom.
 */
export const getCarouselScrollState = ({ scrollLeft, clientWidth, scrollWidth }) => {
  const maximum = Math.max(0, scrollWidth - clientWidth);
  const position = Math.min(maximum, Math.max(0, scrollLeft));

  return {
    canScrollLeft: position > EDGE_TOLERANCE,
    canScrollRight: maximum - position > EDGE_TOLERANCE,
  };
};
