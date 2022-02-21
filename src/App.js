import React, { useState } from 'react';


const api = {
  key: '5711db8dd335acddf0226407c075bb66',
  base: 'https://api.openweathermap.org/data/2.5/'
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('{}');

  const search = evt => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
      })
    }
  }

  let today = new Date().toLocaleDateString();
  
  return (
    <div className={
      (typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type='text'
            className='search-bar'
            placeholder='Search Weather...'
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
            />
          </div>
          {(typeof weather.main != "undefined") ? (
            <>
              <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
                <div className="date">{today}</div>
              </div>
              <div className="weather-box">
                <div className="temp">
                  {Math.round(weather.main.temp)}°C
                </div>
                <div className="weather">{weather.weather[0].main}</div>
              </div>
            </>
          ) : ('')}
      </main>
    </div>
  );
}

export default App;



 
