# Kanbanner

A kanban board and notes app. Notes live in three columns (To do, In progress and Done), and you can add, edit, search, delete and drag them around. Everything is saved in your browser, so there is no account and no server.

Built with [React](https://react.dev/) 19, [Vite](https://vite.dev/) and [Tailwind CSS](https://tailwindcss.com/) v4. Drag and drop uses [dnd-kit](https://dndkit.com/).

## Features

- **Three columns:** To do, In progress and Done, each with a note count.
- **Add notes:** use the "New note" button in the header, or the "+" button on a column. A note has a title (required) and an optional body. The form lets you pick the column.
- **Edit notes:** the pencil icon on a card opens the same form, and you can move the note to another column from there.
- **Delete with undo:** the x icon on a card deletes it and shows a message for 5 seconds with an "Undo" button that puts the note back in the same place.
- **Drag and drop:** move cards between columns, or re-order them within one. Other cards slide aside to make room, and the column under the card is highlighted. It also works from the keyboard: Tab to a card, press Space or Enter to pick it up, use the arrow keys to move it, Space or Enter to drop it and Escape to cancel.
- **Search:** the header's search box filters the cards by title or body, ignoring case. If nothing matches, a message says so.
- **Saved automatically:** notes are stored in your browser's `localStorage`, so they are still there after a reload. They stay in that browser only, and clearing the site's data removes them.

## Getting started

You need [Node.js](https://nodejs.org/) 20.19 or newer (or 22.12 or newer), which comes with npm.

```bash
git clone https://github.com/Electrodudeglo/kanban-notes.git
cd kanban-notes
npm install
npm run dev
```

Then open http://localhost:5173.

## Scripts

| Command           | What it does                                                          |
| ----------------- | --------------------------------------------------------------------- |
| `npm run dev`     | Starts the Vite dev server with hot reloading on http://localhost:5173 |
| `npm run build`   | Makes a production build in `dist/`                                   |
| `npm run preview` | Serves the production build locally, to check it before deploying     |
| `npm run lint`    | Checks the code with [oxlint](https://oxc.rs/docs/guide/usage/linter) |

## Project structure

```
src/
  App.jsx            Root component: owns the notes, search text and undo state
  columns.js         The list of columns (id, title, colour)
  index.css          Tailwind import, theme tokens (colours, fonts) and base styles
  components/
    Header.jsx       Logo, search box and "New note" button
    Board.jsx        The columns and the drag and drop setup
    Column.jsx       One column: title, count, "+" button and drop target
    NoteCard.jsx     One draggable note with edit and delete buttons
    NoteCardPreview.jsx  The copy of a card that follows the pointer while dragging
    NoteForm.jsx     The add and edit dialog
    DeleteToast.jsx  The "deleted" message with Undo
public/              Static files (the favicon)
```

## Customising

- **Columns:** edit the list in `src/columns.js`. Each column needs a unique `id`, a `title` and a `color`. The board, the form and the saved notes follow it. Notes saved in a column that no longer exists are dropped when the app loads.
- **Colours and fonts:** the design tokens are in the `@theme` block of `src/index.css`.
- **Undo time:** the toast closes after 5000 ms, set in `src/components/DeleteToast.jsx`.

## Notes

- The app is light mode only.
