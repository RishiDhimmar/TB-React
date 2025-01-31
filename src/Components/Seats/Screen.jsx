import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { URL } from "../../center";

function Screen() {
  const { showTimeId } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();
  const [showTime, setShowTime] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [layout, setLayout] = useState();
  const [unavailableSeats, setUnavailableSeats] = useState(new Set());

  const location = useLocation();
  const {
    numOfSeats,
    selectedMovie,
    selectedTheater,
    selectedTime,
    selectedDate,
  } = location.state;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found, please login.");
      navigate("/auth/login");
      return;
    }

    const getScreenById = async () => {
      try {
        const res = await fetch(URL + "show-times/" + showTimeId, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch screen data");
        }
        const data = await res.json();
        setShowTime(data.data);

        console.log(data.data);

        const orders = data.data.orders;
        const temp = new Set();

        orders.map((order) => {
          let seats = order.seatData.seats;
          seats.map((seat) => {
            temp.add(seat.row + "" + seat.column);
          });
        });

        setUnavailableSeats(temp);

        console.log(temp);

        if (Array.isArray(data.data.screen.layout)) {
          setLayout(data.data.screen.layout);
        } else {
          try {
            setLayout(JSON.parse(data.data.screen.layout));
          } catch (err) {
            console.error("Error parsing layout:", err);
          }
        }
      } catch (e) {
        console.log(e.message);
      }
    };

    getScreenById();
  }, [showTimeId, navigate]);

  // const handleSeatClicked = (seat, type) => {
  //   if (selectedSeats.length < numOfSeats) {
  //     setSelectedSeats((prevSeats) => {
  //       const newSeat = { seatNo: seat, type };
  //       if (!prevSeats.some((s) => s.seatNo === seat && s.type === type)) {
  //         return [...prevSeats, newSeat];
  //       }
  //       return prevSeats.filter((s) => !(s.seatNo === seat && s.type === type));
  //     });
  //   }
  // };
  const handleSeatClicked = (seat, type) => {
    setSelectedSeats((prevSeats) => {
      if (prevSeats.some((s) => s.seatNo === seat && s.type === type)) {
        return prevSeats.filter((s) => !(s.seatNo === seat && s.type === type));
      }
      const newSeat = { seatNo: seat, type };
      if (selectedSeats?.length < numOfSeats) {
        return [...prevSeats, newSeat];
      }
      return prevSeats
    });
  };

  const calculateTotalPrice = () => {
    return selectedSeats.reduce((total, selectedSeat) => {
      const priceInfo = showTime?.price.find(
        (p) => p.layoutType === selectedSeat.type
      );
      return priceInfo ? total + priceInfo.price : total;
    }, 0);
  };

  const isUnavailable = (row, column) => {
    return unavailableSeats.has(row + "" + column);
  };

  return (
    <div className="container-fluid grad-bgc my-0 overflow-hidden ">
      <div className="top-lvl mx-5 my-5 d-flex">
        <div className="icon-cov cursor-pointer">
          <img
            src="/images/leftArrow.png"
            alt="Back"
            className="mx-5 w-100 cursor-pointer"
            onClick={() => navigate(-1)}
          />
        </div>
        <div className="heading blue-font fs-1 p-4">Select Seat</div>
      </div>
      <div className="selectSeat container-lg mx-5 d-flex flex-column align-items-center mx-auto">
        <div className="selectedSeats border  d-flex flex-column mx-auto">
          <div className="blue-font">Selected Seats</div>
          <div className="wrap d-flex flex-wrap ">
            {selectedSeats?.map((ele, index) => (
              <div key={index} className="border p-2 px-3 m-2 w-auto button">
                {ele.seatNo} ({ele.type})
              </div>
            ))}
          </div>
        </div>

        {layout ? (
          layout.map((ele, index) => (
            <div key={index} className="">
              <div className="price-cov my-3">
                <div className="font-secondary text-black-50">
                  {ele?.type} -{" "}
                  {showTime?.price.find((p) => p.layoutType === ele?.type)
                    ?.price || ""}
                </div>
                <div className="line border"></div>
              </div>
              <div className="seats w-100 col-10 ">
                {ele?.layout?.rows?.map((row, rowIndex) => (
                  <div key={rowIndex} className="row seat-row col-10">
                    {Array.from({ length: ele?.layout?.columns[1] }).map(
                      (col, colIndex) => (
                        <button
                          key={row + (colIndex + 1)}
                          type="button"
                          className={` seatBtn inactive text-black-50 border font-primary`}
                          onClick={(event) => {
                            handleSeatClicked(row + (colIndex + 1), ele.type);
                          }}
                          disabled={isUnavailable(row, colIndex + 1)}
                        >
                          {row + (colIndex + 1)}
                        </button>
                      )
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div>Loading layout...</div>
        )}

        <div className="thick-line h-25 bg-secondary mt-5 opacity-50 rounded"></div>
        <div className="note font-secondary text-black-50 text-center">
          All eyes this way please!!!
        </div>
      </div>

      <div className="line border-top d-flex justify-content-center my-4 p-5">
        {selectedSeats.length !== numOfSeats ? (
          <span className="text-danger">Please Select {numOfSeats} Seats</span>
        ) : (
          <>
            <button
              type="button"
              className="button w-auto px-5 outline-0 border-1 blue-font"
              onClick={() => {
                const price = calculateTotalPrice();
                setTotalPrice(price);
                navigate("/tickets/pre-payment", {
                  state: {
                    selectedMovie,
                    selectedTheater,
                    selectedTime,
                    selectedSeats,
                    selectedDate,
                    totalPrice: price,
                  },
                });
              }}
            >
              Pay {calculateTotalPrice()} ₹
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Screen;
