import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { newFilter } from '../reducers/filterReducer'

const Filter = () => {
    const [filter, setFilter] = useState('')
    const dispatch = useDispatch()

    const handleChange = (event) => {
        dispatch(newFilter(event.target.value))
        setFilter(event.target.value)
    }

    const style = {
        marginBottom: 10
    }
    return (
        <div style={style}>
            filter <input value={filter} onChange={handleChange} />
        </div>
    )
}

export default Filter