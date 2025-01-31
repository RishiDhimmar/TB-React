import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation
// import "../App.css";
import { URL } from "../../center";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    
    console.log(JSON.stringify({
        email,
        password,
      }));
    
    try {
      const res = await fetch(URL + "auth/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      const resData = await res.json();
      if (!res.ok) {
        setErrorMessage(resData.message);
        return;
      }

      console.log(resData);

      localStorage.setItem("token" , resData.data.accessToken)
      navigate('/dash/movies')
    } catch (e) {
      console.log("Error : " + e.message);
      setErrorMessage(e.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div className="input-wrap my-4 fs-6">
          <div className="label font-primary">Email</div>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-box font-primary fs-6"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="input-wrap my-4 fs-6">
          <div className="label font-primary">Password</div>
          <input
            type="password"
            name="pass"
            id="pass"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-box font-primary fs-6"
            placeholder="Enter Password"
            required
          />
        </div>
        <div className="btn-wrap">
          <button type="submit" className="button my-4">
            Login
          </button>
        </div>
      </form>
      <div className="text-center">
        <span className="font-secondary  fs-6">Don't have an account? </span>
        <Link to="/auth/signup" className="font-primary link fs-6">
          Register Here
        </Link>
      </div>
      <div className="text-center">
        <span className="text-danger error-msg fs-6 fw-light">{errorMessage}</span>
      </div>
    </div>
  );
};

export default Login;
