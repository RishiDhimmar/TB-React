import React from 'react'

function MovieDes({movie}) {
  return (
    <>
    <div className="font-secondary text-black ">
                  <div className="temp">{movie?.description}</div>
                  <div className="line border my-3"></div>
                  <div className="row my-2">
                    <div className="col">Duration</div>
                    <div className="col">{Math.floor(movie?.duration/60)}h {" " + movie?.duration%60}m</div>
                  </div>
                  <div className="row my-2">
                    <div className="col">Language</div>
                    <div className="col">{movie?.languages.join(", ")}</div>
                  </div>
                  <div className="row my-2">
                    <div className="col">Category</div>
                    <div className="col">{movie?.category.join(", ")}</div>
                  </div>
                  <div className="row my-2">
                    <div className="col">Type</div>
                    <div className="col">2D</div>
                  </div>
                </div>
    </>

  )
}

export default MovieDes