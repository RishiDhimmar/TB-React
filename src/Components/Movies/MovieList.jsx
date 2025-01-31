import React, { useEffect, useState } from "react";
import { URL } from "../../center";
import { useNavigate } from "react-router-dom";
import MovieCardSm from "./MovieCardSm";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found, please login.");
      navigate("/auth/login");
      return;
    }
    const getMovies = async () => {
      try {
        const res = await fetch(URL + "movies", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        });
        const data = await res.json();
        // console.log(data);

        setMovies(data)
        // console.log(movies);
      } catch (e) {
        console.log(e.message);
      }
    };
    getMovies();
  }, []);

  return (
    <div className="movie-sec">
      <div className="container d-flex flex-wrap">
        {movies.length !== 0 ? (
          movies.map((ele, index) => {
            return (
             <MovieCardSm image={ele.image} name={ele.name} id={ele.id} />
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default MovieList;
