const Filter = ({ filter, setFilter }) => {
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <p>
      filter shown with
      <input value={filter} onChange={handleFilterChange} />
    </p>
  );
};

export default Filter;
