import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Card";

const Countries = () => {
  const [data, setData] = useState([]);
  const [rangeValue, setRangeValue] = useState(27);
  const radios = ["Africa", "America", "Asia", "Europe", "Oceania"];
  const [selectedRadio, setSelectedRadio] = useState("");
  const changeRangeValue = (e) => {
    setRangeValue(e.target.value);
  };

  const changeRadioValue = (e) => {
    setSelectedRadio(e.target.id);
  };

  // le useEffect se joue une fois que le compose est monte
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => setData(res.data));
  }, []);

  return (
    <div className="countries">
      <h1 className="title">Countries</h1>

      <ul className="radio-container">
        <input
          type="range"
          min="1"
          max="250"
          defaultValue={rangeValue}
          onChange={changeRangeValue}
        />

        {radios.map((continent, index) => {
          return (
            <li key={index}>
              <input
                type="radio"
                id={continent}
                name="continentRadio"
                checked={continent === selectedRadio}
                onChange={changeRadioValue}
              />
              <label htmlFor={continent}> {continent}</label>
            </li>
          );
        })}
      </ul>

      {selectedRadio && (
        <button onClick={() => setSelectedRadio("")}>Cancel</button>
      )}

      <ul>
        {data
          .filter((country) => country.continents[0].includes(selectedRadio))
          .slice(0, rangeValue)
          .map((country, index) => {
            return (
              <Card
                key={index}
                name={country.name.common}
                flag={country.flags.svg}
                capital={country.capital}
                population={country.population}
              />
            );
          })}
      </ul>
    </div>
  );
};

export default Countries;
