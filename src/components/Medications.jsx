import React, { useState, useEffect } from 'react';
import apiClient from '../api/axios';

const Medications = () => {
  const [medications, setMedications] = useState([]);
  const [newMedication, setNewMedication] = useState({ name: '', stockQuantity: '' });
  const [editMedication, setEditMedication] = useState(null);

  useEffect(() => {
    fetchMedications();
  }, []);

  const fetchMedications = async () => {
    try {
      const response = await apiClient.get('/medication');
      setMedications(response.data);
    } catch (err) {
      console.error('Error fetching medications:', err);
    }
  };

  const handleAddMedication = async () => {
    try {
      await apiClient.post('/medication', newMedication);
      fetchMedications();
      setNewMedication({ name: '', stockQuantity: '' });
      alert('Medication added successfully!');
    } catch (err) {
      console.error('Error adding medication:', err);
    }
  };

  const handleUpdateMedication = async () => {
    try {
      await apiClient.put(`/medication/${editMedication.id}`, editMedication);
      fetchMedications();
      setEditMedication(null);
      alert('Medication updated successfully!');
    } catch (err) {
      console.error('Error updating medication:', err);
    }
  };

  const handleDeleteMedication = async (id) => {
    try {
      await apiClient.delete(`/medication/${id}`);
      fetchMedications();
      alert('Medication deleted successfully!');
    } catch (err) {
      console.error('Error deleting medication:', err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Medications</h2>

      {/* Add Medication */}
      <div className="mb-5">
        <h3>Add Medication</h3>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={newMedication.name}
            onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Stock Quantity</label>
          <input
            type="number"
            className="form-control"
            value={newMedication.stockQuantity}
            onChange={(e) =>
              setNewMedication({ ...newMedication, stockQuantity: e.target.value })
            }
          />
        </div>
        <button className="btn btn-primary mt-3" onClick={handleAddMedication}>
          Add Medication
        </button>
      </div>

      {/* List Medications */}
      <h3>Existing Medications</h3>
      <ul className="list-group">
        {medications.map((med) => (
          <li key={med.id} className="list-group-item">
            <strong>{med.name}</strong> - Stock: {med.stockQuantity}
            <div className="mt-2">
              <button
                className="btn btn-warning mr-2"
                onClick={() => setEditMedication(med)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteMedication(med.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Edit Medication */}
      {editMedication && (
        <div className="mt-5">
          <h3>Edit Medication</h3>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              value={editMedication.name}
              onChange={(e) =>
                setEditMedication({ ...editMedication, name: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Stock Quantity</label>
            <input
              type="number"
              className="form-control"
              value={editMedication.stockQuantity}
              onChange={(e) =>
                setEditMedication({ ...editMedication, stockQuantity: e.target.value })
              }
            />
          </div>
          <button className="btn btn-primary mt-3" onClick={handleUpdateMedication}>
            Save Changes
          </button>
          <button
            className="btn btn-secondary mt-3 ml-3"
            onClick={() => setEditMedication(null)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Medications;
