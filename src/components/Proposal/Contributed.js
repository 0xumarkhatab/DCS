import React, { useState } from "react";
import "./Contributed.css";
import Proposal from "./Proposal";

import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { getAcceptedProposals } from "../Data/data";

function Contributed() {
  const [selected, setSelected] = useState(null);

  let proposalsList = useSelector((state) => state?.PROPOSALSLIST);
  let user = useSelector((state) => state?.USER);
  let ProposalsList;
  console.log("Cast.js , the user is ", user);
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

  let index = 0;
  let indices = getAcceptedProposals(user?.rollnumber, ProposalsList);
  let res = [];
  console.log("\nindices to include\n", indices, "\n");
  for (var i = 0; i < indices.length; i++) {
    res.push(ProposalsList[indices[i]]);
  }
  ProposalsList = [...res];
  ProposalsList = ProposalsList.sort(function (a, b) {
    return b.contributers.length - a.contributers.length;
  });

  return (
    <div className="contributed">
      {proposalsList?.length > 0 && (
        <div className="title">
          <h5> Contributed Proposals</h5>{" "}
        </div>
      )}
      {user === null && alert("Kindly Login First !")}
      {user === null ? <Navigate to="/login" /> : <p></p>}
      {ProposalsList?.length === 0 ? (
        <div className="empty__proposals">
          {" "}
          <h5>No Contributions have been made</h5>{" "}
        </div>
      ) : (
        <div className="contributedList">
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

export default Contributed;
