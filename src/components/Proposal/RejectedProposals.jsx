import React, { useState } from "react";
import "./RejectedProposals.css";
import Proposal from "./Proposal";

import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { getRejectedProposals } from "../Data/data";

function RejectedProposals() {
  const [selected, setSelected] = useState(null);

  let proposalsList = useSelector((state) => state?.PROPOSALSLIST);
  let user = useSelector((state) => state?.USER);
  let ProposalsList;
  if (proposalsList) ProposalsList = [...proposalsList];

  let navigate = useNavigate();
  const dispatch = useDispatch();

  function clickHandler(obj) {
    obj.disabled = true;
    dispatch({
      type: "SET__CURRENTPROPOSAL",
      CURRENTPROPOSAL: obj,
    });
    navigate("/proposalInformation");
    setSelected(true);
  }

  console.log("total Proposals Are ", ProposalsList);
  console.log(
    "\nRejection Result for 19L-2765 is",
    getRejectedProposals(user?.rollnumber, ProposalsList)
  );

  let index = 0;
  let indices = getRejectedProposals(user?.rollnumber, ProposalsList);
  let res = [];
  for (var i = 0; i < indices.length; i++) {
    res.push(ProposalsList[indices[i]]);
  }
  ProposalsList = [...res];

  return (
    <div className="rejectedProposals">
      {user === null && alert("Kindly Login First !")}
      {user === null ? <Navigate to="/login" /> : <p></p>}
      {ProposalsList?.length === 0 ? (
        <div className="empty__proposals">
          <h5>No Rejected Proposals</h5>{" "}
        </div>
      ) : (
        <div className="rejectedProposalsList">
          {ProposalsList?.map((item) => {
            return (
              <Proposal
                onClickHandler={clickHandler}
                key={"pid" + item.id}
                object={item}
                disabled
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default RejectedProposals;
