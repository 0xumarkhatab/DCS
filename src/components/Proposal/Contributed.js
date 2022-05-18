import React, { useState } from "react";
import "./Contributed.css";
import Proposal from "./Proposal";

import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { getAcceptedProposals, getRejectedProposals ,getMyProposals} from "../Data/data";

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
  
  let myIndices = getMyProposals(user?.rollnumber, ProposalsList);

  let accepted = [],rejected=[],my=[];
  let rejectedIndices=getRejectedProposals(ProposalsList)
    let acceptedIndices=getAcceptedProposals(ProposalsList);
  for (var i = 0; i < myIndices.length; i++) {
    my.push(ProposalsList[myIndices[i]]);
  }
  for (var i = 0; i < rejectedIndices.length; i++) {
    rejected.push(ProposalsList[rejectedIndices[i]]);
  }
  for (var i = 0; i < acceptedIndices.length; i++) {
    accepted.push(ProposalsList[acceptedIndices[i]]);
  }

  my = my.sort(function (a, b) {
    return b.contributers.length - a.contributers.length;
  });

  rejected = rejected.sort(function (a, b) {
    return b.contributers.length - a.contributers.length;
  });
  accepted = accepted.sort(function (a, b) {
    return b.contributers.length - a.contributers.length;
  });
  console.log("accepted proposals to show ",accepted)

  return (
    <div className="contributed">
      {proposalsList?.length > 0 && (
        <div className="title">
          <h5> Contributed Proposals</h5>{" "}
        </div>
      )}
      {user === null ? <Navigate to="/login" /> : <p></p>}

      { ( user?.type!=="admin"&& my?.length === 0 )? (
        <div className="empty__proposals">
          {" "}
          <h5>No Contributions have been made</h5>{" "}
        </div>
      ) : (
        user?.type!=="admin" &&  <div className="contributedList">
          {  my?.map((item) => {
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

{ ( user?.type==="admin" && rejected?.length === 0 )? (
        <div className="empty__proposals">
          {" "}
          <h5>No Rejected Proposals</h5>{" "}
        </div>
      ) : (
        user?.type==="admin" &&         <div>
        <div className="proposalList__heading"><h5> Rejected Proposals</h5>{" "}</div>
        <div className="contributedList">
        {  accepted?.map((item) => {
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
      
      </div>


      )}


{ ( accepted?.length === 0 )? (
        <div className="empty__proposals">
          {" "}
          <h5>No Accepted Proposals</h5>{" "}
        </div>
      ) : (
        
        <div>
          <div className="proposalList__heading"><h5> Accepted Proposals</h5>{" "}</div>
          <div className="contributedList">
          {  accepted?.map((item) => {
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
        
        </div>

      )}
            
      

    </div>
  );
}

export default Contributed;
