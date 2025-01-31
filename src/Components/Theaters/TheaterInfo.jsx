import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { URL } from "../../center";
import SelectNumberOfSeats from "../Seats/SelectNumberOfSeats";
import { FaArrowLeftLong } from "react-icons/fa6";

function TheaterInfo() {
  const { theaterid } = useParams();
  const [theater, setTheater] = useState(null);
  const [moviesByTheater, setMoviesByTheater] = useState([]);
  const [date, setDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const fetchMoviesByTheater = async (token) => {
    try {
      const res = await fetch(URL + "theaters/" + theaterid + "/movies", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Failed to fetch theater data");
      const data = await res.json();
      // console.log("hola");

      console.log(data);

      setTheater(data.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const fetchMoviesByDateAndTheater = async (token) => {
    if (date == null) setDate(new Date());
    try {
      const res = await fetch(
        URL + `theaters/${theaterid}/shows?date=${date}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch movie data");
      const data = await res.json();

      console.log(data);

      setMoviesByTheater(data.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found, please login.");
      navigate("/auth/login");
      return;
    }
    if (date == null) fetchMoviesByTheater(token);
  }, [theaterid]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found, please login.");
      navigate("/auth/login");
      return;
    }

    fetchMoviesByDateAndTheater(token);
  }, [date]);

  const toggleModal = () => setIsModalVisible(!isModalVisible);

  const formatDate = (date) => {
    return {
      day: new Date(date).toLocaleString("en-US", {
        day: "numeric",
        month: "short",
      }),
      weekday: new Date(date).toLocaleString("en-US", { weekday: "short" }),
    };
  };

  const handleDateChange = (newDate) => {
    const newDateObj = new Date(newDate);
    if (newDateObj.getDate() !== date?.getDate()) {
      setDate(newDateObj);
    }
  };

  const handleTimeSelection = (show, movie) => {
    setSelectedTime(show);
    setSelectedMovie(movie);
  };

  return (
    <div className="con mx-5">
      <div className="top-lvl mx-auto d-flex">
        <div className="icon-cov d-flex align-items-center pt-3 justify-content-center">
          <Link to={"/dash/movies/theaterList"}>
            <FaArrowLeftLong />
          </Link>
        </div>
        <div className="heading blue-font fs-1 ml-5">
          <div>{theater?.name}</div>
          <div className="con d-flex">
            <div className="icon-cov mx-3 cursor-pointer">
              <img src="/images/location.png" alt="right" width="50" />
            </div>
            <div className="add font-secondary fs-6 text-black-50 d-flex align-items-center">
              {theater?.location}
            </div>
          </div>
        </div>
      </div>

      {/* Date Slider */}
      <div className="slider d-flex mx-5">
        <div className="left-arr d-flex align-items-center mx-3">
          <IoMdArrowDropleft
            className="blue-font fs-1 cursor-pointer"
            onClick={() => handleDateChange(new Date())}
          />
        </div>

        {[...Array(7)].map((ele, index) => {
          const temp = new Date(Date.now() + 24 * 60 * 60 * 1000 * index);
          const textDate = formatDate(temp);
          return (
            <>
              <div
                className={`btn inactive border border-secondary rounded px-3`}
                onClick={() => handleDateChange(temp)}
              >
                <div className="date font-secondary fs-6 text-black">
                  {textDate.day}
                </div>
                <div className="day font-secondary fw-bold text-center fs-6 text-black-50">
                  {textDate.weekday}
                </div>
              </div>
            </>
          );
        })}

        <div className="right-arr d-flex align-items-center">
          <IoMdArrowDropright className="blue-font fs-1 cursor-pointer" />
        </div>
      </div>

      <div className="line border my-4"></div>

      {/* Movies List */}
      <div className="theaters">
        {moviesByTheater.length == 0 ? (
          <div className="text-black font-primary fs-5  my-5 text-center" style={{ 'height' : "100vh"}}> No Movies For the date</div>
        ) : (
          moviesByTheater?.map((movie, index) => (
            <div key={index} className="theater py-4 row">
              <div className="lefty col-10">
                <div className="title blue-font">{movie?.name}</div>
                <div className="font-secondary text-black-50 mx-2">
                  {movie?.languages?.[0] || "Language not available"}, 2D
                </div>
                <div className="font-secondary text-black-50 mx-2">Time</div>
                <div className="options d-flex flex-wrap">
                  {movie?.showTimes.map((show, index) => (
                    <div
                      key={index}
                      className={`option m-2 px-3 rounded-gray-border cursor-pointer ${
                        selectedTime == show ? "selected" : ""
                      }`}
                      onClick={() => handleTimeSelection(show, movie)}
                    >
                      <div className="time font-black font-primary fs-6 py-1 font-black">
                        {new Date(show?.startTime).toLocaleString("en-US", {
                          minute: "2-digit",
                          hour: "2-digit",
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="righty col-2 my-auto">
                {selectedTime && movie?.name == selectedMovie.name ? (
                  <button
                    type="button"
                    className="button"
                    onClick={toggleModal}
                  >
                    {/* {console.log(selectedTime)} */}
                    Book Now
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Booking Modal */}
      <SelectNumberOfSeats
        isVisible={isModalVisible}
        toggleModal={toggleModal}
        selectedTime={{ ...selectedTime, showTimeId: selectedTime?.id }}
        selectedMovie={selectedMovie}
        selectedTheater={theater}
        selectedDate={date}
      />
    </div>
  );
}

export default TheaterInfo;
