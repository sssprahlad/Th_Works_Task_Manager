import "./Login.css";
import { LOGIN_API } from "../../../constants/Constant";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userDetais, setUserDetails] = useState({
    emai: "",
    password: "",
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

    try {
      setIsLoading(true);
      const response = await fetch(LOGIN_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetais),
      });
      const data = await response.json();
      if (response.status === 200) {
        //console.log(await response.json());

        localStorage.setItem("token", data.token);
        navigator("/");
        setErrorMessage(data.message);
        setIsLoading(false);
      } else {
        setErrorMessage(data.message || "Login failed. Plz try again");
      }
    } catch (error) {
      console.log(error);
      // setErrorMessage(response.message);
    }
    setIsLoading(false);
  };

  console.log(errorMessage, "error");

  return (
    <div className="login-container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="message-cont">
          <h1 className="">Welcome back</h1>
          <p className="message-sub-title">Sign in to your accout</p>
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
            "Login"
          )}
        </button>
        <p className="sing-up-text">
          Don't have an account?{" "}
          <span onClick={() => navigator("/register")} className="span">
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
