import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
// import Button from "../Button/Button";

import "./Navbar.css";
// import { useSelector } from "react-redux/es/exports";

function AdminNavbar() {
  const dispatch = useDispatch();
  let user = null;
  user = useSelector((state) => state?.USER);
  let nonLoggedIn = user ? "" : "protected__navbar";

  return (
    <div className={"navbar "}>
      <div className="navbar__logo">
        <div>
          <Link to="">
            {" "}
            <img src="./dcs__logo.png" />
          </Link>
        </div>
        <div className="company__description">
          <h1>Decentralized Creative Society </h1>
          <p>Your Opinion Matters</p>
        </div>
        <div className="appMode">
          <p>Admin Mode</p>
        </div>
      </div>

      {user && (
        <div className="navItems">
          <nav>
            <Link className="link" to="/castVote">
              Approve Change
            </Link>
            <Link className="link" to="/giveProposal">
              Propose Change
            </Link>

            <Link className="link" to="/acceptedProposals">
              Authorized Proposals
            </Link>
            {/* {user === null ? (
            ""
          ) : (
            <Button title={"Welcome ," + user.rollnumber} />
          )}
           */}
            <Link className="link" to="/">
              <Button
                Img={"./logout.png"}
                onClick={() =>
                  dispatch({
                    type: "SET__USER",
                    USER: null,
                  })
                }
                id="logoutButton"
                key="logoutButton"
                variant={"danger"}
              />
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}

export default AdminNavbar;
