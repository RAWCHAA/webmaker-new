import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function WebsiteList(props) {
  const params = useParams();

  const [websites, setWebsites] = useState([]);

  useEffect(() => {
    setWebsites(props.getWebsites(params.uid));
  }, [params.uid, props]);

  return (
    <div>
      <nav className="navbar bg-danger fixed-top text-warning">
        <div>
          <Link className="text-light" to={`/user/${params.uid}`}>
            <i className="fas fa-chevron-left" />
          </Link>
          <span className="navbar-brand mb-0 h1 ml-4">Websites</span>
        </div>
        <Link className="text-light" to={`/user/${params.uid}/website/new`}>
          <i className="fas fa-plus" />
        </Link>
      </nav>
      <div className="container">
        <ul className="list-group list-group-flush">
          {websites.map(website => (
            <li key={website._id} className="list-group-item">
              <Link
                to={`/user/${website.developerId}/website/${website._id}/page`}
              >
                {website.name}
              </Link>
              <Link
                className="float-right"
                to={`/user/${website.developerId}/website/${website._id}`}
              >
                <i className="fas fa-wrench" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <nav className="navbar bg-warning fixed-bottom">
        <span />
        <Link className="text-danger" to={`/user/${params.uid}`}>
          <i className="fas fa-user-ninja" />
        </Link>
      </nav>
    </div>
  );
}
