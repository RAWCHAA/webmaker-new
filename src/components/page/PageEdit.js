import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

export default function PageEdit(props) {
  const history = useHistory();
  const params = useParams();

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    const page = props.getPage(params.pid);
    setName(page.name);
    setTitle(page.title);
  }, [props, params.pid]);

  const remove = () => {
    props.removePage(params.pid);
    history.push(`/user/${params.uid}/website/${params.wid}/page`);
  };

  const update = e => {
    e.preventDefault();
    const newPage = {
      _id: params.pid,
      name: name,
      title: title,
      websiteId: params.wid
    };
    props.updatePage(newPage);
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
          <span className="navbar-brand h1 mb-0 ml-4">EDIT PAGE</span>
        </div>
        <button className="text-dark btn" form="pageForm">
          <i className="far fa-check-circle text-warning" />
        </button>
      </nav>
      <main className="container">
        <form id="pageForm" onSubmit={update}>
          <h3>EDIT PAGE</h3>
          <div className="form-group">
            <label htmlFor="Name">NAME</label>
            <input
              type="text"
              id="name"
              className="form-control"
              placeholder="Enter page name..."
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">TITLE</label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Enter page title..."
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <button
            className="btn btn-block btn-danger"
            type="button"
            onClick={remove}
          >
            DELETE
          </button>
        </form>
      </main>
      <footer className="navbar bg-warning fixed-bottom">
        <span />
        <Link className="text-danger" to={`/user/${params.uid}`}>
          <i className="fas fa-user-ninja" />
        </Link>
      </footer>
    </div>
  );
}
