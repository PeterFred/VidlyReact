import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "../components/common/like";
import Table from "./common/table";

class MoviesTable extends Component {
  /**
   * const x = <h1></h1>  //This is a React element, which is a plin JS object {}
   *
   * The <Like> component is also a JS object. As you can pass objects to functions or use
   * them as values of properties, in the columns array you can add new property 'content' and
   * set it to jsx expression '<Like>'. eg) {key: 'like', content: <Like/>}
   * We can then make it a function that returns a React element, and make 'movie' a parameter passed in.
   * Simlary, onLike is part of the 'props' object, and is passed in. You can do the same with the onDelete button.
   *
   * This way, we can refactor out the table elements to make cleaner code.
   */

  columns = [
    {
      path: "title",
      label: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}> {movie.title} </Link>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: movie => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      )
    },
    {
      key: "delete",
      content: movie => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={movies}
      />
    );
  }
}

export default MoviesTable;
