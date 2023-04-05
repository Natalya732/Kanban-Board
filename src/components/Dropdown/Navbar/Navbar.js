import React from "react";
import "./Navbar.scss";
export default function Navbar(props) {
  return (
    <div className={`navbar ${props.colorTheme}`}>
      <div className="nav-left">
        <h1>Kanban Board</h1>
        <div className="nav-links">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#"> More</a>
          </li>
        </div>
      </div>
      <div className="theme-container">
        <div
          id="theme-white"
          onClick={() => props.handleClick("theme-white")}
          className={`${props.colorTheme === "theme-white" ? "active" : ""}`}
        />
        <div
          id="theme-green"
          onClick={() => props.handleClick("theme-green")}
          className={`${props.colorTheme === "theme-green" ? "active" : ""}`}
        />
        <div
          id="theme-orange"
          onClick={() => props.handleClick("theme-orange")}
          className={`${props.colorTheme === "theme-orange" ? "active" : ""}`}
        />
        <div
          id="theme-purple"
          onClick={() => props.handleClick("theme-purple")}
          className={`${props.colorTheme === "theme-purple" ? "active" : ""}`}
        />
        <div
          id="theme-blue"
          onClick={() => props.handleClick("theme-blue")}
          className={`${props.colorTheme === "theme-blue" ? "active" : ""}`}
        />
        <div
          id="theme-dark"
          onClick={() => props.handleClick("theme-dark")}
          className={`${props.colorTheme === "theme-dark" ? "active" : ""}`}
        />
      </div>
    </div>
  );
}
