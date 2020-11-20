import SingleCountry from "./SingleCountry";

const Countries = ({ countries }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length > 1) {
    return (
      <>
        {countries.map((c) => {
          return <SingleCountry key={c.name} country={c} only={false} />;
        })}
      </>
    );
  } else if (countries.length === 1) {
    return <SingleCountry country={countries[0]} only={true} />;
  } else {
    return "";
  }
};

export default Countries;
