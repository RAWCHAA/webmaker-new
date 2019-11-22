import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";

export default function WebsiteEdit(props) {
  const params = useParams();
  const history = useHistory();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [websites, setWebsites] = useState([]);

  useEffect(() => {
    // Initialize left websites list
    setWebsites(props.getWebsites(params.uid));
    // Initialize right website form
    const website = props.getWebsite(params.wid);
    setName(website.name);
    setDescription(website.description);
  }, [params.uid, props, params.wid]);

  const remove = () => {
    props.removeWebsite(params.wid);
    history.push(`/user/${params.uid}/website`);
  };

  const update = e => {
    e.preventDefault();
    const newWeb = {
      _id: params.wid,
      name: name,
      description: description,
      developerId: params.uid
    };
    props.updateWebsite(newWeb);
    history.push(`/user/${params.uid}/website`);
  };

  return (
    <div>
      <nav className="navbar bg-warning fixed-top text-danger row">
        {/* left nav*/}
        <div className="col-lg-3 navbar d-none d-lg-block">
          <div className="navbar">
            <div>
              <Link className="light" to={`/user/${params.uid}/website`}>
                {" "}
                <i className="fas fa-arrow-left text-danger" />
              </Link>
              <span className="navbar-brand h1 mb-0 ml-4">WEBSITES</span>
            </div>
            <Link to={`/user/${params.uid}/website/new`}>
              <i className="fas fa-plus-circle text-danger" />
            </Link>
          </div>
        </div>
        {/*right nav*/}
        <div className="col-lg-9 navbar">
          <div>
            <Link
              className="text-warning d-lg-none "
              to={`/user/${params.uid}/website`}
            >
              <i className="fas fa-arrow-left d-lg-none text-danger" />
            </Link>
            <span className="navbar-brand h1 mb-0 ml-4">EDIT WEBSITE</span>
          </div>
          <button className="text-light btn" form="websiteForm">
            <i className="far fa-check-circle text-danger" />
          </button>
        </div>
      </nav>
      <div className="row mt-4">
        <div className="col-3 d-none d-lg-block">
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
        </div>
        <div className="col-9">
          <form id="websiteForm" onSubmit={update}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="Enter website name..."
                id="name"
                className="form-control"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                placeholder="Enter website description..."
                rows={5}
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
            <button
              type="button"
              onClick={remove}
              className="btn btn-danger btn-block"
            >
              Delete
            </button>
          </form>
        </div>
      </div>
      <nav className="navbar bg-danger fixed-bottom">
        <span />
        <Link className="text-warning" to={`/user/${params.uid}`}>
          <i className="fas fa-user-ninja" />
        </Link>
      </nav>
    </div>
  );
}
