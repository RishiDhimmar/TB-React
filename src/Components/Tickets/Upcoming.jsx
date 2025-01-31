import React from "react";
import TicketFormat from "./TicketFormat";

function Upcoming({ orders }) {
  return (
    <>
    <div className="d-flex flex-wrap justify-content-center">

      {orders?.length != 0 ?
        orders?.map((order) => {
          return (
            <TicketFormat
              startTime={order?.showtime?.startTime}
              seatData={order?.seatData}
              movieName={order?.showtime?.movie?.name}
              theater={order?.showtime?.screen?.theaterName}
            />
          )
        } ) : <>
        <div className="blue-font fs-4">No Tickets</div>
        </>
        }
    </div>

    </>
  );
}

export default Upcoming;
