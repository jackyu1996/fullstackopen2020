import React from "react";
import { filterChange } from "../reducers/filterReducer";
import { connect } from "react-redux";

const Filter = (props) => {
  const handleChange = (e) => props.filterChange(e.target.value);

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input type="text" onChange={handleChange} />
    </div>
  );
};

export default connect(null, { filterChange })(Filter);
