// import "./Login.css";
import { REGISTER_API } from "../../../constants/Constant";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userDetais, setUserDetails] = useState({
    emai: "",
    password: "",
    username: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigator = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUserDetails({ ...userDetais, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(REGISTER_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetais),
      });
      const data = await response.json();
      if (response.status === 200) {
        //console.log(await response.json());
        setErrorMessage(data.message);
        //localStorage.setItem("token",data.token);
        setIsLoading(false);
        navigator("/");
      } else {
        setErrorMessage(data?.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="message-cont">
          <h1 className="">Welcome back</h1>
          <p className="message-sub-title">Sign up to your accout</p>
        </div>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            placeholder="Enter your username"
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleInputChange}
          />
        </div>
        <p style={{ color: "red", fontSize: "0.8rem" }}>{errorMessage}</p>

        <button className="login-btn" type="submit">
          {isLoading ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="spinner"></div>
            </div>
          ) : (
            "Register"
          )}
        </button>
        <p className="sing-up-text">
          Already have an account?{" "}
          <span onClick={() => navigator("/login")} span className="span">
            Sign in
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
