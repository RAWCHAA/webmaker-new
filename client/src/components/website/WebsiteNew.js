import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import uuid from "uuid";
import axios from "axios";

export default function WebsiteNew(props) {
  const params = useParams();
  const history = useHistory();

  const [websites, setWebsites] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    getWebsites();
    // eslint-disable-next-line
  }, []);

  const getWebsites = async () => {
    const res = await axios.get(`/api/website/user/${params.uid}`);
    setWebsites(res.data);
  };

  const submit = async e => {
    e.preventDefault();
    const newWeb = {
      _id: uuid.v4(),
      name: name,
      description: description,
      developerId: params.uid
    };
    await axios.post("/api/website", newWeb);
    history.push(`/user/${params.uid}/website`);
  };
  return (
    <div>
      <nav className="navbar bg-warning fixed-top text-danger row">
        {/* left nav*/}
        <div className="col-lg-3 navbar d-none d-lg-block">
          <div className="navbar">
            <Link className="light" to={`/user/${params.uid}/website`}>
              <i className="fas fa-arrow-left text-danger" />
            </Link>
            <span className="navbar-brand h1 mb-0 ml-4">WEBSITES</span>
            <Link className="text-light" to={`/user/${params.uid}/website/new`}>
              <i className="fas fa-plus-circle text-danger" />
            </Link>
          </div>
        </div>
        {/*right nav*/}
        <div className="col-lg-9">
          <div className="navbar">
            <Link to={`/user/${params.uid}/website`}>
              <i className="fas fa-arrow-left d-lg-none text-danger" />
            </Link>
            <span className="navbar-brand h1 mb-0 ml-4">NEW WEBSITE</span>
            <button className="text-light btn" form="websiteForm">
              <i className="far fa-check-circle text-danger" />
            </button>
          </div>
        </div>
      </nav>
      {/*main content*/}
      <div className="row">
        <div className="col-3 d-none d-lg-block">
          <div className="container mt-4">
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
        <section className="col-lg-9">
          <div className="container mt-4">
            <form onSubmit={submit} id="websiteForm">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  placeholder="Enter website name..."
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="form-control"
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
            </form>
          </div>
        </section>
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
