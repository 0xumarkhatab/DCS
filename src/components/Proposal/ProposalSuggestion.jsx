import React, { useState } from "react";
import "./ProposalSuggestion.css";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { updateProposal } from "../../firebaseConfig";
import AddProposalOption from "./AddProposalOption";

function ProposalSuggestion() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [options, setOptions] = useState([]);
  let ProposalsList = useSelector((state) => state?.PROPOSALSLIST);
  let theProposalsList = [];
  console.log("options in Suggestion are", options);
  if (ProposalsList) theProposalsList = [...ProposalsList];

  let user = useSelector((state) => state?.USER);
  // user = {
  //   rollnumber: "19L-2765",
  //   email: "l192765@lhr.nu.edu.pk",
  // };

  if (user === undefined || user === null) {
    alert("kindly login first");
    navigate("/login");
  }

  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  function deleteOption(id) {
    let options_ = [...options];
    options_ = options_.filter((item) => item.id !== id);
    setOptions(options_);
  }
  async function proposalHandler(e) {
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
      status: "pending",
      statement: description,
      id: ProposalsList ? ProposalsList.length + 1 : 1,
      contributers: [user.rollnumber],
      options: options,
    };
    document.getElementById("proposal__validation").innerHTML =
      "Proposal is added in pending queue\nWait for the Admin's Approval.";

    document.getElementById("title").value = null;
    document.getElementById("description").value = null;

    theProposalsList.push(proposalObj);
    updateProposal(proposalObj);
    dispatch({
      type: "SET__PROPOSALSLIST",
      PROPOSALSLIST: theProposalsList,
    });

    setTimeout(() => {
      navigate("/castVote");
    }, 2000);
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
        <div className="proposalOptionsAdd">
          <p>
            If Your Proposal Contains Many Response Types e.g Time Schedules ,
            You can Add Options to respond
          </p>
          <AddProposalOption options={options} setOptions={setOptions} />
        </div>

        <div className="proposalOptionsList">
          {options.length > 0
            ? options.map((item) => {
                return (
                  <div className="proposalOption">
                    <Button
                      key={"option__" + item.id}
                      title={item.title}
                      variant="success"
                      onClick={console.log(item.title + " is votes\n\n")}
                    />
                    <Button
                      key={"delete__" + item.id}
                      title={"Delete"}
                      variant="danger"
                      onClick={() => deleteOption(item.id)}
                    />
                  </div>
                );
              })
            : ""}
        </div>

        <div className="proposal__suggestion-btn">
          {/* <Link to="/castVote"> */}
          <Button
            onClick={(e) => {
              proposalHandler(e);
            }}
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
