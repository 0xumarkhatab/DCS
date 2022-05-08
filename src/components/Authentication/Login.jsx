import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Login.css";
import Button from "../Button/Button";
import { verifyUser } from "../../firebaseConfig";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [id, setId] = useState(null);
  const [password, setPassword] = useState(null);
  const [verified, setVerified] = useState(false);
  let loginObj;

  async function postVerification() {
    document.getElementById("rollnumber").innerHTML = null;
    document.getElementById("password").innerHTML = null;
    console.log("\nLogin Obj is ", loginObj);
    localStorage.setItem("USER", JSON.stringify(loginObj));

    dispatch({
      type: "SET__USER",
      USER: loginObj,
    });
    navigate("/castVote");
  }

  async function nonVerified() {
    document.getElementById("validation").value =
      "You Are Not Registered Yet\nSign Up First";
  }

  async function loginHandler(e) {
    console.log("handling login");
    if (id === null || password === null) {
      document.getElementById("validation").innerHTML =
        "Kindly Fill the fields Correctly";
      return 0;
    }

    loginObj = {
      rollnumber: id,
      password: password,
    };
    await verifyUser(loginObj, postVerification, nonVerified);

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
            onClick={() => {
              loginHandler();
              setTimeout(() => {
                loginHandler();
              }, 5000);
            }}
            variant="primary"
            title={"Login"}
          ></Button>
          <p id="accountInvalid"></p>
          {/* </Link>
           */}
        </div>
      </div>
    </div>
  );
}

export default Login;
