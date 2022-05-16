import { updateDoc } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { dispatchRedux, updateProposal } from "../../firebaseConfig";
import "./Proposal.css";
import { useDispatch } from "react-redux";
import Button from "../Button/Button";
function Proposal({ onClickHandler, object, disabled }) {
  const [proposalEndingTime, setProposalEndingTime] = useState(0);
  const dispatch = useDispatch();
  let theTime;
  function getRemainingTime(date_now, date_future) {
    // get total seconds between the times
    var delta = Math.abs(date_future - date_now) / 1000;

    // calculate (and subtract) whole days
    var days = Math.floor(delta / 86400);
    delta -= days * 86400;

    // calculate (and subtract) whole hours
    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    // calculate (and subtract) whole minutes
    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    // what's left is seconds
    var seconds = delta % 60; // in theory the modulus is not required
    seconds = seconds.toFixed(0);
    var timeString =
      "\n" +
      days +
      " days " +
      hours +
      " hours " +
      minutes +
      " minutes " +
      seconds +
      " seconds\n";
    return timeString;
  }

  useEffect(() => {
    let closingTime = new Date(object.finishTime).getTime();
    let currentTime = new Date().getTime();
    let remainingTime = closingTime - currentTime;

    theTime = getRemainingTime(currentTime, closingTime);

    setProposalEndingTime(theTime);
  });

  if (
    object.status !== "accepted" &&
    object.finishTime <= new Date().getTime()
  ) {
    let p = { ...object };

    p.options = p.options.sort(function (a, b) {
      return b.votedby.length - a.votedby.length;
    });

    p.acceptedOption = p.options[0];

    p.status = "accepted";
    updateProposal(p);
    dispatchRedux(dispatch);
  }
  return (
    <div className="proposal">
      <p>
        {object.finishTime && object.finishTime > new Date().getTime() && (
          <p className="voteClose">
            Deadline <br />
            <b>{proposalEndingTime}</b>
          </p>
        )}
        <p>
          Proposal Id <b>{object.id}</b>{" "}
        </p>
        <p>
          Proposal By <b>{object.proposedby}</b>{" "}
        </p>
        <p className="proposal__status ">
          <p className={object.status}>{object.status}</p>
          {object.acceptedOption && (
            <p className="d-flex">
              <p>{object.acceptedOption?.title}</p>
              <i>is selected</i>
            </p>
          )}
        </p>
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
      <div className="proposal__options">
        {object?.options.map((option, index) => {
          if (index > 1) return "";
          else {
            return (
              <Button
                title={option.title}
                key={"voption" + option.id}
                variant={"success"}
              />
            );
          }
        })}
        <p>+more...</p>
      </div>
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
