import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateForm from "./UpdateForm";

const App = (props) => {
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] = useState([]);

  const addToSavedList = movie => {

    // let newSavedList = [...savedList];

    // for(let i=0; i < newSavedList.length; i++) {
    //   if (movie.id === newSavedList[i].id) {
    //     //replace old copy of movie with new copy
    //     newSavedList.splice(i, 1, movie)
    //   }
    // }
    setSavedList([...savedList, movie]);
  };

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/"
      render={props => {
        return <MovieList {...props} movies={movies} setMovies={setMovies}/>
      }}
      />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
      <Route 
      path="/update-movie/:id"
      render={props => (
        <UpdateForm {...props} movies={movies} addToSavedList={addToSavedList} />
      )} />
    </>
  );
};

export default App;
