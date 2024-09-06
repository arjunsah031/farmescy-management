import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './inventoryadd.module.css';

const CreateInventoryForm = () => {
  const [sku, setSku] = useState('');
  const [medicineId, setMedicineId] = useState('');
  const [medicines, setMedicines] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch medicines from the medicine API
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get('/api/medicine'); // Update with your medicine API endpoint
        setMedicines(response.data);
      } catch (err) {
        setError('Error fetching medicines');
      }
    };
    fetchMedicines();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sku || !medicineId) {
      setError('Please enter a valid SKU and select a medicine.');
      return;
    }

    try {
      const response = await axios.post('/api/inventory', { sku, medicineId });
      setSuccessMessage('Inventory created successfully!');
      setError(null);
      setSku('');
      setMedicineId('');
    } catch (err) {
      setError('Error creating inventory');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Create Inventory</h1>
      {error && <p className={styles.error}>{error}</p>}
      {successMessage && <p className={styles.success}>{successMessage}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="sku">SKU</label>
          <input
            type="text"
            id="sku"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="medicine">Select Medicine</label>
          <select
            id="medicine"
            value={medicineId}
            onChange={(e) => setMedicineId(e.target.value)}
            className={styles.select}
          >
            <option value="">Select a medicine</option>
            {medicines.map((medicine) => (
              <option key={medicine.id} value={medicine.id}>
                {medicine.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className={styles.submitButton}>
          Create Inventory
        </button>
      </form>
    </div>
  );
};

export default CreateInventoryForm;
