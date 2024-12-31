import React from 'react';
import './NavBar.css';

interface NavBarProps {
  brandName: string;
  imageScrPath: string;
}

function Navbar({ brandName, imageScrPath }: NavBarProps) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-gradient fixed-top shadow-lg">
      <a className="navbar-brand d-flex align-items-center" href="#">
        <img
          src={imageScrPath}
          width="60"
          height="60"
          className="d-inline-block align-center"
          alt=""
        />
        <span className="fw-bolder fs-4 ms-3">{brandName}</span>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a className="nav-link text-light hover-link" href="#hero">Startseite</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-light hover-link" href="#info">Mehr erfahren</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-light hover-link" href="#cta">Kontakt</a>
          </li>
        </ul>
        <button className="btn btn-primary ms-3 me-4 rounded-pill hover-btn" type="button">Anmelden</button>
      </div>
    </nav>
  );
}

export default Navbar;
