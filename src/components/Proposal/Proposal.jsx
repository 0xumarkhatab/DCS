import React from "react";
import "./Proposal.css";

function Proposal({ onClickHandler, object, disabled }) {
  return (
    <div className="proposal">
      <p>
        <pre>
          Proposal Id <b>{object.id}</b>{" "}
        </pre>
        <pre>
          Proposal By <b>{object.proposedby}</b>{" "}
        </pre>
      </p>

      <div className="proposal__title">
        <div> {object.title}</div>

        <div className="prposal__votes">
          <div className="acceptCount">
            {" "}
            <img src="https://i.imgflip.com/42rbvt.jpg" />
            <p>{object?.contributers?.length}</p>
          </div>
        </div>
      </div>

      <p>{object?.statement?.slice(0, 70) + "...."}</p>

      <div className="buttons">
        <button
          onClick={() => {
            onClickHandler(object);
          }}
          className="success"
        >
          View Proposal
        </button>
      </div>
    </div>
  );
}

export default Proposal;
