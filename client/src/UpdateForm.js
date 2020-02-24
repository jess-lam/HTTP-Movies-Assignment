import React, { useState, useEffect } from "react";
import axios from "axios";

const initialMovie = {
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: []
};

const UpdateForm = props => {

    const initialMovie = {
        id: Number(props.match.params.id),
        title: "",
        director: "",
        metascore: "",
        stars: []
    };

    const [movie, setMovie] = useState(initialMovie)
    // const [update, setUpdate] = useState()


    // useEffect(() => {
    //     const selectedMovie = props.movies.find(movieparam => {
    //         console.log(movieparam);
    //         return movieparam.id.toString() === props.match.params.id
    //     }); 
    //     console.log(selectedMovie);
    //     if (selectedMovie) {
    //         setMovie(selectedMovie);
    //     }
    // }, []);

    useEffect(() => {
        const selectedMovie = props.movies.find(movie => {
            return movie.id === props.match.params.id
        }); 
        console.log(selectedMovie);
        if (selectedMovie) {
            setMovie(selectedMovie);
        }
    }, [props.savedList, props.match.params.id]);

    const changeHandler = e => {
        e.persist();
        let value = e.target.value;
        if (e.target.name === "metascore") {
            value = parseInt(value, 10)
        }

        if (e.target.name === "stars") {
            value = value.split(",")
        }

        setMovie({
            ...movie,
            [e.target.name]: value
        })


        // setUpdate({
        //     ...update,
        //     [e.target.name]: value
        // })
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios
        .put(`http://localhost:5001/api/movies/${movie.id}`, movie)
        .then(res => {
            props.addToSavedList(res.data)
            props.history.push('/')
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
          type="text"
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