import React from "react";
import { useNavigate } from "react-router-dom";

function MovieCardSm({ image, name, id }) {
  const navigate = useNavigate()
  return (
    <div className="card mb-5" key={id} onClick={() => navigate(`../../movie/${id}`)}>
      <div
        className="img-cov d-flex justify-content-center cursor-pointer "
        style={{ minHeight: "500px", overflow: "hidden" }}
      >
        <img
          src={image}
          alt={name}
          className="img-fluid"

          style={{
            objectFit: "contain",
            width: "100%",
            height: "100%",
            
          }}
        />
      </div>
        
      <div className="movie-title">
        <div className="blue-font" >{name}</div>
      </div>
    </div>
  );
}

export default MovieCardSm;
