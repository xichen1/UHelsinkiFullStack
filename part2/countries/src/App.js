import React, {useState, useEffect} from 'react'
import './App.css'
import './components/Search'
import axios from 'axios'
import Search from './components/Search'
import Filter from './Filter'

function App() {
  const [countries, setCountry] = useState([])
  const [keyword, setKeyword] = useState('')

  const handleKeyword = (event) => {
    setKeyword(event.target.value)
  }

  useEffect(()=>{
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => 
      setCountry(response.data))
  }, [])

  return (
    <>
    <div>
      <Search value={keyword} handlekey={handleKeyword}/>
    </div>
    <div>
      <Filter countries={countries} keyword={keyword}/>
    </div>
    </>
  );
}

export default App;
