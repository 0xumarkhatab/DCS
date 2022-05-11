import React from "react";
import "./Button.css";

function Button({
  onClick,
  title,
  variant,
  className,
  circularTitle,
  id,
  Img,
  key,
}) {
  let props = {};
  if (id !== undefined || id !== null) {
    props.id = id;
  }
  if (key !== undefined || key !== null) {
    props.key = key;
  }

  let classname =
    variant === "success"
      ? "btn-success"
      : variant === "danger"
      ? "btn-danger"
      : "btn-primary";
  if (className !== null && className !== undefined) {
    classname = className + " " + className;
  }
  return (
    <button {...props} onClick={onClick} className={"btn " + classname}>
      <div className="title">
        <p>{title}</p>
      </div>
      {circularTitle && <div className="circularTitle">{circularTitle}</div>}
      {Img && <img className="icon" src={Img} />}
    </button>
  );
}

export default Button;
