import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand text-primary">Attendance System</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Employee Details</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Register New Employee</Link>
          </li>
          <li className="navbar-item">
          <Link to="/qrgenerator" className="nav-link">QR Register</Link>
          </li>
          <li className="navbar-item">
          <Link to="/qrscanner" className="nav-link">Mark Attendance</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}