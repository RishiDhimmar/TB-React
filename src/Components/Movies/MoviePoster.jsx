import React from "react";

function MoviePoster({ movie }) {
  return (
    <div className="poster">
      <div className="poster-con">
        <img
          src={movie?.image}
          alt={movie?.name}
          className="rounded img-thumbnail p-0 m-auto"
          width="440"
        />
      </div>
    </div>
  );
}

export default MoviePoster;
