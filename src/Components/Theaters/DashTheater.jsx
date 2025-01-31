import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL } from "../../center";

function DashTheater() {
  const [theaters, setTheaters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found, please login.");
      navigate("/auth/login");
      return;
    }
    const getTheaters = async () => {
      try {
        const res = await fetch(URL + "theaters", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        });
        const data = await res.json();
        // console.log(data.data);

        setTheaters(data.data);
      } catch (e) {
        console.log(e.message);
      }
    };
    getTheaters();
  }, []);

  return (
    <>
      <div className="theater-sec">
        <div className="container">
          {theaters.length === 0 ? (
            <span className="blue-font fs-6">Loading</span>
          ) : (
            <>
              {theaters.map((theater, index) => {
                return (
                  <div className="entry d-flex justify-content-between" onClick={() => navigate(`../../theater/${theater.id}`)}>
                    <div className="left-entry">
                      <div className="name">
                        <div className="blue-font">{theater.name}</div>
                      </div>
                      <div className="desc d-flex">
                        <div className="icon-cov">
                          <img
                            src="/images/location.png"
                            alt="location"
                            srcset=""
                          />
                        </div>
                        <div className="text mx-3">
                          <div className="add font-primary">
                            {theater.location}
                          </div>
                          <div className="pin font-primary">90210</div>
                        </div>
                      </div>
                    </div>
                    <div className="right-entry ">
                      <div className="icon-cov">
                        <img src="/images/arrow.png" alt="" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default DashTheater;
