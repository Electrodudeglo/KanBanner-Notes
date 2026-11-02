import { useDroppable } from '@dnd-kit/core';

// One column. `children` is whatever you put between <Column>...</Column> —
// here, a SortableContext holding the NoteCards. When `count` is 0 it shows
// an empty state instead.

export default function Column({ title, color, count = 0, onAddNote, children, id, isHighlighted }) {
  const isEmpty = count === 0;
  const { setNodeRef } = useDroppable({ id });

  return (
    <section
      ref={setNodeRef}
      aria-label={title}
      className={`flex min-h-0 flex-col gap-3 rounded-[14px] border-2 bg-column p-4 transition-colors ${isHighlighted ? 'border-accent' : 'border-transparent'}`}
    >
      <div className="flex items-center gap-2.5 px-1">
        {/* The dot colour comes from data, so it's an inline style rather than a class:
            Tailwind can't generate classes from values that only exist at runtime. */}
        <span className="size-2.5 rounded-full" style={{ backgroundColor: color }} />
        <h2 className="text-[15px] font-semibold">{title}</h2>
        <span className="rounded-full bg-line px-2 py-px text-[13px] font-medium text-muted">
          {count}
        </span>
        <button
          type="button"
          aria-label={`Add note to ${title}`}
          onClick={onAddNote}
          className="ml-auto flex h-8 w-11 cursor-pointer items-center justify-center rounded-lg text-muted hover:bg-line hover:text-ink"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 overflow-y-auto">
        {isEmpty ? (
          <p className="rounded-[10px] border-2 border-dashed border-line py-6 text-center text-[13px] text-muted">
            No notes yet
          </p>
        ) : (
          children
        )}
      </div>
    </section>
  );
}