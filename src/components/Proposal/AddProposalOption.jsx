import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../Button/Button";
import "./AddProposalOption.css";

function AddProposalOption({ options, setOptions }) {
  const [show, setShow] = useState(false);
  let user = useSelector((state) => state?.USER);
  console.log("user is ", user);
  const [option, setOption] = useState("");
  console.log("option is ", option);
  let options_ = [...options];
  function addToList() {
    options_.sort((a, b) => {
      return a.id > b.id ? a : b;
    });
    options_.push({
      title: option,
      id: options.length + 1,
      votedby: [],
    });
    setOptions(options_);
    setShow(false);
  }
  function addItemHandler() {}
  return (
    <div className="add__proposal__option">
      <div className="add__proposal__option__button">
        <Button
          onClick={() => {
            setShow((prev) => !prev);
          }}
          title={"ADD Option"}
          variant={"primary"}
        />
      </div>
      <div className={show === true ? "add__proposal__option__form" : "hidden"}>
        <input
          onChange={(e) => {
            setOption(e.target.value);
          }}
          id="option__text"
          placeholder="e.g 4:00 PM"
          type="text"
        />
        <Button onClick={addToList} title={"ADD"} variant={"success"} />
      </div>
    </div>
  );
}

export default AddProposalOption;
