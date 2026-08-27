import { render, screen } from '@testing-library/react';
import AboutPage from './components/Pages/AboutPage';
import BlogCard from './components/BlogCard/BlogCard';
import CinematicHero from './components/CinematicHero/CinematicHero';
import ProjectCard from './components/ProjectCard/ProjectCard';
import LiveSessions from './components/LiveSessions/LiveSessions';

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

test('shows a visible GitHub destination on project cards', () => {
  render(
    <ProjectCard
      project={{
        url: 'https://github.com/PrabinKuSabat/example',
        title: 'Example architecture project',
        description: 'An open-source systems project.',
      }}
    />,
  );

  const link = screen.getByRole('link', { name: /View Example architecture project repository on GitHub/i });
  expect(link).toHaveAttribute('href', 'https://github.com/PrabinKuSabat/example');
  expect(screen.getByText('github.com')).toBeInTheDocument();
});

test('opens with the requested welcome and retains the original hero copy', () => {
  const { container, unmount } = render(<CinematicHero onJoin={jest.fn()} />);

  expect(screen.getByRole('status', { name: 'Welcome to Chips and Bytes' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Explore the world of Computer Architecture/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Join Our Community' })).toBeInTheDocument();
  expect(container.querySelectorAll('.cinematic-frame')).toHaveLength(6);
  expect(container.querySelector('img[src="/assets/hero/zen2-matisse-die.webp"]')).toBeInTheDocument();
  expect(container.querySelector('img[src="/assets/hero/nvidia-gp100-die.webp"]')).toBeInTheDocument();
  expect(container.querySelector('img[src="/assets/hero/intel-i9-13900k-die.webp"]')).toBeInTheDocument();
  expect(container.querySelector('img[src="/assets/hero/amd-epyc-rome-io-die.webp"]')).toBeInTheDocument();
  expect(container.querySelector('img[src="/assets/hero/silicon-wafer-closeup.webp"]')).toBeInTheDocument();
  expect(container.querySelector('img[src="/assets/hero/exposed-processor-die.webp"]')).toBeInTheDocument();
  expect(screen.queryByText('Microprocessors')).not.toBeInTheDocument();
  expect(screen.queryByText(/Hardware:/i)).not.toBeInTheDocument();
  unmount();
});

test('keeps multiple live sessions individually readable and navigable', () => {
  render(
    <LiveSessions
      sessions={[
        { _id: 'one', text: 'Think Architecture Together S1' },
        { _id: 'two', text: 'QEMU Lab: Tracing a Boot Sequence' },
      ]}
    />,
  );

  expect(screen.getByRole('heading', { name: 'Live Sessions' })).toBeInTheDocument();
  expect(screen.getByText('Think Architecture Together S1')).toBeInTheDocument();
  expect(screen.getByText('QEMU Lab: Tracing a Boot Sequence')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Previous live session' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Next live session' })).toBeInTheDocument();
});
