// The columns are plain data, shared by Board and NoteForm. Rendering them with .map() means
// adding a column later is a one-line change here, not new markup.
export const COLUMNS = [
  { id: 'todo', title: 'To do', color: '#8A847A' },
  { id: 'in-progress', title: 'In progress', color: '#C07A2C' },
  { id: 'done', title: 'Done', color: '#2F5D50' },
];
