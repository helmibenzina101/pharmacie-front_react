import React, { useState, useEffect } from 'react';
import apiClient from '../api/axios'; // Assurez-vous que votre axios est configuré correctement

const Medecins = () => {
  const [medecins, setMedecins] = useState([]);
  const [newMedecin, setNewMedecin] = useState({
    fullName: '',
    email: '',
    specialization: ''
  });
  const [editMedecin, setEditMedecin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMedecins();
  }, []);

  // Fetch all medecins
  const fetchMedecins = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/medecin');
      setMedecins(response.data);
    } catch (err) {
      setError('Error fetching medecins');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new medecin
  const handleAddMedecin = async () => {
    try {
      await apiClient.post('/medecin', newMedecin);
      fetchMedecins();  // Refresh the list of medecins
      setNewMedecin({ fullName: '', email: '', specialization: '' });
      alert('Medecin added successfully!');
    } catch (err) {
      setError('Error adding medecin');
      console.error(err);
    }
  };

  // Update an existing medecin
  const handleUpdateMedecin = async () => {
    try {
      await apiClient.put(`/medecin/${editMedecin.id}`, editMedecin);
      fetchMedecins();  // Refresh the list of medecins
      setEditMedecin(null);
      alert('Medecin updated successfully!');
    } catch (err) {
      setError('Error updating medecin');
      console.error(err);
    }
  };

  // Delete a medecin
  const handleDeleteMedecin = async (id) => {
    try {
      await apiClient.delete(`/medecin/${id}`);
      fetchMedecins();  // Refresh the list of medecins
      alert('Medecin deleted successfully!');
    } catch (err) {
      setError('Error deleting medecin');
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Medecins</h2>

      {/* Affichage des erreurs */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Add Medecin Form */}
      <div className="mb-5">
        <h3>Add Medecin</h3>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            className="form-control"
            value={newMedecin.fullName}
            onChange={(e) => setNewMedecin({ ...newMedecin, fullName: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={newMedecin.email}
            onChange={(e) => setNewMedecin({ ...newMedecin, email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Specialization</label>
          <input
            type="text"
            className="form-control"
            value={newMedecin.specialization}
            onChange={(e) => setNewMedecin({ ...newMedecin, specialization: e.target.value })}
          />
        </div>
        <button className="btn btn-primary mt-3" onClick={handleAddMedecin}>
          Add Medecin
        </button>
      </div>

      {/* List of Medecins */}
      <h3>Existing Medecins</h3>
      <ul className="list-group">
        {medecins.map((medecin) => (
          <li key={medecin.id} className="list-group-item">
            <strong>Medecin ID:</strong> {medecin.id} <br />
            <strong>Full Name:</strong> {medecin.fullName} <br />
            <strong>Email:</strong> {medecin.email} <br />
            <strong>Specialization:</strong> {medecin.specialization}
            <div className="mt-2">
              <button
                className="btn btn-warning mr-2"
                onClick={() => setEditMedecin(medecin)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteMedecin(medecin.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Edit Medecin Form */}
      {editMedecin && (
        <div className="mt-5">
          <h3>Edit Medecin</h3>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control"
              value={editMedecin.fullName}
              onChange={(e) => setEditMedecin({ ...editMedecin, fullName: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={editMedecin.email}
              onChange={(e) => setEditMedecin({ ...editMedecin, email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Specialization</label>
            <input
              type="text"
              className="form-control"
              value={editMedecin.specialization}
              onChange={(e) => setEditMedecin({ ...editMedecin, specialization: e.target.value })}
            />
          </div>
          <button className="btn btn-primary mt-3" onClick={handleUpdateMedecin}>
            Save Changes
          </button>
          <button
            className="btn btn-secondary mt-3 ml-3"
            onClick={() => setEditMedecin(null)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Medecins;
