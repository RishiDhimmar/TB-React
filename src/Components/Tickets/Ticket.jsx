import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL } from "../../center";
import TicketFormat from "./TicketFormat";

function Ticket() {
  const navigate = useNavigate();
  const [ticket, setTicket] = useState();

  const getTicketInfo = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Un-authorized");
      navigate("/auth/login");
    }
    const orderId = localStorage.getItem("orderId");
    console.log(orderId);

    const res = await fetch(URL + "orders/" + orderId, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    });

    const resData = await res.json();

    console.log(resData);
    setTicket(resData);
  };

  useEffect(() => {
    getTicketInfo();
  }, []);

  return (
    <div className="container-fluid grad-bgc overflow-hidden ">
      <div className="container d-flex flex-column align-items-center  justify-content-center ">
        {ticket ? (
          <TicketFormat
            startTime={ticket?.showtime?.startTime}
            movieName={ticket?.showtime?.movie?.name}
            seatData={ticket?.seatData}
            theater= {ticket?.showtime?.screen?.theaterName}
          />
        ) : (
          <div className="fs-6 text-black font-primary loading">
            Loading ...
          </div>
        )}

        <button className="btn btn-outline-secondary" onClick={() => navigate('/dash/movies/movieList')}>Back to Home</button>
      </div>
    </div>
  );
}

export default Ticket;
