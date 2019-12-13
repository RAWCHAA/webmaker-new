import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

export default function Register(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const history = useHistory();

  const register = async e => {
    e.preventDefault();
    // Check if passwords are match
    if (password !== password2) {
      alert("The passwords you entered don't match, please try it again");
      return;
    }
    // Check if username is taken
    const res = await axios.get(`/api/user?username=${username}`);
    if (res.data) {
      alert("Username is taken, please try another one");
      return;
    }
    // Add new user into users
    const newUser = {
      username: username,
      password: password,
      firstName: "",
      lastName: "",
      email: ""
    };
    const res2 = await axios.post("/api/user", newUser);
    // Navigate user into his profile
    history.push(`/user/${res2.data._id}`);
  };
  return (
    <div>
      <nav className="navbar bg-danger fixed-top text-warning">
        <span className="h1 mb-0">WEB MAKER</span>
      </nav>
      <div className="container">
        <h3>SIGN-UP</h3>
        <form onSubmit={register}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Verify Password"
              value={password2}
              onChange={e => setPassword2(e.target.value)}
            />
          </div>
          <br />
          <Link className="btn btn-outline-warning btn-block" to="/Login">
            COMPLETE
          </Link>
          <div>
            <Link className="btn btn-outline-danger btn-block" to="/Home">
              CANCEL
            </Link>
          </div>
          <nav className="navbar bg-warning fixed-bottom text-danger">
            <span className="h1 mb-0">WEB MAKER</span>
          </nav>
        </form>
      </div>
    </div>
  );
}
