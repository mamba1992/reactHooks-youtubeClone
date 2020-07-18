import "./Spinner.css";
import React from "react";

export default function Spinner(props) {
  return (
    <div className="ui spinner-container ">
      <div className="ui active dimmer">
        <div className="ui large text loader">{props.message}</div>
      </div>
    </div>
  );
}

Spinner.defaultProps = {
  message: "Loading...",
};
