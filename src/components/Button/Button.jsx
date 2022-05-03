import React from "react";
import "./Button.css";
function Button({ onClick, title, variant }) {
  console.log("variant is ", variant);
  let classname =
    variant === "success"
      ? "btn-success"
      : variant === "danger"
      ? "btn-danger"
      : "btn-primary";
  return (
    <button onClick={onClick} className={"btn " + classname}>
      {title}
    </button>
  );
}

export default Button;
