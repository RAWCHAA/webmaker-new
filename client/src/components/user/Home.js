import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import uuid from "uuid";
import axios from "axios";

export default function home() {
  return (
    <div>
      <div className="container mt-4">
        <nav className="navbar bg-danger fixed-top text-warning">
          <span className="h1 mb-0">WEB MAKER</span>
        </nav>
        <h3>Where you design your own website</h3>
        <button className="btn btn-outline-danger btn-block" to="/Register">
          sign-up
        </button>
        <br />
        <button className="btn btn-outline-warning btn-block" to="/login">
          sign-in
        </button>
      </div>
      <nav className="navbar bg-warning fixed-bottom text-danger">
        <span className="h1 mb-0">WEB MAKER</span>
      </nav>
    </div>
  );
}
