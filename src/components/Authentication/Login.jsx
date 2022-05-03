import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Login.css";
import Button from "../Button/Button";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [id, setId] = useState(null);
  const [password, setPassword] = useState(null);

  function loginHandler(e) {
    console.log("handling login");
    if (id === null || password === null) {
      document.getElementById("validation").innerHTML =
        "Kindly Fill the fields Correctly";
      return;
    }
    let loginObj = {
      rollnumber: id,
      password: password,
    };

    document.getElementById("rollnumber").value = null;
    document.getElementById("password").value = null;
    localStorage.setItem("USER", JSON.stringify(loginObj));
    console.log("written ", localStorage.getItem("USER"));
    navigate("/castVote");

    dispatch({
      type: "SET__USER",
      USER: loginObj,
    });

    //   console.log("pushing it ");
    //   setTimeout(() => {
    //     navigate("/");
    //   }, 1);
  }

  return (
    <div className="login__wrapper">
      <div className="login">
        <div className="login__heading">
          <h1>Login</h1>
        </div>
        <div className="validation" id="validation"></div>

        <div>
          <label htmlFor="rollnumber">Roll Number</label>
          <input
            onChange={(e) => {
              setId(e.target.value);
            }}
            id="rollnumber"
            type={"text"}
            placeholder="e.g 19L-1234"
          />
        </div>
        <div>
          <label htmlFor="csmpass">Password</label>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            id="password"
            type={"password"}
          />
        </div>
        <div className="login-btn">
          {/* <Link to="/castVote"> */}
          <Button
            onClick={loginHandler}
            variant="primary"
            title={"Login"}
          ></Button>
          {/* </Link>
           */}
        </div>
      </div>
    </div>
  );
}

export default Login;
