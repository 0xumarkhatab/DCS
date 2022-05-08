import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import "./Authentication.css";

function Authentication() {
  return (
    <div className="authentication">
      <div className="authentication__header">
        <img src="./dcs__logo.png" />
        <div className="brand">
          <h5>Authentication Portal</h5>
        </div>
      </div>
      <div className="authentication__instructions">
        <p>{"->"} Login If You have An Account</p>
        <p>{"->"} Not have An Account? Sign Up</p>
      </div>

      <div className="authentication__buttons">
        <Link to="/login">
          <Button variant={"primary"} title={"Login"}>
            Login
          </Button>
        </Link>
        <Link to="/signup">
          <Button variant={"success"} title={"SignUp"}>
            SignUp
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Authentication;
