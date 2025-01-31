import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SelectNumberOfSeats = ({
  isVisible,
  toggleModal,
  selectedTime,
  selectedMovie,
  selectedTheater,
  selectedDate
}) => {
  const [selectedSeat, setSelectedSeat] = useState();
  // const dummy = "9e8ea575-46bf-4a0b-8594-2d090345992c"
  // const dummy = "2154be22-2b3f-4861-ae7e-01cc8c71da16";

  console.log("selectedTime");
  console.log(selectedTime);

  const navigate = useNavigate();
  if (!isVisible) return null;

  return (
    <div className="container w-100">
      <div
        className="modal modal-lg show d-block "
        tabIndex="-1"
        aria-hidden="false"
      >
        <div className="modal-dialog modal-dialog-centered p-5">
          <div className="modal-content">
            <div className="modal-header text-center ">
              <div className="modal-title fs-2 my-2 text-center blue-font">
                How Many Seats ?
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={toggleModal}
              ></button>
            </div>
            <div className="modal-body d-flex flex-wrap  ">
              <div className="my-2">
                {[...Array(10)].map((ele, index) => {
                  return (
                    <button
                      className="button w-auto my-3 mx-4 py-3 px-4 font-primary"
                      onClick={() => setSelectedSeat(index + 1)}
                      
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="modal-footer d-flex ">
              <button
                type="button"
                className="button inactive font-primary"
                onClick={toggleModal}
              >
                Close
              </button>
              {selectedSeat && (
                <button
                  type="button"
                  className="button active font-primary"
                  onClick={() => {
                    navigate(`/screen/${selectedTime?.showTimeId}`, {
                      state: {
                        numOfSeats: selectedSeat,
                        selectedMovie,
                        selectedTheater,
                        selectedTime,
                        selectedDate
                      },
                    });
                  }}
                >
                  Confirm Booking
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectNumberOfSeats;
