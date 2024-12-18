import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  document.title = 'Gestion de Pharmacie';
  // Déconnexion de l'utilisateur
  const handleLogout = () => {
    localStorage.removeItem('token'); // Supprimer le token du stockage local
    navigate('/'); // Rediriger vers la page de connexion
  };

  return (
    <div className="container mt-5">
      <h2>Welcome to the Dashboard!</h2>
      <p>Here you can manage your prescriptions, medications, and patients.</p>
      <button className="btn btn-danger" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
