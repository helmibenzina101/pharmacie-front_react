import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem('token'); // Supprime le token pour déconnexion
    window.location.href = '/';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">Pharmacie</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/patients">Patients</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/medications">Medications</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/pharmacists">Pharmacists</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/medecins">Medecins</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/prescriptions">Prescriptions</Link>
            </li>

            <li className="nav-item">
              <button className="btn btn-danger nav-link" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
