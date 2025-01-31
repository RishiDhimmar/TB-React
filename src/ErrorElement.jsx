import React from "react";
import { useNavigate } from "react-router-dom";

function ErrorElement() {
    const navigate = useNavigate()
  return (
    <>
      <div className="container-fluid text-center py-5 grad-bgc">
        <div className="font-primary fs-2 my-5 blue-font">OOPS !!!</div>

        <button className="btn btn-outline-secondary" onClick={ () => {
            navigate('/')
        }}>
            Go Back To Site
        </button>
      </div>
    </>
  );
}

export default ErrorElement;
