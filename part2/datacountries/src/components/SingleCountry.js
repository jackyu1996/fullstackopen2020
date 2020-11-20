import React, { useState } from "react";
import Weather from "./Weather";

const SingleCountry = ({ country, only }) => {
  const [shown, setShown] = useState(false);

  const handleShown = () => {
    setShown(true);
  };

  if (shown || only) {
    return (
      <>
        <h2>{country.name}</h2>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>

        <h2>languages</h2>
        <ul>
          {country.languages.map((l) => (
            <li key={l.name}>{l.name}</li>
          ))}
        </ul>
        <img src={country.flag} alt="Natinal Flag" width="10%" />

        <Weather city={country.capital} />
      </>
    );
  } else {
    return (
      <p>
        {country.name} <button onClick={handleShown}>show</button>
      </p>
    );
  }
};

export default SingleCountry;
