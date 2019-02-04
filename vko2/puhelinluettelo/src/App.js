import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const PersonForm = ({ setErrorMessage, newName, newNumber, setNewName,
    setNewNumber, persons, setPersons, handleNameChange, handleNumberChange }) => {
    const addPerson = (event) => {
        event.preventDefault()
        if (persons.some(e => e.name === newName)) {
            const han = persons.find(p => p.name === newName)
            const id = han.id
            if(window.confirm(newName + ' on jo luettelossa, korvataanko vanha numero uudella?')) {
                console.log(han.number)
                console.log(newNumber)
                console.log(id)
                const changedPerson = { ...han, number: newNumber}

                personService.update(id, changedPerson).then(
                    retrunedPerson => {
                        setPersons(persons.map(person => person.id !== id
                            ? person : retrunedPerson))
                    
                            setErrorMessage(`Henkilön ${newName} numero vaihdettu`)
                    setTimeout(() => {
                        setErrorMessage(null)}, 5000)
                    setNewName('')
                    setNewNumber('')
                        }
                    
                ).catch(errors => {
                    setPersons(persons.filter(n => n.id !== id))
                    setErrorMessage(`Henkilö on jo poisettu`)
                    setTimeout(() => {
                        setErrorMessage(null)}, 5000)
                        
                })
            }
        } else {
            const personObject = {
                name: newName,
                number: newNumber
            }
            personService.create(personObject).then(retrunedPerson => {
            setPersons(persons.concat(retrunedPerson))
            setErrorMessage(`Henkilö ${newName} lisättiin`)
            setTimeout(() => {
                setErrorMessage(null)}, 5000)
            setNewName('')
            setNewNumber('')
        })}
    }

    return (
        <form onSubmit={addPerson}>
            <div>
                nimi:
          <input
                    value={newName}
                    onChange={handleNameChange}
                />
            </div>
            <div>numero: <input value={newNumber}
                onChange={handleNumberChange} /></div>
            <div>
                <button type="submit">lisää</button>
            </div>
        </form>
    )
}
const Filter = ({ persons, newRajaus, handleRajausChange }) => {
    if (newRajaus === '') {
        return (
            <div>
                Rajaa käyttäjiä:
            <input
                    value={newRajaus}
                    onChange={handleRajausChange} />
            </div>
        )
    }
    const rivit = persons.filter(person =>
        person.name.includes(newRajaus)).map(person =>
            <li key={person.name}>{person.name}</li>)



    return (
        <div>
            Rajaa käyttäjiä:
            <input
                value={newRajaus}
                onChange={handleRajausChange} />
            <ul>
                {rivit}
            </ul>
        </div>
    )
}
const Persons = ({ persons, setPersons, setErrorMessage}) => {
   
    const rows = () => persons.map(person =>
        <li key={person.name}>{person.name} {person.number} 
        <button onClick={removePerson(person.id)}>poista</button>
        </li>)

      const removePerson = id => () => {
          let nimi = ''
        for(var i = 0; i < persons.length; i ++) {
            if (persons[i].id === id) {
                nimi = persons[i].name
            }
        }
        
        if (window.confirm(`Haluatko varmasti poistaa käyttäjän ${nimi}?`)) {  
        personService.deletoi(id)
        setPersons(persons.filter(person => person.id !== id))
        setErrorMessage(`Käyttäjä ${nimi} poistettiin`)
        setTimeout(() => {
            setErrorMessage(null)}, 5000)
        
        }
       
    } 
    
    return (
        <ul>
            {rows()}
        </ul>
    )
}

const Notification = ({message}) => {
    if (message === null) {
        return null
    } 
    return (
        <div className="error">
        {message}
        </div>
        
    )
}

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '0400002900' }
    ])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newRajaus, setNewRajaus] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        personService.getAll()
        .then(initialPersons => {
            setPersons(initialPersons)
        })
    }, [])
    
    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleRajausChange = (event) => {
        console.log(event.target.value)
        setNewRajaus(event.target.value)
    }


    return (
        <div>
            <h2>Puhelinluettelo</h2>
            
            <Filter persons={persons} handleRajausChange={handleRajausChange}
                newRajaus={newRajaus} />
            <h2>Lisää uusi</h2>
            <Notification message={errorMessage} />
            <PersonForm persons={persons} setErrorMessage={setErrorMessage} newName={newName}
                newNumber={newNumber} setPersons={setPersons}
                setNewName={setNewName} setNewNumber={setNewNumber}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange} />

            <h2>Numerot</h2>
            <Persons persons={persons} setPersons={setPersons} setErrorMessage={setErrorMessage}/>
        </div>
    )

}

export default App