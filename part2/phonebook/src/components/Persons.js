import React from 'react'
import Name from './Name'

import phoneservice from '../service/phoneservice'


const Persons = ({ setpersons, persons, newFilter }) => {
    const toggledelete = (id) => {
        const person = persons.find(person => person.id === id)
        if (window.confirm(`Delete ${person.name}?`)) {
            phoneservice
                .deletename(id)
                .then(initdata => {
                    setpersons(persons.filter(person => person.id !== id))
                    
                })
        }
    }

    return (
        <ul>
            {persons.filter(person =>
                person.name.toLowerCase().includes(newFilter.toLowerCase()))
                .map((person) =>
                    <Name key={person.name}
                        name={person.name}
                        number={person.number}
                        toggleDelete={() => toggledelete(person.id)}
                    />)}
        </ul>

    )
}

export default Persons