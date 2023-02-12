import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Join.css";

function SignIn() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className="signin__outer area">
      <ul className="circles">
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
      </ul>
      <div className="signin__inner">
        <h1>Join</h1>
        <div className="input-group">
          <span className="input-group-text mb-3">Name</span>
          <input
            className="form-control mb-3"
            type="text"
            placeholder="enter you name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <span className="input-group-text mb-3">Room</span>
          <input
            className="form-control mb-3"
            type="text"
            placeholder="enter room"
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>
        <Link
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={`chat?name=${name}&room=${room}`}
        >
          <button className="btn btn-light" type="submit">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
}
export default SignIn;
