import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import axios from "axios";

export default function Profile(props) {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const params = useParams();

  const getUser = async () => {
    const res = await axios.get(`/api/user/${params.uid}`);
    const user = res.data;
    setUsername(user.username);
    setEmail(user.email);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setPassword(user.password);
  };

  useEffect(() => {
    getUser();
    //eslint-disable-next-line
  }, []);

  const update = async () => {
    const newUser = {
      _id: params.uid,
      username: username,
      password: password,
      email: email,
      firstName: firstName,
      lastName: lastName
    };

    // update user in users
    await axios.put("/api/user", newUser);

    alert("user info is updated!");
  };

  const logout = () => {
    delete axios.defaults.headers.common["x-auth-token"];
    localStorage.removeItem("token");
    history.push("/");
  };

  return (
    <div>
      <nav className="navbar bg-warning fixed-top text-danger">
        <span className="navbar-brand h1 mb-0">PROFILE</span>
        <span className="click" onClick={update}>
          <i className="far fa-check-circle text-danger" />
        </span>
      </nav>
      <div className="container">
        <form>
          <img
            src="data:image/png;base64,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"
            alt="Avatar"
            className="avatar"
          />
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Create Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="FirstName">First Name</label>
            <input
              type="text"
              className="form-control"
              id="FirstName"
              placeholder="Enter First Name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="LastName">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="LastName"
              placeholder="Enter Last Name"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </div>
        </form>
        <Link
          to={`/user/${params.uid}/website`}
          className="btn btn-outline-danger btn-block"
        >
          WEBSITES
        </Link>
        <button
          className="btn btn-outline-warning btn btn-block"
          onClick={logout}
        >
          LOG OUT
        </button>
      </div>
      <nav className="navbar bg-danger fixed-bottom">
        <span />
        <Link className="text-warning" to="/user/:uid">
          <i className="fas fa-user-ninja" />
        </Link>
      </nav>
    </div>
  );
}
