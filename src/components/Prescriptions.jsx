import React, { useState, useEffect } from 'react';
import apiClient from '../api/axios';

const Prescription = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [patients, setPatients] = useState([]);
  const [medecins, setMedecins] = useState([]);
  const [pharmacists, setPharmacists] = useState([]);
  const [medications, setMedications] = useState([]);
  const [newPrescription, setNewPrescription] = useState({
    patientId: '',
    medecinId: '',
    pharmacistId: '',
    dateIssued: '',
    medications: [],
    patient: { fullName: '', address: '' },
    medecin: { fullName: '', email: '', specialization: '' },
    pharmacist: { fullName: '', email: '', pharmacyName: '' },
  });
  const [editingPrescription, setEditingPrescription] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPrescriptions();
    fetchPatients();
    fetchMedecins();
    fetchPharmacists();
    fetchMedications();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const response = await apiClient.get('/prescription');
      setPrescriptions(response.data);
    } catch (err) {
      setError('Échec de la récupération des prescriptions');
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await apiClient.get('/patient');
      setPatients(response.data);
    } catch (err) {
      setError('Échec de la récupération des patients');
    }
  };

  const fetchMedecins = async () => {
    try {
      const response = await apiClient.get('/medecin');
      setMedecins(response.data);
    } catch (err) {
      setError('Échec de la récupération des médecins');
    }
  };

  const fetchPharmacists = async () => {
    try {
      const response = await apiClient.get('/pharmacist');
      setPharmacists(response.data);
    } catch (err) {
      setError('Échec de la récupération des pharmaciens');
    }
  };

  const fetchMedications = async () => {
    try {
      const response = await apiClient.get('/medication');
      setMedications(response.data);
    } catch (err) {
      setError('Échec de la récupération des médicaments');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updateState = editingPrescription ? setEditingPrescription : setNewPrescription;
    updateState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMedicationChange = (e) => {
    const selectedMedications = Array.from(e.target.selectedOptions, (option) => option.value);
    const updateState = editingPrescription ? setEditingPrescription : setNewPrescription;
    updateState((prev) => ({
      ...prev,
      medications: selectedMedications,
    }));
  };

  const handleAddPrescription = async () => {
    const prescription = editingPrescription ? editingPrescription : newPrescription;
    
    if (!prescription.patientId || !prescription.medecinId || !prescription.pharmacistId || !prescription.dateIssued) {
      setError('Tous les champs doivent être remplis');
      return;
    }

    const prescriptionData = {
      id: prescription.id || 0,
      patientId: prescription.patientId,
      medecinId: prescription.medecinId,
      pharmacistId: prescription.pharmacistId,
      dateIssued: prescription.dateIssued,
      medications: prescription.medications,
      patient: { 
        id: prescription.patientId, 
        fullName: prescription.patient?.fullName || '', 
        address: prescription.patient?.address || '' 
      },
      medecin: { 
        id: prescription.medecinId, 
        fullName: prescription.medecin?.fullName || '', 
        email: prescription.medecin?.email || '', 
        specialization: prescription.medecin?.specialization || '' 
      },
      pharmacist: { 
        id: prescription.pharmacistId, 
        fullName: prescription.pharmacist?.fullName || '', 
        email: prescription.pharmacist?.email || '', 
        pharmacyName: prescription.pharmacist?.pharmacyName || '' 
      }
    };

    try {
      if (editingPrescription) {
        // If editing, use PUT request
        await apiClient.put(`/prescription/${prescriptionData.id}`, prescriptionData);
        alert('Prescription mise à jour avec succès !');
      } else {
        // If adding new, use POST request
        await apiClient.post('/prescription', prescriptionData);
        alert('Prescription ajoutée avec succès !');
      }
      
      // Reset states and refetch prescriptions
      fetchPrescriptions();
      setEditingPrescription(null);
      setNewPrescription({
        patientId: '',
        medecinId: '',
        pharmacistId: '',
        dateIssued: '',
        medications: [],
        patient: { fullName: '', address: '' },
        medecin: { fullName: '', email: '', specialization: '' },
        pharmacist: { fullName: '', email: '', pharmacyName: '' },
      });
    } catch (err) {
      setError(editingPrescription 
        ? 'Échec de la mise à jour de la prescription' 
        : 'Échec de l\'ajout de la prescription'
      );
    }
  };

  const handleEditPrescription = (prescription) => {
    // Prepare the prescription for editing
    setEditingPrescription({
      ...prescription,
      dateIssued: new Date(prescription.dateIssued).toISOString().slice(0, 16), // Format for datetime-local
    });
  };

  const handleCancelEdit = () => {
    setEditingPrescription(null);
  };

  const handleDeletePrescription = async (id) => {
    try {
      await apiClient.delete(`/prescription/${id}`);
      fetchPrescriptions();
      alert('Prescription supprimée avec succès !');
    } catch (err) {
      setError('Échec de la suppression de la prescription');
    }
  };

  return (
    <div className="container">
      <h2>Prescriptions</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <h3>{editingPrescription ? 'Modifier une Prescription' : 'Ajouter une Prescription'}</h3>
      <div className="form-group">
        <label>Patient</label>
        <select
          name="patientId"
          className="form-control"
          value={editingPrescription ? editingPrescription.patientId : newPrescription.patientId}
          onChange={handleInputChange}
        >
          <option value="">Sélectionner un patient</option>
          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.fullName}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Medecin</label>
        <select
          name="medecinId"
          className="form-control"
          value={editingPrescription ? editingPrescription.medecinId : newPrescription.medecinId}
          onChange={handleInputChange}
        >
          <option value="">Sélectionner un médecin</option>
          {medecins.map((medecin) => (
            <option key={medecin.id} value={medecin.id}>
              {medecin.fullName}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Pharmacien</label>
        <select
          name="pharmacistId"
          className="form-control"
          value={editingPrescription ? editingPrescription.pharmacistId : newPrescription.pharmacistId}
          onChange={handleInputChange}
        >
          <option value="">Sélectionner un pharmacien</option>
          {pharmacists.map((pharmacist) => (
            <option key={pharmacist.id} value={pharmacist.id}>
              {pharmacist.fullName}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Medications</label>
        <select
          multiple
          name="medications"
          className="form-control"
          value={editingPrescription ? editingPrescription.medications : newPrescription.medications}
          onChange={handleMedicationChange}
        >
          {medications.map((medication) => (
            <option key={medication.id} value={medication.id}>
              {medication.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Date Issued</label>
        <input
          type="datetime-local"
          name="dateIssued"
          className="form-control"
          value={editingPrescription ? editingPrescription.dateIssued : newPrescription.dateIssued}
          onChange={handleInputChange}
        />
      </div>

      <div className="btn-group">
        <button onClick={handleAddPrescription} className="btn btn-primary">
          {editingPrescription ? 'Mettre à jour' : 'Ajouter Prescription'}
        </button>
        {editingPrescription && (
          <button onClick={handleCancelEdit} className="btn btn-secondary">
            Annuler
          </button>
        )}
      </div>

      <h3>Liste des Prescriptions</h3>
      <ul className="list-group">
        {prescriptions.map((prescription) => (
          <li key={prescription.id} className="list-group-item">
            <p><strong>Patient:</strong> {prescription.patient?.fullName || 'N/A'}</p>
            <p><strong>Medecin:</strong> {prescription.medecin?.fullName || 'N/A'}</p>
            <p><strong>Pharmacien:</strong> {prescription.pharmacist?.fullName || 'N/A'}</p>
            <p><strong>Medications:</strong> {prescription.medications.map((medId) => {
              const med = medications.find((m) => m.id === medId);
              return med ? med.name : `ID ${medId}`;
            }).join(', ') || 'N/A'}</p>
            <p><strong>Date:</strong> {new Date(prescription.dateIssued).toLocaleString()}</p>
            <div className="btn-group">
              <button
                onClick={() => handleEditPrescription(prescription)}
                className="btn btn-warning"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDeletePrescription(prescription.id)}
                className="btn btn-danger"
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Prescription;