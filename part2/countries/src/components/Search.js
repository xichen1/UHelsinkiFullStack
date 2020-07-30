import React from 'react'

const Search = ({ value, handlekey }) =>{
    return (
        <div className='search' >
        find countries
        <input value={value} onChange={handlekey}/>
        </div>
    )
}

export default Search