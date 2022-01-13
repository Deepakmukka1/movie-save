/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useReducer, useRef, useEffect } from "react";
import Modal from "./Modal";
import MovieCard from "./MovieCard";
import Navbar from "./Navbar";
import { reducer } from "./Reducer";

export const MovieContext = React.createContext();

const PracticeContext = () => {
  const listEndRef = useRef(null);

  const [movieState, setMovieState] = useState({
    moviename: "",
    year: "",
    image: "",
  });

  const initialState = {
    moviesList: [],
    isModalOpen: false,
    modalContent: "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const newMovie = { ...movieState, [name]: value };
    setMovieState(newMovie);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(movieState);

    if(!isValidUrl(movieState.image))
    {
      dispatch({ type: "INVALID_IMAGE_URL" });
      return
    }

    if (movieState.image && movieState.moviename && movieState.year) {
      dispatch({ type: "ADD_MOVIE", payload: movieState });
      setMovieState({
        moviename: "",
        year: "",
        image: "",
      });
    } else {
      dispatch({ type: "FILL_ALL" });
    }
  };

  useEffect(() => {
    listEndRef.current.scrollIntoView({ behaviour: "smooth" });
  }, [state.moviesList]);

  function isValidUrl(_string) {
    const matchPattern = /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/;
    return matchPattern.test(_string);
  }

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  const deleteMovie = (index) => {
    dispatch({ type: "DELETE_MOVIE", payload: index });
  };

  return (
    <MovieContext.Provider value={{ state }}>
      <Navbar />
      {state.isModalOpen && (
        <Modal modalContent={state.modalContent} closeModal={closeModal} />
      )}
      <form className="form" onSubmit={handleSubmit}>
        <label>✨ Movie name </label>
        <input
          type="text"
          name="moviename"
          onChange={(e) => {
            handleChange(e);
          }}
          value={movieState.moviename}
        />{" "}
        <br />
        <label>🚀 Year of release </label>
        <input
          type="number"
          name="year"
          onChange={(e) => {
            handleChange(e);
          }}
          value={movieState.year}
        />{" "}
        <br />
        <label>🎀 Image url </label>
        <input
          type="text"
          name="image"
          value={movieState.image}
          onChange={(e) => {
            handleChange(e);
          }}
        />{" "}
        {isValidUrl(movieState.image) ? (
          <img
            src={movieState.image}
            style={{ width: "200px", height: "200px", objectFit: "contain" }}
          />
        ) : movieState.image ? (
          <p>Invalid URL</p>
        ) : (
          <p>Image preview</p>
        )}{" "}
        <button className="btn" type="submit">
          Add movie
        </button>
      </form>

      <div className="users">
        {/* <h3>Your movies</h3> */}
        {state.moviesList.map((movie, index) => {
          return (
            <MovieCard
              movie={movie}
              key={index}
              deleteMovie={() => {
                deleteMovie(index);
              }}
            />
          );
        })}
        <div ref={listEndRef}></div>
      </div>
    </MovieContext.Provider>
  );
};

export default PracticeContext;
