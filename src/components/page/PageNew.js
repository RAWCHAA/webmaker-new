import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import uuid from "uuid";

export default function PageNew(props) {
  const history = useHistory();
  const params = useParams();

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");

  const submit = e => {
    e.preventDefault();
    const newPage = {
      _id: uuid.v4(),
      name: name,
      title: title,
      websiteId: params.wid
    };

    props.addPage(newPage);
    history.push(`/user/${params.uid}/website/${params.wid}/page`);
  };

  return (
    <div>
      <nav className="navbar bg-danger fixed-top text-warning">
        <div>
          <Link
            to={`/user/${params.uid}/website/${params.wid}/page`}
            className="light"
          >
            <i className="fas fa-arrow-left text-warning" />
          </Link>
          <span className="navbar-brand h1 mb-0 ml-4">ADD PAGES</span>
        </div>
        <button className="text-light btn" form="pageForm">
          <i className="far fa-check-circle text-warning" />
        </button>
      </nav>
      <main className="container">
        <h3>ADD PAGE</h3>
        <form id="pageForm" onSubmit={submit}>
          <div className="form-group">
            <label htmlFor="Name">NAME</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter page name..."
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">TITLE</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter page title..."
              id="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
        </form>
      </main>
      <span className="navbar navbar-warning bg-light fixed-bottom">
        <span />
        <Link className="text-danger" to={`/user/${params.uid}`}>
          <i className="fas fa-user-ninja" />
        </Link>
      </span>
    </div>
  );
}
