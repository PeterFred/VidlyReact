import React from "react";

const MovieForm = ({ match, history }) => {
  return (
    <div>
      <h1>Movie Form {match.params.id}</h1>
      <button
        classname=" btn btn-primary"
        onClick={() => history.push("/movies")}
      >
        Back
      </button>
    </div>
  );
};

export default MovieForm;
