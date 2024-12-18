import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token'); // Vérification d'authentification
  const { userRole } = useAuth(); // Récupération du rôle depuis le contexte

  console.log('Token in RoleProtectedRoute:', token);
  console.log('User role in RoleProtectedRoute:', userRole);

  if (!token) {
    // Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(userRole)) {
    // Redirige vers la page non autorisée si le rôle est incorrect
    return <Navigate to="/unauthorized" />;
  }

  // Affiche les enfants si tout est correct
  return children;
};

export default RoleProtectedRoute;
