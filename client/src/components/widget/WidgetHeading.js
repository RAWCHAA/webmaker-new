import React from "react";
import { Link, useParams } from "react-router-dom";

export default function WidgetHeading(props) {
  const params = useParams();
  return (
    <div>
      <nav className="navbar bg-danger fixed-top text-warning">
        <div>
          <Link
            to={`/user/${params.uid}/website/${params.wid}/page/${params.pid}/widget`}
            className="light"
          >
            <i className="fas fa-arrow-left text-warning" />
          </Link>
          <span className="navbar-brand h1 mb-0 ml-4">EDIT WIDGET</span>
        </div>
        <button className="text-dark btn" form="widgetForm">
          <i className="far fa-check-circle text-warning" />
        </button>
      </nav>
      <main className="container">
        <form id="widgetForm" onSubmit={props.update}>
          <div className="form-group">
            <label htmlFor="Name">NAME</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Widget Name..."
              id="name"
              name="name"
              value={props.widget.name ? props.widget.name : ""}
              onChange={props.onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="text">Text</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Widget Text"
              id="text"
              name="text"
              value={props.widget.text ? props.widget.text : ""}
              onChange={props.onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="size">Size</label>
            <input
              type="range"
              min={1}
              max={60}
              className="form-control"
              id="size"
              name="size"
              value={props.widget.size ? props.widget.size : "1"}
              onChange={props.onChange}
            />
          </div>
          <button
            type="button"
            onClick={props.remove}
            className="btn btn-danger btn-block"
          >
            Delete
          </button>
        </form>
      </main>
      <footer className="navbar bg-warning fixed-bottom text-danger">
        <span />
        <Link to={`/user/${params.uid}`}>
          <i className="fas fa-user-ninja" />
        </Link>
      </footer>
    </div>
  );
}
