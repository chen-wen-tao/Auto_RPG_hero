import React, { Component } from "react";
import "../style/root.css";
import { useNavigate } from "react-router-dom";

export default function Root() {
  const navigate = useNavigate();
  const onClickLogin = () => {
    navigate('/login', { replace: true });
  }

  return (
      <>
        <div className="center">
          <center><h1>Auto RPG</h1></center>
          <div>
            <button onClick={onClickLogin}>Start</button>
          </div>
        </div>
      </>
    );
}