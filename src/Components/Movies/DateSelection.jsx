import React from "react";

function DateSelection({
  dates,
  selectedDate,
  setSelectedDate,
  getTheaters,
  setSelectedTheater,
}) {
  return (
    <section>
      <div className="title my-5 blue-large">
        Date
        <div className="options d-flex flex-wrap">
          {dates.map((date, index) => {
            const isSelected =
              selectedDate &&
              date.toLocaleDateString() === selectedDate.toLocaleDateString();
            return (
              <div
                key={index}
                className={`option m-2 p-3 rounded-gray-border w-auto cursor-pointer ${
                  isSelected ? "selected" : ""
                }`}
                onClick={() => {
                  setSelectedDate(date);
                  setSelectedTheater("");
                  getTheaters(date);
                }}
              >
                <div className="date text-center mx-3 fs-5">
                  {date.toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                  })}
                </div>
                <div className="font-secondary fs-5 text-center fw-bold">
                  {date.toLocaleDateString("en-US", { weekday: "short" })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default DateSelection;
