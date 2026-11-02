import { useState, useEffect, useCallback, useRef } from 'react';
import Header from './components/Header';
import Board from './components/Board';
import NoteForm from './components/NoteForm';
import DeleteToast from './components/DeleteToast';
import { COLUMNS } from './columns';
import { arrayMove } from '@dnd-kit/sortable';

// Reads the saved notes. Anything unreadable (storage blocked, corrupt JSON, not an array)
// counts as "no saved notes".
function loadNotes() {
  try {
    const savedNotes = JSON.parse(localStorage.getItem('notes'));
    return Array.isArray(savedNotes) ? savedNotes : [];
  } catch {
    return [];
  }
}

function App() {
  const [notes, setNotes] = useState(() =>
    loadNotes().filter((note) =>
      COLUMNS.some((column) => note.columnId === column.id)
    )
  );

  const [editId, setEditId] = useState(null);

  const [addingTo, setAddingTo] = useState(null);

  const [lastDeleted, setLastDeleted] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');

  const resetToast = useCallback(() => setLastDeleted(null), []);

  const notesBeforeDrag = useRef(null);

  const editingNote = notes.find((note) => note.id === editId);

  const query = searchQuery.trim().toLowerCase();

  const visibleNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(query) ||
    (note.body ?? '').toLowerCase().includes(query)
  );

  const noMatches = query !== '' && visibleNotes.length === 0;

  useEffect(() => {
    try {
      localStorage.setItem('notes', JSON.stringify(notes));
    } catch {
      // Storage is full or blocked: the app keeps working, the notes just aren't saved.
    }
  }, [notes]);

  function addNote(columnId, title, body) {
    const newNote = { id: crypto.randomUUID(), columnId, title, body: body || undefined };
    setNotes((prev) => [...prev, newNote]);
    setAddingTo(null);
  }

  function deleteNote(id) {
    const index = notes.findIndex((note) => note.id === id);
    const note = notes[index];
    setLastDeleted({ note, index });
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }

  function undoDelete() {
    setNotes((prev) => [
      ...prev.slice(0, lastDeleted.index),
      lastDeleted.note,
      ...prev.slice(lastDeleted.index),
    ]);
    setLastDeleted(null);
  }

  function updateNote(id, colId, newTitle, newBody) {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? { ...note, columnId: colId, title: newTitle, body: newBody || undefined }
          : note
      )
    );
    setEditId(null);
  }

  function moveNote(noteId, columnId, overId) {
    setNotes((prev) => {
      const oldIndex = prev.findIndex((note) => note.id === noteId);
      const newIndex = prev.findIndex((note) => note.id === overId);

      const moved = prev.map((note) => (note.id === noteId ? { ...note, columnId } : note));

      if (newIndex === -1) {
        return moved;
      }

      return arrayMove(moved, oldIndex, newIndex);
    });
  }

  // Dragging moves cards while it is still going, so keep a copy to go back to if it is cancelled.
  function startDrag() {
    notesBeforeDrag.current = notes;
  }

  function cancelDrag() {
    setNotes(notesBeforeDrag.current);
  }

  return (
    <div className="flex min-h-full flex-col">
      <Header onNewNote={() => setAddingTo('todo')} onSearch={setSearchQuery} />
      {lastDeleted && (
        <DeleteToast
          key={lastDeleted.note.id}
          message={lastDeleted.note.title}
          onClose={resetToast}
          onUndo={undoDelete}
        />
      )}
      {addingTo && (
        <NoteForm
          onSave={addNote}
          onClose={() => setAddingTo(null)}
          formTitle="New Note"
          initialColId={addingTo}
        />
      )}
      {editingNote && (
        <NoteForm
          initialTitle={editingNote.title}
          initialBody={editingNote.body}
          onSave={(columnId, title, body) => updateNote(editId, columnId, title, body)}
          initialColId={editingNote.columnId}
          onClose={() => setEditId(null)}
          formTitle="Edit Note"
        />
      )}
      {!noMatches && (
        <Board
          notes={visibleNotes}
          onRemove={deleteNote}
          onEdit={setEditId}
          onAddNote={setAddingTo}
          onMoveNote={moveNote}
          onMoveStart={startDrag}
          onMoveCancel={cancelDrag}
        />
      )}
      {noMatches && (
        <main className="flex flex-1 items-start justify-center p-4 md:px-8 md:pt-6 md:pb-8">
          <p
            role="status"
            className="w-full max-w-md rounded-[10px] border-2 border-dashed border-line px-4 py-8 text-center text-[15px] text-muted"
          >
            No notes match <span className="font-semibold text-ink">"{searchQuery.trim()}"</span>
          </p>
        </main>
      )}
    </div>
  );
}

export default App;
