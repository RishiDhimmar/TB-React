import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL } from "../../center";
import Upcoming from "./Upcoming";

function MyTicket() {
  const [upcoming, setUpcoming] = useState();
  const [history, setHistory] = useState();
  const [toggle, setToggle] = useState(true);

  const filterOrders = (orders) => {
    const tempUpcoming = [];
    const tempHistory = [];
    orders.map((order) => {
      if (order.status === "COMPLETED") {
        if (new Date(order?.showtime?.startTime) > new Date(Date.now())) {
          tempUpcoming.push(order);
        } else {
          tempHistory.push(order);
        }
      }
    });

    setUpcoming(tempUpcoming);
    setHistory(tempHistory);
  };

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found, please login.");
      navigate("/auth/login");
      return;
    }
    const getOrders = async () => {
      try {
        const res = await fetch(URL + "orders", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        });
        const data = await res.json();
        console.log(data);
        filterOrders(data);
      } catch (e) {
        console.log(e.message);
      }
    };
    getOrders();
  }, []);

  return (
    <div className="wrap ">
      <div className="wrap mb-5 w-auto h-auto d-flex">
        <button
          type="button"
          className={`w-auto px-5 border-0 font-primary ${toggle ? "selected" : "inactive"}`}
          onClick={() => {
            setToggle(true);
          }}
          id="movie-btn"
        >
          Upcoming
        </button>
        <button
          type="button"
          className={`w-auto mx-4 px-5 border-0 font-primary ${!toggle ? "selected" : "inactive"}`}
          onClick={() => {
            setToggle(false);
          }}
          id="theater-btn"
        >
          History
        </button>
      </div>

      {toggle ? <Upcoming orders={upcoming} /> : <Upcoming orders={history} />}
    </div>
  );
}

export default MyTicket;
