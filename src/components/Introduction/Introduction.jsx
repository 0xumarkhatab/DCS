import React from "react";
import "./Introduction.css";
// import Typical from "react-typical";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function Introduction() {
  let user = null;
  user = useSelector((state) => state?.USER);

  return (
    <div className="introduction">
      {/* <div className="introduction__video">
        <video muted="true" autoPlay="true" loop>
          <source src="intro.mp4" type="video/mp4" />
        </video>
      </div> */}
      <div className="introduction__left">
        <h1>
          Bringing to You! The Decentralized Experience of Creative Society
        </h1>
        <p>We Believe in Collaboration</p>

        <Link
          to={
            user === null || user === undefined
              ? "/authentication"
              : "/castVote"
          }
        >
          <Button variant="primary" key="loginButton" title="Get Started" />
        </Link>
      </div>
      {/* <div className="introduction__right">
        <img src="https://i0.wp.com/aaronherso.files.wordpress.com/2022/02/get-into-the-blockchain-industry-with-cutting-edge-ido-launchpad-like-bscpad-1200-x-630-copy.jpg?ssl=1" />
      </div>
       */}
    </div>
  );
}

export default Introduction;
