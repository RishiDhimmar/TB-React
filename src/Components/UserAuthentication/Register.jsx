import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // For navigation
// import "../App.css";
import { URL } from "../../center";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    fname: "",
    lname: "",
    password: "",
    conPassword: "",
  });
  const [message, setMessage] = useState({
    type: "",
    content: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { fname, lname, email, password, conPassword } = formData;
    if (!fname || !lname || !email || !password || !conPassword) {
      setMessage({ type: "error", content: "Please fill out all fields" });
      return false;
    }
    if (password !== conPassword) {
      setMessage({ type: "error", content: "Passwords do not match" });
      return false;
    }
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await fetch(URL + "auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.fname,
          lastName: formData.lname,
          email: formData.email,
          password: formData.password,
        }),
      });

      console.log(res);

      if (!res.ok) {
        const errorData = await res.json();

        setMessage({
          type: "error",
          content: errorData.message || "Registration failed",
        });
        return;
      }

      setMessage({ type: "success", content: "User registered successfully" });

      navigate("/auth/login");
    } catch (error) {
      console.error("Error:", error);
      setMessage({
        type: "error",
        content: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        {["fname", "lname", "email", "password", "conPassword"].map((field) => (
          <div key={field + "id"} className="input-wrap my-3">
            <div className="label font-primary fs-6">
              {field.charAt(0) === "f" ? " First Name" : ""}
              {field.charAt(0) === "l" ? " Last Name" : ""}
              {field.charAt(0) !== "f" && field.charAt(0) !== "l"
                ? " " + field
                : ""}
            </div>
            <input
              type={
                (field.includes("password") || field.includes("conPassword"))
                  ? "password"
                  : field === "email"
                  ? "email"
                  : "text"
              }
              name={field}
              id={field}
              value={formData[field]}
              onChange={handleInputChange}
              className="input-box font-primary fs-6"
              placeholder={
                "Enter" +
                `${field.charAt(0) === "f" ? " First Name" : ""}` +
                `${field.charAt(0) === "l" ? " Last Name" : ""}` +
                `${
                  field.charAt(0) !== "f" && field.charAt(0) !== "l"
                    ? " " + field
                    : ""
                }`
              }
              required
            />
          </div>
        ))}
        <div className="btn-wrap">
          <button type="submit" className="button my-4">
            Sign Up
          </button>
        </div>
      </form>
      <div className="text-center">
        <span className="font-secondary fs-6">Already have an account? </span>
        <Link to="/auth/login" className="font-primary link fs-6">
          Log In
        </Link>
      </div>
      {message.content && (
        <div className="text-center my-2">
          <span className={`msg text-${message.type} font-primary fs-6`}>
            {message.content}
          </span>
        </div>
      )}
    </div>
  );
};

export default Register;
