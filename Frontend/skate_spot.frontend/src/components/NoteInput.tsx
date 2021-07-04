import React, { ChangeEvent, useState } from 'react'

interface Props {
    addNote: (note: string) => void;
}

export const NoteInput: React.FC<Props> = ({ addNote }) => {

    const [note, setNote] = useState("");

    const updateNote = (e: ChangeEvent<HTMLInputElement>) => {
        setNote(e.target.value);
    }

    const onAddNoteClick = () => {
        addNote(note);
        setNote("");
    }

    return (
        <div>
            <p>Input your note</p>
            <input onChange={updateNote} value={note} type="text" name="" id="" />
            <button onClick={onAddNoteClick} type="submit">Add note</button>
        </div>
    )
}
