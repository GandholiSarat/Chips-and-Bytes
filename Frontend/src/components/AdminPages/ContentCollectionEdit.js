import React, { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { contentCollections, makeContentSource } from '../../data/managedContent';
import './ContentCollectionEdit.css';

const cloneItems = (items) => items.map((item) => ({ ...item }));
const makeEmptyForm = (collection) => Object.fromEntries(collection.fields.map(({ name }) => [name, '']));
const draftKey = (contentType) => `chips-and-bytes:content-draft:${contentType}`;

const readDraft = (contentType, fallback) => {
  try {
    const saved = JSON.parse(window.localStorage.getItem(draftKey(contentType)));
    return Array.isArray(saved) ? saved : cloneItems(fallback);
  } catch {
    return cloneItems(fallback);
  }
};

const ContentCollectionEdit = ({ contentType }) => {
  const collection = contentCollections[contentType];
  const navigate = useNavigate();
  const sourceRef = useRef(null);
  const [items, setItems] = useState(() => readDraft(contentType, collection.data));
  const [form, setForm] = useState(() => makeEmptyForm(collection));
  const [editingIndex, setEditingIndex] = useState(null);
  const [notice, setNotice] = useState('');
  const sourceCode = useMemo(() => makeContentSource(collection, items), [collection, items]);

  const storeItems = (nextItems) => {
    setItems(nextItems);
    window.localStorage.setItem(draftKey(contentType), JSON.stringify(nextItems));
    setNotice('Draft updated in this browser. Copy the source code below to publish it.');
  };

  const resetForm = () => {
    setForm(makeEmptyForm(collection));
    setEditingIndex(null);
  };

  const updateField = ({ target }) => {
    setForm((current) => ({ ...current, [target.name]: target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextItem = Object.fromEntries(
      collection.fields
        .map(({ name }) => [name, form[name].trim()])
        .filter(([, value]) => value !== ''),
    );
    const nextItems = [...items];
    if (editingIndex === null) nextItems.push(nextItem);
    else nextItems[editingIndex] = nextItem;
    storeItems(nextItems);
    resetForm();
  };

  const handleEdit = (item, index) => {
    setForm(Object.fromEntries(collection.fields.map(({ name }) => [name, item[name] || ''])));
    setEditingIndex(index);
    setNotice('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (index) => {
    if (!window.confirm(`Delete this ${collection.singular} from the browser draft?`)) return;
    storeItems(items.filter((_, itemIndex) => itemIndex !== index));
    if (editingIndex === index) resetForm();
  };

  const moveItem = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= items.length) return;
    const nextItems = [...items];
    [nextItems[index], nextItems[targetIndex]] = [nextItems[targetIndex], nextItems[index]];
    storeItems(nextItems);
  };

  const resetDraft = () => {
    if (!window.confirm('Discard this browser draft and restore the version currently stored in the repository?')) return;
    const originalItems = cloneItems(collection.data);
    window.localStorage.removeItem(draftKey(contentType));
    setItems(originalItems);
    resetForm();
    setNotice('Repository version restored in this browser.');
  };

  const copySource = async () => {
    try {
      await navigator.clipboard.writeText(sourceCode);
    } catch {
      sourceRef.current?.select();
      document.execCommand('copy');
    }
    setNotice(`Copied. Replace the complete contents of ${collection.filePath} with this code.`);
  };

  return (
    <main className="admin-editor content-collection-edit">
      <header className="admin-editor__header">
        <p>Browser-only content editor</p>
        <h1>{editingIndex === null ? `Add ${collection.singular}` : `Update ${collection.singular}`}</h1>
        <span>{collection.description}</span>
      </header>

      <aside className="content-workflow" aria-label="Publishing instructions">
        <strong>No backend is used for this content.</strong>
        <span>Make changes here, copy the generated file, and replace this exact repository file:</span>
        <code>{collection.filePath}</code>
      </aside>

      <form className="admin-form content-collection-form" onSubmit={handleSubmit}>
        {collection.fields.map((field) => (
          <label key={field.name}>
            {field.label}
            {field.multiline ? (
              <textarea name={field.name} rows="4" value={form[field.name]} onChange={updateField} placeholder={field.placeholder} required={field.required} />
            ) : (
              <input type={field.inputType || 'text'} name={field.name} value={form[field.name]} onChange={updateField} placeholder={field.placeholder} required={field.required} />
            )}
          </label>
        ))}
        <div className="admin-form__actions">
          <button type="submit">{editingIndex === null ? 'Add to draft' : 'Update draft'}</button>
          {editingIndex !== null && <button className="admin-secondary" type="button" onClick={resetForm}>Cancel edit</button>}
        </div>
      </form>

      {notice && <p className="admin-message" role="status">{notice}</p>}

      <section className="admin-list content-collection-list">
        <div className="admin-list__heading"><h2>{collection.title}</h2><span>{items.length} items</span></div>
        {items.map((item, index) => (
          <article className="content-admin-card" key={`${item.id || item.url || item.name || 'item'}-${index}`}>
            {item.image && <img src={item.image} alt="" loading="lazy" />}
            <div>
              <span>Position {index + 1}</span>
              <h3>{item.title || item.name}</h3>
              <p>{item.description || item.summary}</p>
              <div className="admin-card-actions">
                <button type="button" onClick={() => handleEdit(item, index)}>Edit</button>
                <button type="button" onClick={() => moveItem(index, -1)} disabled={index === 0} aria-label={`Move ${item.title || item.name} up`}>↑</button>
                <button type="button" onClick={() => moveItem(index, 1)} disabled={index === items.length - 1} aria-label={`Move ${item.title || item.name} down`}>↓</button>
                <button type="button" onClick={() => handleDelete(index)}>Delete</button>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="content-source">
        <div>
          <p>Ready to publish</p>
          <h2>Replace {collection.filePath}</h2>
          <span>Copy all of the code below and replace the complete contents of that file in GitHub. Commit the file to publish the changes.</span>
        </div>
        <textarea ref={sourceRef} value={sourceCode} readOnly spellCheck="false" aria-label="Generated source code" />
        <div className="content-source__actions">
          <button type="button" onClick={copySource}>Copy complete file</button>
          <button type="button" className="admin-secondary" onClick={resetDraft}>Reset to repository version</button>
        </div>
      </section>

      <button type="button" className="admin-back" onClick={() => navigate('/admin/dashboard')}>← Admin dashboard</button>
    </main>
  );
};

export default ContentCollectionEdit;
