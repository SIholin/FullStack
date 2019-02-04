import React, { useState, useEffect } from 'react';
import countryServise from './services/countries'


const Yksi = ({maa}) => {
  const kielet = maa.languages
  const mapattu = kielet.map(kieli =>
    <li key={kieli.name}>{kieli.name}</li>)
  return (
    <div>
      <h1>{maa.name}</h1>
      <p>Capital: {maa.capital}</p>
      <p>Populaton: {maa.population}</p>
      <h2>Languages</h2>
      <ul>
        {mapattu}
      </ul>


    </div>
  )
}
const Filter = ({countries, newRajaus, handleRajausChange, setResults, results}) => {
  if (newRajaus === '') {
    return (
        <div>
            Find countries:
        <input
                value={newRajaus}
                onChange={handleRajausChange} />
        </div>
    )
}
console.log('terve')
setResults(countries.filter(country => country.name.includes(newRajaus)))
if (results.length > 1) {
    const rivit = results.map(result => <li key={result.name}>{result.name}</li>)
return (
    <div>
        Find countries:
        <input
            value={newRajaus}
            onChange={handleRajausChange} />
        <ul>
            {rivit}
        </ul>
    </div>
)
} else {
  console.log('moi')
}
}


const App = () => {
  const [countries, setCountries] = useState([]) 
  const [results, setResults] = useState([])
  const [newRajaus, setNewRajaus] = useState('')

  useEffect(() => {
    countryServise.getAll().then(initialCountry => {
      setCountries(initialCountry)
    })
  }, [])

  const handleRajausChange = (event) => {
    setNewRajaus(event.target.value)
  }
  
  return (
    <div>
      <Filter countries={countries} handleRajausChange={handleRajausChange}
      newRajaus={newRajaus} results={results} setResults={setResults} />

    </div>
  )
}

export default App;
