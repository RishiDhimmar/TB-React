import React from "react";

function SelectedInfo({
  selectedTheater,
  selectedDate,
  selectedTime,
  toggleModal,
}) {
  return (
    <div className="selected-info p-5 my-5 rounded-lg">
      <div className="selected-theater blue-font fs-1 my-2 px-0">
        {selectedTheater?.name || ""}
        
      </div>
      <div className="selected-date font-primary fs-3 text-black">
        {selectedDate
          ? new Date(selectedDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : ""}
      </div>
      <div className="selected-date font-primary fs-3 text-black">
        {selectedTime
          ? new Date(selectedTime?.startTime).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })
          : ""}
      </div>
      <div className="note fs-6 text-black-50 my-3">
        *Seat selection can be done after this
      </div>
      {selectedDate && selectedTheater && selectedTime ? (
        <button type="button" className="button my-2" onClick={toggleModal}>
          Book Now
        </button>
      ) : null}
    </div>
  );
}

export default SelectedInfo;
