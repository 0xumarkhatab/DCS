import React, { useState } from "react";
import "./ProposalSuggestion.css";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

function ProposalSuggestion() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let ProposalsList = useSelector((state) => state.PROPOSALSLIST);
  let theProposalsList = [...ProposalsList];

  let user = useSelector((state) => state?.USER);

  if (user === undefined || user === null) {
    alert("kindly login first");
    navigate("/login");
  }

  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);

  function proposalHandler(e) {
    console.log("handling Propose");
    if (title === null || description === null) {
      document.getElementById("proposal__validation").innerHTML =
        "Kindly Fill the fields Correctly";
      return;
    }

    let acceptedUsers = [];
    acceptedUsers.push(user);

    let proposalObj = {
      proposedby: user.rollnumber,
      title: title,
      statement: description,
      id: ProposalsList.length + 1,
      acceptedBy: acceptedUsers,
      rejectedBy: [],
    };

    document.getElementById("title").value = null;
    document.getElementById("description").value = null;

    theProposalsList.push(proposalObj);

    dispatch({
      type: "SET__PROPOSALSLIST",
      PROPOSALSLIST: theProposalsList,
    });

    navigate("/castVote");
  }

  return (
    <div className="proposal__suggestion__wrapper">
      {user === null ? <Navigate to="/login" /> : <p></p>}

      <div className="proposal__suggestion">
        <div className="proposal__suggestion__heading">
          <h1>Propose The Change</h1>
        </div>
        <div className="validation" id="proposal__validation"></div>
        <div>
          <label htmlFor="title">Title</label>
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            id="title"
            type={"text"}
            placeholder="e.g Proposing CS-12 as the  Venue for Farewell Party"
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            id="description"
            type={"text"}
            placeholder="e.g Proposing CS-12 as the  Venue for Farewell Party"
          />
        </div>

        <div className="proposal__suggestion-btn">
          {/* <Link to="/castVote"> */}
          <Button
            onClick={proposalHandler}
            variant="success"
            title={"Propose"}
          ></Button>
          {/* </Link>
           */}

          <p>
            You can View it in <b>Accepted Proposals</b> section
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProposalSuggestion;
