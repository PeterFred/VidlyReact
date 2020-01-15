import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "../components/common/like";
import Pagination from "../components/common/pagination";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  state = { movies: getMovies(), pageSize: 4, currentPage: 1 };

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  /*
  Create a copy of state (using the spread operator) then use the copy to set state
  */
  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  render() {
    const { length: movieCount } = this.state.movies; //Object destructuring
    const { pageSize, currentPage, movies: allMovies } = this.state;

    if (movieCount === 0) return <h4>There are no movies in the database</h4>;

    const movies = paginate(allMovies, currentPage, pageSize);

    return (
      <React.Fragment>
        <h4>Showing {movieCount} in the database</h4>;
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th />
              <th />
            </tr>
          </thead>

          <tbody>
            {movies.map(movie => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    liked={movie.liked}
                    onClick={() => this.handleLike(movie)}
                  />
                </td>
                <td>
                  <button
                    onClick={() => this.handleDelete(movie)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsCount={movieCount}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
          currentPage={currentPage}
        />
      </React.Fragment>
    );
  }
}

export default Movies;
