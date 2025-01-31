import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

function DashMovie() {
  const navigate = useNavigate();
  return (
    <>
      <div class="now-show blue-large mb-5">Now Showing</div>
      <div class="btns mb-5 d-flex" style={{"maxHeight" : "50px"}}>
        <button
          type="button"
          className="btn button"
          onClick={() => {navigate("movieList")}}
          id="movie-btn"
        >
          Movie
        </button>
        <div class="gap"></div>
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
