import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/axios'; // Assuming you have an axios instance set up
import { useAuth } from './AuthContext'; // Custom hook to access auth context

const Login = () => {
  const { login } = useAuth(); // Access login function from context
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await apiClient.post('/account/login', { username: email, password });
      const { token, role } = response.data; // Ensure the response contains token and role
      console.log('Login Response:', response.data);  // Debugging log
      login(token, role); // Store token and role in context and localStorage
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials. Please check your email and password.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await apiClient.post('/account/register', {
        email,
        password,
        fullName,
        role,
      });
      alert('Registration successful! Please log in.');
      setIsRegistering(false);
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={isRegistering ? handleRegister : handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {isRegistering && (
          <>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                className="form-control"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Role</label>
              <select
                className="form-control"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="user">User</option>
                <option value="master">Master</option>
              </select>
            </div>
          </>
        )}
        <button type="submit" className="btn btn-primary mt-3">
          {isRegistering ? 'Register' : 'Login'}
        </button>
      </form>
      <div className="mt-3">
        {isRegistering ? (
          <p>
            Already have an account?{' '}
            <span className="text-primary" style={{ cursor: 'pointer' }} onClick={() => setIsRegistering(false)}>
              Login here.
            </span>
          </p>
        ) : (
          <p>
            Don't have an account?{' '}
            <span className="text-primary" style={{ cursor: 'pointer' }} onClick={() => setIsRegistering(true)}>
              Register here.
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
