import { useEffect } from 'react';

export default function DeleteToast({ message, onClose, onUndo }) {
  useEffect(() => {
    const timeId = setTimeout(onClose, 5000);
    return () => clearTimeout(timeId);
  }, [onClose]);

  return (
    <div className="fixed right-5 bottom-5 z-50">
      <div
        role="status"
        className="flex max-w-sm items-center gap-3 rounded-[10px] bg-ink py-3 pr-2 pl-4 text-[14px] text-page shadow-lg"
      >
        <p className="flex-1">{message} deleted</p>
        <button
          type="button"
          onClick={onUndo}
          className="cursor-pointer rounded-md px-2.5 py-1 text-[14px] font-semibold text-page underline underline-offset-2 hover:bg-white/10"
        >
          Undo
        </button>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-field hover:bg-white/10 hover:text-page"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
