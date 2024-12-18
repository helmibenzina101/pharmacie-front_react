import React, { useState, useEffect } from 'react';
import apiClient from '../api/axios';  // Votre instance d'axios configurée avec le baseURL et les en-têtes JWT

const Pharmacists = () => {
  const [pharmacists, setPharmacists] = useState([]);
  const [newPharmacist, setNewPharmacist] = useState({
    fullName: '',
    pharmacyName: '',
    email: '',
  });
  const [editPharmacist, setEditPharmacist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPharmacists();
  }, []);

  // Récupérer tous les pharmaciens
  const fetchPharmacists = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/pharmacist');
      setPharmacists(response.data);
    } catch (err) {
      setError('Error fetching pharmacists');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Ajouter un nouveau pharmacien
  const handleAddPharmacist = async () => {
    try {
      await apiClient.post('/pharmacist', newPharmacist);
      fetchPharmacists();  // Rafraîchir la liste des pharmaciens
      setNewPharmacist({ fullName: '', pharmacyName: '', email: '' });
      alert('Pharmacist added successfully!');
    } catch (err) {
      setError('Error adding pharmacist');
      console.error(err);
    }
  };

  // Mettre à jour un pharmacien existant
  const handleUpdatePharmacist = async () => {
    try {
      await apiClient.put(`/pharmacist/${editPharmacist.id}`, editPharmacist);
      fetchPharmacists();  // Rafraîchir la liste des pharmaciens
      setEditPharmacist(null);
      alert('Pharmacist updated successfully!');
    } catch (err) {
      setError('Error updating pharmacist');
      console.error(err);
    }
  };

  // Supprimer un pharmacien
  const handleDeletePharmacist = async (id) => {
    try {
      await apiClient.delete(`/pharmacist/${id}`);
      fetchPharmacists();  // Rafraîchir la liste des pharmaciens
      alert('Pharmacist deleted successfully!');
    } catch (err) {
      setError('Error deleting pharmacist');
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Pharmacists</h2>
      
      {/* Affichage des erreurs */}
      {error && <div className="alert alert-danger">{error}</div>}
      
      {/* Formulaire d'ajout de pharmacien */}
      <div className="mb-5">
        <h3>Add Pharmacist</h3>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            className="form-control"
            value={newPharmacist.fullName}
            onChange={(e) => setNewPharmacist({ ...newPharmacist, fullName: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Pharmacy Name</label>
          <input
            type="text"
            className="form-control"
            value={newPharmacist.pharmacyName}
            onChange={(e) => setNewPharmacist({ ...newPharmacist, pharmacyName: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={newPharmacist.email}
            onChange={(e) => setNewPharmacist({ ...newPharmacist, email: e.target.value })}
          />
        </div>
        <button className="btn btn-primary mt-3" onClick={handleAddPharmacist}>
          Add Pharmacist
        </button>
      </div>

      {/* Liste des pharmaciens */}
      <h3>Existing Pharmacists</h3>
      <ul className="list-group">
        {pharmacists.map((pharmacist) => (
          <li key={pharmacist.id} className="list-group-item">
            <strong>Pharmacist ID:</strong> {pharmacist.id} <br />
            <strong>Full Name:</strong> {pharmacist.fullName} <br />
            <strong>Pharmacy Name:</strong> {pharmacist.pharmacyName} <br />
            <strong>Email:</strong> {pharmacist.email}
            <div className="mt-2">
              <button
                className="btn btn-warning mr-2"
                onClick={() => setEditPharmacist(pharmacist)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDeletePharmacist(pharmacist.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Formulaire de mise à jour de pharmacien */}
      {editPharmacist && (
        <div className="mt-5">
          <h3>Edit Pharmacist</h3>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control"
              value={editPharmacist.fullName}
              onChange={(e) => setEditPharmacist({ ...editPharmacist, fullName: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Pharmacy Name</label>
            <input
              type="text"
              className="form-control"
              value={editPharmacist.pharmacyName}
              onChange={(e) => setEditPharmacist({ ...editPharmacist, pharmacyName: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={editPharmacist.email}
              onChange={(e) => setEditPharmacist({ ...editPharmacist, email: e.target.value })}
            />
          </div>
          <button className="btn btn-primary mt-3" onClick={handleUpdatePharmacist}>
            Save Changes
          </button>
          <button
            className="btn btn-secondary mt-3 ml-3"
            onClick={() => setEditPharmacist(null)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Pharmacists;
