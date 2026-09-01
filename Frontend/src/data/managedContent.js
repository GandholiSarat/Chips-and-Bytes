import { blogPosts } from './blogPosts';
import { members } from './members';
import { mentors } from './mentors';
import { projects } from './projects';

export const contentCollections = {
  projects: {
    title: 'Projects',
    singular: 'project',
    description: 'Edit the project cards shown across the website, then copy the generated source file.',
    data: projects,
    exportName: 'projects',
    filePath: 'Frontend/src/data/projects.js',
    fields: [
      { name: 'title', label: 'Project title', required: true },
      { name: 'description', label: 'Description', required: true, multiline: true },
      { name: 'url', label: 'Repository URL', required: true, inputType: 'url' },
      { name: 'image', label: 'Cover image path or URL' },
    ],
  },
  blogs: {
    title: 'Blogs',
    singular: 'blog',
    description: 'Edit article metadata, then copy the generated source file.',
    data: blogPosts,
    exportName: 'blogPosts',
    filePath: 'Frontend/src/data/blogPosts.js',
    fields: [
      { name: 'id', label: 'Unique ID', required: true, placeholder: 'lowercase-article-slug' },
      { name: 'title', label: 'Article title', required: true },
      { name: 'description', label: 'Short description', required: true, multiline: true },
      { name: 'url', label: 'Article URL', required: true, inputType: 'url' },
      { name: 'image', label: 'Cover image path or URL' },
      { name: 'category', label: 'Category' },
      { name: 'accent', label: 'Card accent', placeholder: 'cpu, memory, gpu, systems…' },
    ],
  },
  members: {
    title: 'Members',
    singular: 'member',
    description: 'Edit the member profiles shown in the homepage carousel, then copy the generated source file.',
    data: members,
    exportName: 'members',
    filePath: 'Frontend/src/data/members.js',
    fields: [
      { name: 'name', label: 'Name', required: true },
      { name: 'designation', label: 'Designation', required: true },
      { name: 'summary', label: 'Club role or summary', required: true, multiline: true },
      { name: 'image', label: 'Profile image path or URL' },
      { name: 'linkedin', label: 'LinkedIn URL', inputType: 'url' },
    ],
  },
  mentors: {
    title: 'Mentors',
    singular: 'mentor',
    description: 'Edit mentor profiles and professional links, then copy the generated source file.',
    data: mentors,
    exportName: 'mentors',
    filePath: 'Frontend/src/data/mentors.js',
    fields: [
      { name: 'name', label: 'Name', required: true },
      { name: 'designation', label: 'Designation', required: true },
      { name: 'summary', label: 'Expertise or summary', required: true, multiline: true },
      { name: 'image', label: 'Profile image path or URL' },
      { name: 'linkedin', label: 'LinkedIn URL', inputType: 'url' },
    ],
  },
};

export const makeContentSource = (collection, items) => {
  const cleanItems = items.map((item) => Object.fromEntries(
    collection.fields
      .map(({ name }) => [name, String(item[name] || '').trim()])
      .filter(([, value]) => value !== ''),
  ));

  return `export const ${collection.exportName} = ${JSON.stringify(cleanItems, null, 2)};\n`;
};
