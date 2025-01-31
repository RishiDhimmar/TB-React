import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { URL } from "../../center";

function PrePayment() {
  const location = useLocation();
  const navigate = useNavigate();

  const { selectedMovie, selectedTheater, selectedTime, selectedSeats, selectedDate, totalPrice } = location?.state || {};
  const [seats, setSeats] = useState({});
  const [error, setError] = useState("");
  useEffect(() => {
    getFrequency();
  }, []);

  const createOrder = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found, please login.");
      navigate("/auth/login");
      return;
    }

    console.log(JSON.stringify(generateReqBody()));

    const res = await fetch(URL + "orders", {
      method: "POST",
      body: JSON.stringify(generateReqBody()),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    });

    const resData = await res.json();

    if (resData.statusCode === 400) {
      setError(resData.message);
    }

    // console.log(resData.paymentUrl);
    if (res.ok) {
      console.log("Redirecting to payment");

      localStorage.setItem('orderId', resData.orderId)

      window.open(resData.paymentUrl, '_self');
    }
  };

  const generateReqBody = () => {
    const reqSeats = [];
    selectedSeats.map((seat) => {
      reqSeats.push({
        row: seat.seatNo[0],
        column: Number(seat.seatNo[1]),
        layoutType: seat.type,
      });
    });

    return {
      showtimeId: selectedTime.showTimeId,
      seatData: {
        seats: reqSeats,
      },
    };
  };



  const getFrequency = () => {
    const newSeats = {};

    selectedSeats.forEach((seat) => {
      newSeats[seat.type] = (newSeats[seat.type] || 0) + 1;
    });

    setSeats(newSeats);
  };

  return (
    <div className="container-fluid grad-bgc">
      <div className="container col-4 booking-detail">
        <div className="text-danger fs-6 font-primary text-center mt-5">{error}</div>
        <div className="styled-border blue-border  border-2 px-5">
          <div className="heading-cov my-3">
            <div className="heading blue-large fs-1 px-0">Booking Detail</div>
          </div>
          <div className="title-cov my-2">
            <div className="label font-secondary text-black fs-5">Movie Title</div>
            <div className="movie-name font-secondary text-black-50 fs-4">
              {selectedMovie?.name}
            </div>
          </div>
          <div className="title-cov my-4">
            <div className="label font-secondary text-black fs-5">Theater</div>
            <div className="movie-name font-secondary text-black-50 fs-4">
              {selectedTheater?.name}
            </div>
          </div>
          <div className="title-cov my-4">
            <div className="label font-secondary text-black fs-5">Date</div>
            <div className="movie-name font-secondary text-black-50 fs-4">
              {new Date(selectedDate).toLocaleString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
          </div>
          <div className="title-cov my-4 d-flex justify-content-between">
            <div className="lefty">
              <div className="label font-secondary text-black fs-5">Ticket</div>
              <div className="movie-name font-secondary text-black-50 fs-4 d-flex">
                {selectedSeats.map((seat) => {
                  return (
                    <div className="font-primary" key={seat.seatNo}>
                      {seat.seatNo + ","}{" "}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="righty">
              <div className="label font-secondary text-black fs-5">Hours</div>
              <div className="movie-name font-secondary text-black-50 fs-4">
                {new Date(selectedTime.startTime).toLocaleString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
          <div className="tran-details">
            <div className="blue-font fs-6 px-0">Transaction Detail</div>
            {Object.keys(seats).map((ele) => {
              return (
                <div key={ele} className="fs-6 text-secondary">
                  <div className="space font-primary">
                    {ele} SEAT x {seats[ele]}
                  </div>
                </div>
              );
            })}
            <div className="d-flex justify-content-between fs-6 text-secondary">
              <div className="space font-primary">Service Charge (6%)</div>
            </div>
            <div className="line border my-2"></div>
            <div className="d-flex justify-content-between fs-5 text-secondary mb-5">
              <div className="space font-primary text-black">Total Payment</div>
              <div className="amount font-primary text-black">
                ${Math.ceil(totalPrice * 1.06)}
              </div>
            </div>
          </div>
          <div className="note font-secondary fs-6 my-2">
            *purchased ticket cannot be cancelled
          </div>
          <button
            type="button"
            className="button mt-4 font-primary"
            onClick={createOrder}
          >
            Total Pay ${Math.ceil(totalPrice * 1.06)} Proceed
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary w-100 my-3 p-2"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default PrePayment;
