import React from "react";
import queryString from "query-string";

const Customers = ({ match, location }) => {
  const result = queryString.parse(location.search);
  console.log(result);
  return <h1>Customers</h1>;
};

export default Customers;
