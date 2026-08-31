import { fireEvent, render, screen } from '@testing-library/react';
import ContentCollectionEdit from './ContentCollectionEdit';

jest.mock('react-router-dom', () => ({ useNavigate: () => jest.fn() }), { virtual: true });

beforeEach(() => {
  window.localStorage.clear();
  window.scrollTo = jest.fn();
});

test('adds a project to the browser draft and generates the replacement source file', () => {
  render(<ContentCollectionEdit contentType="projects" />);

  fireEvent.change(screen.getByLabelText('Project title'), { target: { value: 'Cache visualizer' } });
  fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'An interactive cache project.' } });
  fireEvent.change(screen.getByLabelText('Repository URL'), { target: { value: 'https://github.com/example/cache' } });
  fireEvent.click(screen.getByRole('button', { name: 'Add to draft' }));

  expect(screen.getByText('Frontend/src/data/projects.js')).toBeInTheDocument();
  expect(screen.getByLabelText('Generated source code').value).toContain('export const projects = [');
  expect(screen.getByLabelText('Generated source code').value).toContain('Cache visualizer');
  expect(JSON.parse(window.localStorage.getItem('chips-and-bytes:content-draft:projects'))).toEqual(
    expect.arrayContaining([expect.objectContaining({ title: 'Cache visualizer' })]),
  );
});
