import React from "react";

function TheaterSelection({
  showTimings,
  selectedTheater,
  setSelectedTheater,
  setSelectedTime,
}) {
  return (
    <section>
      <div className="title blue-large">
        Theater
        <div className="options d-flex flex-wrap">
          {showTimings?.length > 0 ? (
            showTimings.map((theater, index) => (
              <div
                key={index}
                className={`option m-2 px-3 d-flex rounded-gray-border w-auto cursor-pointer ${
                  selectedTheater == theater ? "selected" : ""
                }`}
                onClick={() => {
                  setSelectedTheater(theater);
                  setSelectedTime("");
                }}
              >
                <img
                  src="/images/location.png"
                  alt="Location"
                  className="icon m-auto"
                  width="30"
                  height="30"
                />
                <div className="loc p-2 font-primary fs-6">{theater.name}</div>
              </div>
            ))
          ) : (
            <div className="fs-6 text-black">
              No theaters available for the selected date.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default TheaterSelection;
