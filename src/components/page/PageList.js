import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function PageList(props) {
  const params = useParams();

  const [pages, setPages] = useState([]);

  useEffect(() => {
    setPages(props.getPages(params.wid));
  }, [params.wid, props]);

  return (
    <div>
      <nav className="navbar bg-danger fixed-top text-warning">
        <div>
          <Link Link to={`/user/${params.uid}/website`}>
            <i className="fas fa-arrow-left text-warning" />
          </Link>
          <span className="navbar-brand h1 mb-0 h1 ml-4">PAGES</span>
        </div>
        <Link to={`/user/${params.uid}/website/${params.wid}/page/new`}>
          <i className="fas fa-plus-circle text-warning" />
        </Link>
      </nav>
      <main className="container mt-4">
        <ul className="list-group list-group-flush">
          {pages.map(page => (
            <li className="list-group-item" key={page._id}>
              <Link
                to={`/user/${params.uid}/website/${params.wid}/page/${page._id}/widget`}
              >
                {page.name}
              </Link>
              <Link
                to={`/user/${params.uid}/website/${params.wid}/page/${page._id}`}
                className="float-right"
              >
                <i className="fas fa-wrench" />
              </Link>
            </li>
          ))}
        </ul>
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
