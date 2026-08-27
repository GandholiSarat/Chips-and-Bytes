import { render, screen } from '@testing-library/react';
import AboutPage from './components/Pages/AboutPage';
import BlogCard from './components/BlogCard/BlogCard';
import CinematicHero from './components/CinematicHero/CinematicHero';

beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
  window.sessionStorage.clear();
});

test('preserves the original club writing', () => {
  render(<AboutPage />);

  expect(screen.getByRole('heading', { name: 'What We Do' })).toBeInTheDocument();
  expect(screen.getByText(/Foster self-driven learning/i)).toBeInTheDocument();
});

test('shows a visible Medium destination on every blog card', () => {
  render(
    <BlogCard
      blog={{
        url: 'https://medium.com/@chips-and-bytes/example',
        title: 'Example architecture article',
        description: 'A systems article.',
        category: 'Architecture',
        accent: 'cpu',
      }}
      index={0}
      linkClassName="blog-read-link"
      actionLabel="Read Article"
    />,
  );

  const link = screen.getByRole('link', { name: /Example architecture article on Medium/i });
  expect(link).toHaveAttribute('href', 'https://medium.com/@chips-and-bytes/example');
  expect(screen.getByText('medium.com')).toBeInTheDocument();
});

test('opens with the requested welcome and retains the original hero copy', () => {
  const { unmount } = render(<CinematicHero onJoin={jest.fn()} />);

  expect(screen.getByRole('status', { name: 'Welcome to Chips and Bytes' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Explore the world of Computer Architecture/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Join Our Community' })).toBeInTheDocument();
  unmount();
});
