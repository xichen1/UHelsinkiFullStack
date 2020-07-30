import React, {useState} from 'react'

const Country = ({name}) => {
    
    const show = () => {
        const newcountry = <li>
            {name.name} 
            <button onClick={show}>show</button>
            <div>
                capital: {name.capital}
            </div>
        </li>
        setCountry(newcountry)
    }
    const [country, setCountry] = 
    useState(<li>{name.name} <button onClick={show}>show</button></li>)
    
    return (
        country
    )
}

export default Country 