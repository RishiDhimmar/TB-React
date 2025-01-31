
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { URL } from "../../center";
import DateSelection from "./DateSelection";
import TheaterSelection from "./TheaterSelection";
import TimeSelection from "./TimeSelection";
import MoviePoster from "./MoviePoster";
import SelectedInfo from "./SelectedInfo";
import SelectNumberOfSeats from "../Seats/SelectNumberOfSeats";

function MovieInfo() {
  const { movieid } = useParams();
  const navigate = useNavigate();
  const [dates, SetDates] = useState([]);
  const [movie, setMovie] = useState(null);
  const [showTimings, setShowTimings] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/auth/login");
      return;
    }

    const newDates = [];
    for (let i = 0; i <= 6; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      newDates.push(date);
    }

    SetDates(newDates);

    const getMovieById = async () => {
      const res = await fetch(URL + "movies/" + movieid, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      });
      const data = await res.json();
      setMovie(data);
    };

    getMovieById();
  }, [movieid, navigate]);

  const getTheaters = async (date) => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      URL + "show-times/" + movieid + "/by-date?date=" + date,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      }
    );
    const data = await res.json();
    setShowTimings(data?.theaters?.filter((timing) => timing?.showtimes.length));
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <div className="content container">
      <div className="icon-cov cursor-pointer"  onClick={() => navigate(-1)}>
        <img src="/images/leftArrow.png" alt="Back" width="60" />
      </div>
      <div className="container d-flex">
        <div className="content-left container">
          <DateSelection dates={dates} selectedDate={selectedDate} setSelectedDate={setSelectedDate} getTheaters={getTheaters} setSelectedTheater={setSelectedTheater} />
          <TheaterSelection showTimings={showTimings} selectedTheater={selectedTheater} setSelectedTheater={setSelectedTheater} setSelectedTime={setSelectedTime} />
          <TimeSelection selectedTheater={selectedTheater} selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
        </div>
        <div className="righty container col-4 mh-vh-100 d-flex justify-content-center">
          <div className="container mx-auto">
            <MoviePoster movie={movie} />
            <div class="movie-details">
                <div class="movie-title">
                  <div class="blue-font fs-2">
                    {movie?.name}
                  </div>
                </div>
                {console.log(movie)
                }
                <div class="font-secondary text-black ">
                  <div class="temp">{movie?.description}</div>
                  <div className="line border my-3"></div>
                  <div class="row my-2">
                    <div class="col">Duration</div>
                    <div class="col">{Math.floor(movie?.duration/60)}h {" " + movie?.duration%60}m</div>
                  </div>
                  <div class="row my-2">
                    <div class="col">Language</div>
                    <div class="col">{movie?.languages.join(", ")}</div>
                  </div>
                  <div class="row my-2">
                    <div class="col">Category</div>
                    <div class="col">{movie?.category.join(", ")}</div>
                  </div>
                  <div class="row my-2">
                    <div class="col">Type</div>
                    <div class="col">2D</div>
                  </div>
                </div>
              </div>
            <SelectedInfo
              selectedTheater={selectedTheater}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              toggleModal={toggleModal}
            />
          </div>
        </div>
      </div>
      <SelectNumberOfSeats
        isVisible={isModalVisible}
        toggleModal={toggleModal}
        selectedTime={selectedTime}
        selectedMovie={movie}
        selectedTheater={selectedTheater}
        selectedDate={selectedDate}
      />
    </div>
  );
}

export default MovieInfo;
