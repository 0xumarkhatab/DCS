import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";

function Instructions() {
  return (
    <div className="instructions">
      <Link to="/castVote">
        <Button title={"Give Your Opinion"} />
      </Link>
    </div>
  );
}

export default Instructions;
