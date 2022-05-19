import React from "react";
import { Link } from "react-router-dom";
import "./MobileNavbar.css";

function MobileNavbar() {
  return (
    <div className="mobileNavbar">
      <div className="mobile__navbar__link">
        <Link to="/">
          <img src="./home.jpg" />
        </Link>
      </div>
      <div className="mobile__navbar__link">
        {" "}
        <Link to="/giveProposal">
          <img src="./propose.jpg" />
        </Link>
      </div>
      <div className="mainLink">
        <Link className="mobile__navbar__link__main" to="/castVote">
          <img src="./vote.jpg" />
        </Link>
      </div>
      <div className="mobile__navbar__link">
        {" "}
        <Link to="/contributed">
          <img src="./contribute.jpg" />
        </Link>
      </div>
      <div className="mobile__navbar__link">
        {" "}
        <Link to="/profile">
          <img src="./profile.jpg" />
        </Link>
      </div>
    </div>
  );
}

export default MobileNavbar;
