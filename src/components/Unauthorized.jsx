import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h1>Access Denied</h1>
      <p>You do not have permission to access this page.</p>
      <button
        className="btn btn-primary mt-3"
        onClick={() => navigate('/')}
      >
        Go to Login
      </button>
    </div>
  );
};

export default Unauthorized;
