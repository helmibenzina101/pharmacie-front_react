import React, { useState, useEffect } from 'react';
import apiClient from '../api/axios';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({ fullName: '', address: '' });
  const [editPatient, setEditPatient] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await apiClient.get('/patient');
      setPatients(response.data);
    } catch (err) {
      console.error('Error fetching patients:', err);
    }
  };

  const handleAddPatient = async () => {
    try {
      await apiClient.post('/patient', newPatient);
      fetchPatients();
      setNewPatient({ fullName: '', address: '' });
      alert('Patient added successfully!');
    } catch (err) {
      console.error('Error adding patient:', err);
    }
  };

  const handleUpdatePatient = async () => {
    try {
      await apiClient.put(`/patient/${editPatient.id}`, editPatient);
      fetchPatients();
      setEditPatient(null);
      alert('Patient updated successfully!');
    } catch (err) {
      console.error('Error updating patient:', err);
    }
  };

  const handleDeletePatient = async (id) => {
    try {
      await apiClient.delete(`/patient/${id}`);
      fetchPatients();
      alert('Patient deleted successfully!');
    } catch (err) {
      console.error('Error deleting patient:', err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Patients</h2>

      {/* Add Patient */}
      <div className="mb-5">
        <h3>Add Patient</h3>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            className="form-control"
            value={newPatient.fullName}
            onChange={(e) => setNewPatient({ ...newPatient, fullName: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            className="form-control"
            value={newPatient.address}
            onChange={(e) => setNewPatient({ ...newPatient, address: e.target.value })}
          />
        </div>
        <button className="btn btn-primary mt-3" onClick={handleAddPatient}>
          Add Patient
        </button>
      </div>

      {/* List Patients */}
      <h3>Existing Patients</h3>
      <ul className="list-group">
        {patients.map((patient) => (
          <li key={patient.id} className="list-group-item">
            <strong>{patient.fullName}</strong> - {patient.address}
            <div className="mt-2">
              <button
                className="btn btn-warning mr-2"
                onClick={() => setEditPatient(patient)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDeletePatient(patient.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Edit Patient */}
      {editPatient && (
        <div className="mt-5">
          <h3>Edit Patient</h3>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control"
              value={editPatient.fullName}
              onChange={(e) => setEditPatient({ ...editPatient, fullName: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              className="form-control"
              value={editPatient.address}
              onChange={(e) => setEditPatient({ ...editPatient, address: e.target.value })}
            />
          </div>
          <button className="btn btn-primary mt-3" onClick={handleUpdatePatient}>
            Save Changes
          </button>
          <button
            className="btn btn-secondary mt-3 ml-3"
            onClick={() => setEditPatient(null)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Patients;
