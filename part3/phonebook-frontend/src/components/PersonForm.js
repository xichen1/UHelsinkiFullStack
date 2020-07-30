import React from 'react'

const PersonFrom = ({add, name, namechange, number, numberchange}) => {
    return (
        <form onSubmit={add}>
        <div>name: <input value={name} onChange={namechange}/></div>
        <div>number: <input value={number} onChange={numberchange} /></div>

        <div>
            <button type="submit">add</button>
        </div>
        </form>
    )
}


export default PersonFrom