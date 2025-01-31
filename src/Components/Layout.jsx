import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };
  return (
    <div className="container-fluid grad-bgc">
      <nav className="navbar d-flex justify-content-between">
        <div className="first">
          <div className="logo-cover">
            <img
              src="/images/logo.png"
              alt="logo"
              className="w-60"
              width="70"
            />
          </div>
        </div>
        <div className="middle">
          <div className="booking-options d-flex">
            <div className="home mx-2 blue-font underline">
              <Link
                to="/dash/movies/movieList"
                className="text-decoration-none blue-font"
              >
                Home
              </Link>
            </div>
            <div className="my-ticket mx-2 blue-font underline">
              <Link
                to="/dash/my-tickets/upcoming"
                className="text-decoration-none blue-font"
              >
                My Ticket
              </Link>
            </div>
          </div>
        </div>
        <div className="last">
          <button
            type="button"
            className="button logout px-3"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>
      <div className="content container">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
