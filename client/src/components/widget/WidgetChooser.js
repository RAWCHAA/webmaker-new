import React from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import uuid from "uuid";
import axios from "axios";

export default function WidgetChooser(props) {
  const params = useParams();
  const history = useHistory();

  const create = async type => {
    // Create new widget variable
    const newWidget = {
      _id: uuid.v4(),
      widgetType: type,
      pageId: params.pid
    };
    // Add new widget into widgets array
    await axios.post("/api/widget", newWidget);
    // Navigate to widget edit page
    history.push(
      `/user/${params.uid}/website/${params.wid}/page/${params.pid}/widget/${newWidget._id}`
    );
  };

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
          <span className="navbar-brand h1 mb-0 ml-4">CHOOSE WIDGET</span>
        </div>
      </nav>
      <main className="container">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <button onClick={create.bind(this, "HEADING")} className="btn">
              Header
            </button>
          </li>
          <li className="list-group-item">
            <Link href="!#">LABEL</Link>
          </li>
          <li className="list-group-item">
            <Link href="!#">HTML</Link>
          </li>
          <li className="list-group-item">
            <Link href="!#">TEXT INPUT</Link>
          </li>
          <li className="list-group-item">
            <Link href="!#">LINK</Link>
          </li>
          <li className="list-group-item">
            <Link href="!#">BUTTON</Link>
          </li>
          <li className="list-group-item">
            <button className="btn" onClick={create.bind(this, "IMAGE")}>
              Image
            </button>
          </li>
          <li className="list-group-item">
            <button className="btn" onClick={create.bind(this, "YOUTUBE")}>
              YouTube
            </button>
          </li>
          <li className="list-group-item">
            <Link href="!#">DATA TABLE</Link>
          </li>
          <li className="list-group-item">
            <Link href="!#">REPEATER</Link>
          </li>
        </ul>
      </main>
      <footer className="navbar bg-warning fixed-bottom">
        <span />
        <Link className="text-danger" to={`/user/${params.uid}`}>
          >
          <i className="fas fa-user-ninja" />
        </Link>
      </footer>
    </div>
  );
}
