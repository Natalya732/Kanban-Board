import React from "react";
import { X } from "react-feather";

import "./Chip.css";

export default function Chip(props) {
  return (
    <div className="chip" style={{ backgroundColor: props.color }}>
      {props.text}
      {/* {props.close && (
        <X onClick={() => (props.onClose ? props.onClose() : " ")} />
      )} */}
      <X onClick={() => (props.onClose ? props.onClose() : " ")} />
    </div>
  );
}
//<X onClick={props.onClose ? props.close() : " "}/>
