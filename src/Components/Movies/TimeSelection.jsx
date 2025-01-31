import React from "react";

function TimeSelection({ selectedTheater, selectedTime, setSelectedTime }) {
  return (
    <section>
      <div className="title blue-large my-5">
        Time
        <div className="options d-flex flex-wrap">
          {selectedTheater?.showtimes?.length > 0 ? (
            selectedTheater?.showtimes?.map((timing, index) => (
              <div
                className={`option m-2 px-3 rounded-gray-border w-auto inactive cursor-pointer ${selectedTime == timing ? "selected" : ""}` }
                key={index}
                onClick={() => {
                  setSelectedTime(timing);
                }}
              >
                <div className="time font-black font-primary fs-6 py-1 font-black">
                  {new Date(timing.startTime).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            ))
          ) : (
            <div className="fs-6 text-black">
              No shows available for the selected date and theater.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default TimeSelection;
