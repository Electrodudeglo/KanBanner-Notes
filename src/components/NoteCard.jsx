import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// One note. It only displays what it's given through props — it doesn't
// know where notes come from or how they're stored. That's the parent's job.
export default function NoteCard({ title, body, onRemove, onEdit, id }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  return (
    <article
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`cursor-grab rounded-[10px] border border-line bg-white p-3.5 shadow-sm ${isDragging ? 'opacity-40' : ''}`}
      style={{ transform: CSS.Transform.toString(transform), transition }}
    >
      <div className="flex items-start gap-2">
        <h3 className="flex-1 text-[15px] font-semibold text-ink">{title}</h3>
        <div className="-mt-1 -mr-1.5 flex shrink-0">
          <button
            type="button"
            aria-label="Edit note"
            onClick={onEdit}
            onKeyDown={(e) => e.stopPropagation()} // keep Space/Enter from starting a keyboard drag
            className="flex size-7 cursor-pointer items-center justify-center rounded-md text-muted hover:bg-line hover:text-ink"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Delete note"
            onClick={onRemove}
            onKeyDown={(e) => e.stopPropagation()}
            className="flex size-7 cursor-pointer items-center justify-center rounded-md text-muted hover:bg-line hover:text-ink"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      {/* Only render the body if there is one. `&&` renders the right side when the left is truthy. */}
      {body && <p className="mt-1 text-[14px] text-muted">{body}</p>}
    </article>
  );
}
