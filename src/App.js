import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Patients from './components/Patients';
import Medications from './components/Medications';
import Prescriptions from './components/Prescriptions';
import Pharmacists from './components/Pharmacists';
import Medecins from './components/Medecins';
import ProtectedRoute from './components/ProtectedRoute';
import Unauthorized from './components/Unauthorized';
import RoleProtectedRoute from './components/RoleProtectedRoute';
import newLogo from './public/logo512.png';

const App = () => {
  useEffect(() => {
    document.title = "Gestion de pharmacie";
  }, []);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/pharmacists" element={<ProtectedRoute><Pharmacists /></ProtectedRoute>} />
          <Route path="/medecins" element={<ProtectedRoute><Medecins /></ProtectedRoute>} />
          <Route path="/patients" element={<ProtectedRoute><Patients /></ProtectedRoute>} />
          <Route path="/medications" element={<ProtectedRoute><Medications /></ProtectedRoute>} />
          <Route path="/prescriptions" element={<RoleProtectedRoute allowedRoles={['master']}><Prescriptions /></RoleProtectedRoute>} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
