import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

function DashMovie() {
  const navigate = useNavigate();
  return (
    <>
      <div className="now-show blue-large mb-5">Now Showing</div>
      <div className="btns mb-5 d-flex" style={{"maxHeight" : "50px"}}>
        <button
          type="button"
          className="btn button"
          onClick={() => {navigate("movieList")}}
          id="movie-btn"
        >
          Movie
        </button>
        <div className="gap"></div>
        <button
          type="button"
          className=" inactive btn"
          onClick={() => {navigate("theaterList")}}
          id="theater-btn"
        >
          Theater
        </button>
      </div>
      <Outlet />
    </>
  );
}

export default DashMovie;
