import React from 'react'
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function Success() {
  const navigate = useNavigate()
  return (
    <div className="container-fluid grad-bgc overflow-hidden">
        <div className="container col-4 text-center main-con d-flex align-items-center">
            <div className="heading fs-1 font-primary text-black">
                Payment Successful
            </div>
            <FaCheckCircle  id='tick'></FaCheckCircle>
            <button type="button" className="button mt-5 blue-font py-3 col-11" onClick={() => navigate("/tickets/show-ticket")}>View Ticket</button>
            <button type="button" className="btn btn-outline-secondary mt-3 w-100 py-3 col-11" onClick={() => {
              navigate("/dash/movies/movieList");
            }}>Back To Home Page</button>
        </div>
    </div>
  )
}

export default Success