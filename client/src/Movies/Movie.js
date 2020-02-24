import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  deleteItemId = this.props.match.params.id
deleteItem = id => {
  // e.preventDefault();
  axios
  .delete(`http://localhost:5001/api/movies/${id}`)
  .then(res => {
    console.log(res)
    this.props.addToSavedList(res.data)
    this.props.history.push('/')
  })
  .catch(err => {
    console.log("error:", err)
  })
}
  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5001/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    //if you see "EADDR, server is already being listened"
    //we need to follow in order where the errors are coming from and in the order of when they are being read by JS, NOT in the order of how we wrote them
    //we learned that state is asychronous, and to check in the dev tools whether they have been updated or not
    //if app is broken, setState takes a second argument, Callback function, that you can console log state in there
    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <button className="update-button" onClick={() => this.props.history.push(`/update-movie/${this.state.movie.id}`)}>
          Update
        </button>
        <button onClick={() => this.deleteItem(this.deleteItemId)}>
          Delete
        </button>
      </div>
    );
  }
}
