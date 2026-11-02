// Top bar: logo + title, search box, "New note" button.
export default function Header({ onSearch, onNewNote }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-6 border-b border-line px-4 py-4 md:px-8 md:py-5">
      <div className="flex items-center gap-2.5 text-accent">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="4" width="5" height="16" rx="1.5" />
          <rect x="10" y="4" width="5" height="10" rx="1.5" />
          <rect x="17" y="4" width="4" height="13" rx="1.5" />
        </svg>
        <h1 className="font-display text-[26px] font-semibold tracking-tight text-ink">
          Kanban Notes
        </h1>
      </div>

      <div className="flex w-full items-center gap-3 md:w-auto">
        <label className="flex h-11 min-w-0 flex-1 items-center gap-2 rounded-[10px] border border-field bg-white px-3.5 text-muted focus-within:border-accent md:w-70 md:flex-none">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <span className="sr-only">Search notes</span>
          <input
            type="search"
            placeholder="Search notes"
            onChange={(e) => onSearch?.(e.target.value)}
            className="min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none"
          />
        </label>

        <button
          type="button"
          onClick={onNewNote}
          className="inline-flex h-11 shrink-0 cursor-pointer items-center whitespace-nowrap gap-2 rounded-[10px] bg-accent px-4.5 text-[15px] font-semibold text-white hover:bg-accent-hover">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
          </svg>
          New note
        </button>
      </div>
    </header>
  );
}