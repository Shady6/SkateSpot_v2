import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NoteInput } from './components/NoteInput';
import { NotesState } from './reducers/notesReducer';
import { addNote } from './actions/actions';

function App() {

  const notes = useSelector<NotesState, NotesState["notes"]>(state => state.notes)
  const dispatch = useDispatch()

  const onAddNote = (note: string) => {
    dispatch(addNote(note))
  }

  return (
    <>
     
      <NoteInput addNote={onAddNote} />
      <br />
      <b>Your notes</b>
      <ul>
        {notes.map(note => {
          return <li key={note}>{note}</li>
        })}

      </ul>
    </>
  );
}

export default App;
