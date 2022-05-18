import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import Button from "../Button/Button";
import "./ProposalInformation.css";
import { Link, useNavigate } from "react-router-dom";
import { updateProposal } from "../../firebaseConfig";

function ProposalInformation() {
  let proposal = useSelector((state) => state.CURRENTPROPOSAL);
  let proposals = useSelector((state) => state.PROPOSALSLIST);
  const [loading, setLoading] = useState(false);
  const [options, setoptions] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let theProposalsList = [...proposals];
  let user = useSelector((state) => state.USER);
  useEffect(() => {
    setoptions(proposal.options);
  }, []);

  function increaseOptionAcceptance(id) {
    console.log("option number ", id);
    let currentOption = { ...options[id - 1] };
    let votedby = [...currentOption.votedby];

    if (votedby.includes(user.rollnumber) === true) {
      document.getElementById("poption" + id).classList.remove("selected");
      document.getElementById("poption" + id).classList.add("btn-success");
      votedby = votedby.filter((item) => item !== user.rollnumber);
      //return 0;
    } else {
      votedby.push(user.rollnumber);

      console.log("not already voted\n");
      document.getElementById("poption" + id).classList.remove("btn-success");
      document.getElementById("poption" + id).classList.add("selected");
    }

    currentOption.votedby = [...votedby];
    let updatedOptions = [...options];
    updatedOptions[id - 1] = { ...currentOption };
    console.log("\nvoted by ", votedby);

    setoptions(updatedOptions);
  }

  function approve() {
    let theProposal = { ...proposal };
    theProposal.status = "listed";
    var finishTime = new Date(new Date());
    finishTime.setDate(finishTime.getDate() + 3);
    theProposal.finishTime = finishTime.getTime();
    ShowChanges(theProposal);
  }
  function reject() {
    let theProposal = { ...proposal };
    theProposal.status = "rejected";
    ShowChanges(theProposal);
  }

  function DoneVoting() {
    let proposal_ = { ...proposal };
    proposal_.options = [...options];
    if (proposal_.contributers.includes(user.rollnumber) === false) {
      proposal_.contributers.push(user.rollnumber);
    }
    ShowChanges(proposal_);
  }

  async function ShowChanges(proposal_) {
    await updateProposal(proposal_);
    navigate("/castVote");
  }

  return (
    <div className="proposalInformation">
      <div className="proposal__heading">
        <div>Proposal Information</div>
        <div className="styledHR">
          <hr />
        </div>
      </div>
      <div className="proposal__description">
        <p>
          <h5>Title</h5>
          <p>{proposal.title}</p>
        </p>

        <p>
          <h5>Proposal ID</h5>
          <p>{proposal.id}</p>
        </p>
        <p className="description">
          <h5>Description</h5>
          <p>{proposal.statement}</p>
        </p>
        {proposal.status !== "accepted" && (
          <p className="proposal__options">
            <h5 className="proposal__options__header">Voting Options</h5>
            <p className="proposal__options__list">
              {options?.map((item) => {
                return (
                  <Button
                    title={item.title}
                    id={"poption" + item.id}
                    key={"poption" + item.id}
                    className={
                      item.votedby.includes(user.rollnumber) === true
                        ? `selected`
                        : ``
                    }
                    circularTitle={item.votedby.length}
                    variant={"success"}
                    onClick={() => increaseOptionAcceptance(item.id)}
                  />
                );
              })}
            </p>
            <div className="voteButton">
              <Button
                id="voteButton"
                key={"voteButton"}
                variant={"success"}
                onClick={() => {
                  setLoading(true);
                  DoneVoting();
                }}
                title={
                  loading === false
                    ? "Save Vote Selection"
                    : "Saving .. Please wait"
                }
              />
            </div>
          </p>
        )}

        {user.type == "admin" && (
          <p className="proposal__options">
            <Button
              title={"Approve"}
              variant={"success"}
              key="approveButton"
              id="approvedButton"
              onClick={approve}
            />
            <Button
              title={"Reject"}
              variant={"danger"}
              key="rejectButton"
              id="rejectButton"
              onClick={reject}
            />
          </p>
        )}

        {user.type != "admin" &&
          proposal.proposedby !== user?.rollnumber &&
          proposal.status === "accepted" && (
            <div className="accepted__message">
              <h6> Proposal is No Longer Accepting the Responses</h6>
            </div>
          )}
      </div>
    </div>
  );
}

export default ProposalInformation;
