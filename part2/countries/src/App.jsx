import { useState, useEffect } from "react";
import axios from "axios";

const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const capital = country.capital?.[0];

  useEffect(() => {
    if (!capital) return;

    const apiKey = "4177dc6b4499cb69709ef566e65e7225";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`;

    axios
      .get(url)
      .then((res) => setWeather(res.data))
      .catch((err) => console.error("Weather API error:", err));
  }, [capital]);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {capital}</p>
      <p>Area: {country.area} km²</p>

      <h3>Languages</h3>
      <ul>
        {country.languages &&
          Object.values(country.languages).map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
      </ul>

      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />

      {weather && (
        <div>
          <h3>Weather in {capital}</h3>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Wind: {weather.wind.speed} m/s</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
        </div>
      )}
    </div>
  );
};

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => setCountries(res.data))
      .catch((err) => console.error("Countries API error:", err));
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setSelectedCountry(null);
  };

  const handleShowCountry = (country) => {
    setSelectedCountry(country);
  };

  const filtered = countries.filter((country) =>
    country.name &&
    country.name.common &&
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Country Finder</h1>
      <div>
        Find countries: <input value={filter} onChange={handleFilterChange} />
      </div>

      {selectedCountry ? (
        <CountryDetail country={selectedCountry} />
      ) : filter === "" ? (
        <p>Type something to search.</p>
      ) : filtered.length > 10 ? (
        <p>Too many matches, be more specific.</p>
      ) : filtered.length > 1 ? (
        filtered.map((country) => (
          <div key={country.cca3}>
            {country.name.common}{" "}
            <button onClick={() => handleShowCountry(country)}>show</button>
          </div>
        ))
      ) : filtered.length === 1 ? (
        <CountryDetail country={filtered[0]} />
      ) : (
        <p>No matches found.</p>
      )}
    </div>
  );
}

export default App;
