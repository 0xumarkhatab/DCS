import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Signup.css";
import Button from "../Button/Button";
import { UpdatePerson } from "../../firebaseConfig";
function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setemail] = useState(null);
  const [rollnumber, setRollnumber] = useState(null);
  const [password, setPassword] = useState(null);

  function signupHandler(e) {
    console.log("handling signup");
    if (rollnumber === null || email === null || password === null) {
      document.getElementById("account__validation").innerHTML =
        "Kindly Fill the fields Correctly";
      return 0;
    } else if (!email?.includes("@lhr.nu.edu.pk")) {
      document.getElementById("account__validation").innerHTML =
        "Kindly Enter Valid University Issued Email";
      return 0;
    } else if (!rollnumber?.includes("L-") && rollnumber.length !== 8) {
      document.getElementById("account__validation").innerHTML =
        "Kindly Enter 8 character Correct Rollnumber";
      return 0;
    } else {
      document.getElementById("account__validation").innerHTML =
        "Credientials Verified";
    }

    let signupObj = {
      email: email,
      rollnumber: rollnumber,
      password: password,
    };
    UpdatePerson(signupObj);
    document.getElementById("email").value = null;
    document.getElementById("password").value = null;
    document.getElementById("rollnumber").value = null;

    //    localStorage.setItem("USER", JSON.stringify(signupObj));

    setTimeout(() => {
      navigate("/login");
    }, 2000);

    //   console.log("pushing it ");
    //   setTimeout(() => {
    //     navigate("/");
    //   }, 1);
  }

  return (
    <div className="signup__wrapper">
      <div className="signup">
        <div className="signup__heading">
          <h1>Signup</h1>
        </div>
        <div className="account__validation" id="account__validation"></div>

        <div>
          <label htmlFor="email">FAST NU email</label>
          <input
            onChange={(e) => {
              setemail(e.target.value);
            }}
            id="email"
            type={"text"}
            placeholder="e.g L191034@lhr.nu.edu.pk"
          />
        </div>
        <div>
          <label htmlFor="email">Roll Number</label>
          <input
            onChange={(e) => {
              setRollnumber(e.target.value);
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
        <div className="signup-btn">
          {/* <Link to="/castVote"> */}
          <Button
            onClick={signupHandler}
            variant="success"
            title={"Signup"}
          ></Button>
          {/* </Link>
           */}
        </div>
      </div>
    </div>
  );
}

export default Signup;
