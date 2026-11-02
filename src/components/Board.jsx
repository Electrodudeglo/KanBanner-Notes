import { useState } from 'react';
import Column from './Column';
import NoteCard from './NoteCard';
import NoteCardPreview from './NoteCardPreview';
import { COLUMNS } from '../columns';
import { DndContext, DragOverlay, KeyboardSensor, PointerSensor, useSensor, useSensors, closestCorners } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

export default function Board({ notes, onRemove, onEdit, onAddNote, onMoveNote, onMoveStart, onMoveCancel }) {
  const [activeId, setActiveId] = useState(null);
  const [overColumnId, setOverColumnId] = useState(null);
  const activeNote = notes.find((note) => note.id === activeId);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );

  function getColumnId(overId) {
    const droppedOnColumn = COLUMNS.some((column) => column.id === overId);
    return droppedOnColumn ? overId : notes.find((note) => note.id === overId).columnId;
  }

  function handleDrag(event) {
    setActiveId(null);
    setOverColumnId(null);

    if (!event.over) {
      return; // dropped outside every zone
    }

    const overId = event.over.id;
    const targetColumnId = getColumnId(overId);
    onMoveNote(event.active.id, targetColumnId, overId);
  }

  function handleDragStart(event) {
    setActiveId(event.active.id);
    onMoveStart();
  }

  function handleDragCancel() {
    setActiveId(null);
    setOverColumnId(null);
    onMoveCancel();
  }

  function handleDragover(event) {
    if (!event.over) {
      setOverColumnId(null);
      return;
    }

    const targetColumnId = getColumnId(event.over.id);
    setOverColumnId(targetColumnId);

    const draggedNote = notes.find((note) => note.id === event.active.id);

    if (draggedNote.columnId !== targetColumnId) {
      onMoveNote(event.active.id, targetColumnId, event.over.id);
    }
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDrag}
      onDragOver={handleDragover}
      onDragCancel={handleDragCancel}
      collisionDetection={closestCorners}
    >
      {/* The column count comes from COLUMNS; Tailwind can't build a class from a number at runtime, so it reads --cols. */}
      <main
        className="grid flex-1 grid-cols-1 gap-5 p-4 md:grid-cols-(--cols) md:px-8 md:pt-6 md:pb-8"
        style={{ '--cols': `repeat(${COLUMNS.length}, minmax(0, 1fr))` }}
      >
        {COLUMNS.map((column) => {
          // Keep only the notes whose columnId matches this column's id.
          const columnNotes = notes.filter((note) => note.columnId === column.id);

          return (
            // `key` helps React track list items between renders — always use a stable id.
            <Column
              key={column.id}
              title={column.title}
              color={column.color}
              count={columnNotes.length}
              onAddNote={() => onAddNote(column.id)}
              id={column.id}
              isHighlighted={overColumnId === column.id}
            >
              <SortableContext items={columnNotes} strategy={verticalListSortingStrategy}>
                {columnNotes.map((note) => (
                  <NoteCard
                    key={note.id}
                    id={note.id}
                    title={note.title}
                    body={note.body}
                    onRemove={() => onRemove(note.id)}
                    onEdit={() => onEdit(note.id)}
                  />
                ))}
              </SortableContext>
            </Column>
          );
        })}
      </main>
      <DragOverlay>
        {activeNote ? <NoteCardPreview title={activeNote.title} body={activeNote.body} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
