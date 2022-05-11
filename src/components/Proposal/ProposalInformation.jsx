import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import Button from "../Button/Button";
import "./ProposalInformation.css";
import { Link, useNavigate } from "react-router-dom";
import { dispatchRedux, updateProposal } from "../../firebaseConfig";

function ProposalInformation() {
  let proposal = useSelector((state) => state.CURRENTPROPOSAL);
  let proposals = useSelector((state) => state.PROPOSALSLIST);
  let theProposalsList = [...proposals];
  let user = useSelector((state) => state.USER);
  const [options, setoptions] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

    // let index = proposals?.findIndex((obj) => obj.id === proposal.id);
    // let p = { ...proposals[index] };

    // let votedby_ = [...p.options[id - 1].votedby];
    // if (votedby_.includes(user.rollnumber) === true) {
    //   //alert("Already Voted");
    //   votedby_ = votedby_.filter((item) => item !== user.rollnumber);
    //   setVotedby(votedby_);
    //   document.getElementById("poption" + id).classList.remove("selected");

    //   //return 0;
    // }
    // console.log("votes are ", votedby_);
    // votedby_.push(user.rollnumber);
    // setVotedby(votedby_);
  }

  function DoneVoting() {
    let proposal_ = { ...proposal };
    proposal_.options = [...options];
    if (proposal_.contributers.includes(user.rollnumber) === false) {
      proposal_.contributers.push(user.rollnumber);
    }
    updateProposal(proposal_);

    dispatchRedux(dispatch);
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

        {proposal.disabled || proposal.proposedby == user.rollnumber ? (
          <p className="already__contributed">
            <p> You can not vote twice </p>
          </p>
        ) : (
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
            <p>
              <Button
                id="doneButton"
                variant={"success"}
                onClick={DoneVoting}
                title="Done"
              />
            </p>
          </p>
        )}
      </div>
    </div>
  );
}

export default ProposalInformation;
