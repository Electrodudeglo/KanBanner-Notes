// A plain copy of a note card, shown in the DragOverlay while a card is dragged.
// No hooks and no click handlers: it only displays what it's given. The edit and
// delete icons are drawn as plain, hidden-from-screen-readers shapes so the copy
// has exactly the same size and text wrapping as the real card.
export default function NoteCardPreview({ title, body }) {
  return (
    <article className="cursor-grabbing rounded-[10px] border border-line bg-white p-3.5 shadow-lg">
      <div className="flex items-start gap-2">
        <h3 className="flex-1 text-[15px] font-semibold text-ink">{title}</h3>
        <div className="-mt-1 -mr-1.5 flex shrink-0 text-muted opacity-5" aria-hidden="true">
          <span className="flex size-7 items-center justify-center">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
          </span>
          <span className="flex size-7 items-center justify-center">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </span>
        </div>
      </div>
      {body && <p className="mt-1 text-[14px] text-muted">{body}</p>}
    </article>
  );
}
