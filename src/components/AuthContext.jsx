import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the AuthContext to hold the authentication state
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(localStorage.getItem('role') || ''); // Default to empty if not set
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token')); // Check for token

  useEffect(() => {
    // Logs role and token in localStorage for debugging
    console.log('Role in AuthProvider:', localStorage.getItem('role'));
    console.log('Token in AuthProvider:', localStorage.getItem('token'));
  }, []);

  const login = (token, role) => {
    localStorage.setItem('token', token);  // Store token in localStorage
    localStorage.setItem('role', role);    // Store role in localStorage
    setUserRole(role);                     // Update state
    setIsAuthenticated(true);              // Set authenticated state to true
    console.log('Role saved in localStorage:', role);  // Debugging log
  };

  const logout = () => {
    localStorage.removeItem('token');  // Remove token from localStorage
    localStorage.removeItem('role');   // Remove role from localStorage
    setUserRole('');                   // Reset state
    setIsAuthenticated(false);         // Set authenticated state to false
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use authentication state
export const useAuth = () => useContext(AuthContext);
