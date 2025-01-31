import React from "react";
import handleDownloadPDF from "../Pdf/handleDownloadPDF"

function TicketFormat({ startTime, movieName, seatData, theater }) {
  
  return (
    <>
      <div className="container movie-card col-3 p-3  my-5 blue-border d-flex flex-column mx-4">
        <div className="wrap my-1">
          <div className="blue-font">Date</div>
          <div className="font-primary mx-2 fs-4 text-black">
            {new Date(startTime).toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
        <div className="wrap my-1">
          <div className="blue-font">Movie Title</div>
          <div className="font-primary mx-2 fs-4 text-black">{movieName}</div>
        </div>
        <div className="wrap my-1">
          <div className="blue-font">Theater Name</div>
          <div className="font-primary mx-2 fs-4 text-black">{theater}</div>
        </div>
        <div className="wrap my-1 d-flex justify-content-between">
          <div className="lefty">
            <div className="blue-font">Ticket ({seatData?.seats?.length})</div>
            <div className="font-primary fs-4 mx-2 text-black">
              {seatData?.seats.map((seat) => {
                return (
                  <span className="fs-4">
                    {seat.row + seat.column} {"  "}{" "}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="righty">
            <div className="blue-font">Hours</div>
            <div className="font-primary fs-4 text-black">
              {new Date(startTime).toLocaleString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>
        <div className="wrap">
          <button
            type="button"
            className="button font-primary my-1 p-3  rounded"
            onClick={() => {handleDownloadPDF(startTime, movieName, seatData, theater)}}
          >
            Download Ticket
          </button>
        </div>
      </div>
    </>
  );
}

export default TicketFormat;
