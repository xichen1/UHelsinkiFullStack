import React from 'react'

const Name = ({ name, number, toggleDelete }) => {
    return (
        <li>
            {name} {number}
            <button onClick={toggleDelete}>delete</button>
        </li>
    )
}

export default Name