import React, { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/Countries";

const App = () => {
  const [country, setCountry] = useState("");
  const [info, setInfo] = useState([]);

  const handleChangeCountry = (e) => {
    setCountry(e.target.value);
  };

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
      setInfo(res.data);
    });
  }, []);

  const matches = info.filter((c) => c.name.toLowerCase().includes(country));

  return (
    <>
      <p>
        find countries
        <input value={country} onChange={handleChangeCountry} />
      </p>
      <Countries countries={matches} />
    </>
  );
};

export default App;
