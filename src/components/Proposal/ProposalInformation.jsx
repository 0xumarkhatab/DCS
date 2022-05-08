import React from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import Button from "../Button/Button";
import "./ProposalInformation.css";
import { Link, useNavigate } from "react-router-dom";
import { updateProposal } from "../../firebaseConfig";

function ProposalInformation() {
  let proposal = useSelector((state) => state.CURRENTPROPOSAL);
  let proposals = useSelector((state) => state.PROPOSALSLIST);
  let theProposalsList = [...proposals];
  let user = useSelector((state) => state.USER);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function IncreaseAcceptance(id) {
    let index = proposals.findIndex((obj) => obj.id === id);
    let p = { ...proposals[index] };
    p.acceptedBy.push(user);
    theProposalsList[p.id - 1] = { ...p };
    console.log("new proposal is ", p);
    updateProposal(p);

    dispatch({
      type: "SET__PROPOSALSLIST",
      PROPOSALSLIST: [...theProposalsList],
    });

    navigate("/castVote");
  }
  function IncreaseRejection(id) {
    console.log("Decreasing acceptance");
    let index = proposals.findIndex((obj) => obj.id === id);
    let p = { ...proposals[index] };
    p.rejectedBy.push(user);
    theProposalsList[index] = p;
    console.log("new proposals are \n", proposals);
    updateProposal(p);

    dispatch({
      type: "SET__PROPOSALSLIST",
      PROPOSALSLIST: theProposalsList,
    });

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
          <p className="proposal__buttons">
            <Link to={"/castVote"}>
              <Button
                disabled={proposal.disabled === true ? "true" : "false"}
                onClick={() => {
                  IncreaseAcceptance(proposal.id);
                }}
                title={"Accept"}
                variant="success"
              />
            </Link>

            <Link to={"/castVote"}>
              <Button
                onClick={() => {
                  IncreaseRejection(proposal.id);
                }}
                title={"Reject"}
                variant="danger"
              />
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

export default ProposalInformation;
