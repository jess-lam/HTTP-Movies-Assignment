import React, { useState, useEffect } from "react";
import axios from "axios";

const initialMovie = {
    title: "",
    director: "",
    metascore: "",
    stars: []
};

const UpdateForm = props => {
    const [movie, setMovie] = useState()
    console.log(props);
    console.log("dog");
    // debugger
    useEffect(() => {
        const selectedMovie = props.movies.find(movie => {
            return movie.id.toString() === props.match.params.id
        }); 
        console.log(selectedMovie);
        if (selectedMovie) {
            setMovie(selectedMovie);
        }
    }, [props.match.params.id]);

    // useEffect(() => {
    //     const selectedMovie = props.movies.find(movie => {
    //         return movie.id === props.match.params.id
    //     }); 
    //     console.log(selectedMovie);
    //     if (selectedMovie) {
    //         setMovie(selectedMovie);
    //     }
    // }, [movie, props.savedList, props.match.params.id]);

    const changeHandler = e => {
        e.persist();
        let value = e.target.value;
        if (e.target.name === "metascore") {
            value = parseInt(value, 10)
        }

        setMovie({
            ...movie,
            [e.target.name]: value
        })
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios
        .put(`http://localhost:5000/api/movies/${movie.id}}`, movie)
        .then(res => {
            props.addToSavedList(res.data)
        })
        .catch(err => {
            console.log(err);
        });

        //loop/map through movies
        //if the movie id in loop === movie updating, then push the updated object to the array, otherwise, push the existing object
    };
    if (!movie) {
        return null
    }
    return (
        <div>
        <h2>Update Movie</h2>
         <form onSubmit={handleSubmit}>
           <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="title"
          value={movie.title}
        />
        <div className="baseline" />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
          value={movie.director}
        />
        <div className="baseline" />

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="Metascore"
          value={movie.metascore}
        />
        <div className="baseline" />

        <input
          type="string"
          name="stars"
          onChange={changeHandler}
          placeholder="Stars"
          value={movie.stars}
        />
        <div className="baseline" />

        <button className="md-button form-button">Update</button>
      </form>
    </div>
    )
}

export default UpdateForm;