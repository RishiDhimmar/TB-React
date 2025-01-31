import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };
  return (
    <div class="container-fluid grad-bgc">
      <nav class="navbar d-flex justify-content-between">
        <div class="first">
          <div class="logo-cover">
            <img
              src="/images/logo.png"
              alt="logo"
              srcset=""
              class="w-60"
              width="70"
            />
          </div>
        </div>
        <div class="middle">
          <div class="booking-options d-flex">
            <div class="home mx-2 blue-font underline">
              <Link
                to="/dash/movies/movieList"
                className="text-decoration-none blue-font"
              >
                Home
              </Link>
            </div>
            <div class="my-ticket mx-2 blue-font underline">
              <Link
                to="/dash/my-tickets/upcoming"
                className="text-decoration-none blue-font"
              >
                My Ticket
              </Link>
            </div>
          </div>
        </div>
        <div class="last">
          <button
            type="button"
            class="button logout px-3"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>
      <div class="content container">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
