import React, {useEffect, useState} from 'react'
import Country from './components/Country'
import axios from 'axios'

const Filter = ({countries, keyword}) =>{
	const [temp, setTemp] = useState('')
	const [img, setImg] = useState([])


  const afterfilter = countries.filter(country => 
    country.name.toLowerCase().includes(keyword.toLowerCase()))
  

  const api_key = process.env.REACT_APP_SECRET_CODE

  const params = {
		access_key: api_key,
		query: 'Edmonton',
		forecast_days: 1
	}

	const getweather = () => {
		axios.get('http://api.weatherstack.com/current', {params})
		.then(response => {
			const apiResponse = response.data
			const temp = apiResponse.current.temperature
			const img = apiResponse.current.weather_icons
			console.log(apiResponse)
			setImg(img)
			setTemp(temp)
		})
	}

	useEffect(getweather,[])



  const countrylist = afterfilter
    .map(country => 
    <Country key={country.name} name={country} countries={afterfilter}/>)

	if (countrylist.length >= 10){
		return (
			<div className="result">Too many matches, specify another filter
				<div>
					Edmonton
					temperature: {temp}<br/>
					<img src={img}></img>
				</div>
			</div>
		)
	} else if (countrylist.length === 1 ) {
		return (
			<div className="result">
				<h1>{afterfilter[0].name}</h1>
        <div>capital: {afterfilter[0].capital}</div>
        <div>population: {afterfilter[0].population}</div>
        <div>
          <h3>languages</h3>
          <ul>
            {afterfilter[0].languages.map(language => 
            <Country key={language.name} name={language.name} />
            )}
          </ul>
        </div>
				<div>
					Edmonton
					{/* temperature: {temp1} */}
					
				</div>
			</div>
		)
	} else {
		return (
			<ul className="result">
        {countrylist}
			</ul>
		)
	}

}

export default Filter