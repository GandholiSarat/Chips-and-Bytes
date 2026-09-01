import { getCarouselScrollState } from './carouselPosition';

test('keeps the previous control hidden at the carousel start', () => {
  expect(getCarouselScrollState({ scrollLeft: 0, clientWidth: 900, scrollWidth: 1400 })).toEqual({
    canScrollLeft: false,
    canScrollRight: true,
  });
  expect(getCarouselScrollState({ scrollLeft: 2.5, clientWidth: 900, scrollWidth: 1400 }).canScrollLeft).toBe(false);
});

test('shows only controls that lead to additional carousel content', () => {
  expect(getCarouselScrollState({ scrollLeft: 320, clientWidth: 900, scrollWidth: 1400 })).toEqual({
    canScrollLeft: true,
    canScrollRight: true,
  });
  expect(getCarouselScrollState({ scrollLeft: 500, clientWidth: 900, scrollWidth: 1400 })).toEqual({
    canScrollLeft: true,
    canScrollRight: false,
  });
});
