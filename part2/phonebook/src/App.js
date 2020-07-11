import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phoneservice from './service/phoneservice'
import Info from './components/Info'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [info, setInfo] = useState({message:null, success:true})


  useEffect(() => {
    phoneservice
      .getall()
      .then(initdata => {
        setPersons(initdata)
      })
  }, [])


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const addName = (event) => {
    let pass = false
    const nameObject = {
      name: newName,
      number: newNumber
    }
    event.preventDefault()
    if (!persons.filter(person => person.name === newName).length) {
      phoneservice
        .create(nameObject)
        .then(initdata => {
          setPersons(persons.concat(initdata))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setInfo({message: 'error', success:false})
        })
      pass = true
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const oldperson = persons.find(person => person.name === newName)
        phoneservice
          .replacename(oldperson.id, nameObject)
          .then(initdata => {
            setPersons(persons
              .map(person =>
                person.name === newName
                  ? nameObject : person))
          })
          .catch(error => {
            setInfo({message: 'error', success:false})
          })
          pass = true
      }
    }
    if (pass) {
      setInfo({message: 'success', success:true})
      setTimeout(() => setInfo({message:null, success: true}), 5000)
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Info message={info.message} success={info.success} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

      <h3>add a new</h3>
      <PersonForm add={addName} name={newName} namechange={handleNameChange}
        number={newNumber} numberchange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons
        setpersons={setPersons}
        persons={persons}
        newFilter={newFilter}
      />
    </div>
  )
}


export default App