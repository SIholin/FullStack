import React, {useState, useEffect} from 'react'

import Note from './components/Note'
import noteService from './services/notes'

const Notification = ({message}) => {
    if (message === null) {
        return null
    }

    return (
        <div className= "error">
        {message}
        </div>
    )
}

const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState('virhe')

    useEffect(() => {
        noteService.getAll()
        .then(initialNotes => {
            setNotes(initialNotes)
        })
    }, [])
    const toggleImportanceOf = id => {
        const note = notes.find (n => n.id === id)
        const canhgedNote = { ...note, important: !note.important}

        noteService.update(id, canhgedNote).then(returnedNote => {
            setNotes(notes.map(note => note.id !== id 
                ? note : returnedNote)).catch(erros => {
                    alert('muisiinpano on jo poistettu')
                    setNotes(notes.filter(n => n.id !== id))
                })
        })        
    }
    const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

    const rows = () => notesToShow.map(note =>
        <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>)

    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5,
        }
        noteService.create(noteObject)
        .then(returnedNote => {
            setNotes(notes.concat(returnedNote))
            setNewNote('')
        })
    }
    const handleNoteChange = (event) => {
        console.log(event.target.value)
        setNewNote(event.target.value)
    }

    return (
        <div>
            <h1>Muistiinpanot</h1>
            <Notification message={errorMessage} />
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                näytä {showAll ? 'vain tärkeät' : 'kaikki'}
                </button>
            </div>
            <ul>
            {rows()}
            </ul>
            <form onSubmit={addNote}>
            <input 
            value={newNote} 
            onChange={handleNoteChange}
            />
            <button type="submit">tallenna</button>
            </form>
        </div>
    )
}

export default App