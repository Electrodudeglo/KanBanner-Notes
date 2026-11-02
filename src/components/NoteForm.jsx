import { useState, useEffect } from 'react';
import { COLUMNS } from '../columns';

export default function NoteForm({ formTitle, initialColId = 'todo', initialTitle = '', initialBody = '', onSave, onClose }) {
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const [colSelection, setColSelection] = useState(initialColId);
  const [inputError, setInputError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (title.trim() === '') {
      setInputError(true);
      return;
    }
    onSave(colSelection, title.trim(), body.trim());
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/45 p-4" onClick={onClose}>
      <form
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="note-dialog-title"
        className="flex w-full max-w-130 flex-col gap-4.5 rounded-2xl bg-white p-7 shadow-[0_24px_60px_rgba(30,28,24,0.3)]"
        onSubmit={handleSubmit}
      >
        <h2 id="note-dialog-title" className="font-display text-2xl font-semibold text-ink">
          {formTitle}
        </h2>

        <fieldset className="flex flex-col gap-1.5">
          <legend className="mb-1.5 text-[13px] font-semibold text-ink">Column</legend>
          <div className="flex flex-wrap gap-2">
            {COLUMNS.map((column) => (
              <label
                key={column.id}
                style={{ '--col': column.color }}
                className="flex h-9 cursor-pointer items-center gap-2 rounded-full border border-field px-3.5 text-[14px] text-ink hover:bg-page has-checked:border-(--col) has-checked:bg-(--col)/10"
              >
                <input
                  type="radio"
                  name="column-select"
                  className="size-4 accent-(--col)"
                  onChange={() => setColSelection(column.id)}
                  checked={colSelection === column.id}
                />
                {column.title}
              </label>
            ))}
          </div>
        </fieldset>

        <label className="flex flex-col gap-1.5 text-[13px] font-semibold text-ink">
          Title
          <input
            type="text"
            name="title"
            autoFocus
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setInputError(false);
            }}
            placeholder="What needs doing?"
            aria-invalid={inputError}
            className="h-11 rounded-[10px] border border-field bg-white px-3 text-[15px] font-normal text-ink placeholder:text-muted/70 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15 aria-invalid:border-danger aria-invalid:focus:ring-danger/15"
          />
          {inputError && <p className="text-[13px] font-normal text-danger">Please add a title</p>}
        </label>

        <label className="flex flex-col gap-1.5 text-[13px] font-semibold text-ink">
          Notes
          <textarea
            name="body"
            rows={4}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Add a few details…"
            className="resize-y rounded-[10px] border border-field bg-white px-3 py-2.5 text-[15px] font-normal leading-normal text-ink placeholder:text-muted/70 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15"
          />
        </label>

        <div className="mt-1.5 flex items-center justify-end gap-2.5">
          <button
            type="button"
            className="h-11 cursor-pointer rounded-[10px] border border-field bg-white px-4.5 text-[15px] font-medium text-ink hover:bg-page"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="h-11 cursor-pointer rounded-[10px] bg-accent px-5 text-[15px] font-semibold text-white hover:bg-accent-hover"
          >
            Save note
          </button>
        </div>
      </form>
    </div>
  );
}
