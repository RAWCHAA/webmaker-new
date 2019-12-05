import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import uuid from "uuid";
import axios from "axios";

export default function Register(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [birthday, setBirthday] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");

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
      _id: uuid.v4(),
      birthday: birthday,
      username: username,
      password: password,
      firstName: "",
      lastName: "",
      email: ""
    };
    await axios.post("/api/user", newUser);
    // Navigate user into his profile
    history.push(`/user/${newUser._id}`);
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
              id="FirstName"
              placeholder="FIRST NAME"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
            <br />
            <input
              type="text"
              className="form-control"
              id="LastName"
              placeholder="LAST NAME"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
            <br />
            <input
              type="text"
              className="form-control"
              id="Birthday"
              placeholder="DATE OF BIRTH"
              value={birthday}
              onChange={e => setBirthday(e.target.value)}
            />
            <br />
            <input
              type="text"
              className="form-control"
              id="Username"
              placeholder="USERNAME"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <br />
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="EMAIL"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <br />
            <input
              type="email"
              className="form-control"
              id="email2"
              placeholder="CONFIRM EMAIL"
              value={email2}
              onChange={e => setEmail2(e.target.value)}
            />
            <br />
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="CREATE PASSWORD"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <br />
            <input
              type="password"
              className="form-control"
              id="password2"
              placeholder="CONFIRM PASSWORD"
              value={password2}
              onChange={e => setPassword2(e.target.value)}
            />
            <br />
            <input
              type="text"
              className="form-control"
              id="description"
              placeholder="ABOUT YOU"
            />
            <br />
            <input
              type="text"
              className="form-control"
              id="goals"
              placeholder="GOALS"
            />
            <br />
            <Link className="btn btn-outline-warning btn-block" to="/Login">
              COMPLETE
            </Link>
            <div>
              <br />
              <div>
                <Link className="btn btn-outline-danger btn-block" to="/Home">
                  CANCEL
                </Link>
              </div>
            </div>
            <nav className="navbar bg-warning fixed-bottom text-danger">
              <span className="h1 mb-0">WEB MAKER</span>
            </nav>
          </div>
        </form>
      </div>
    </div>
  );
}
