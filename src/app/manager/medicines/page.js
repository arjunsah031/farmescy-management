"use client"
// pages/medicines/index.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import styles from './page.module.css'

export default function Medicines() {
  const [medicines, setMedicines] = useState([]);


  useEffect(() => {
    async function fetchMedicines() {
      const response = await axios.get('/api/medicine');
      setMedicines(response.data);
    }
    fetchMedicines();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    
    if (confirm('Are you sure you want to delete this medicine?',)) {
      await axios.delete(`/api/medicine/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setMedicines(medicines.filter((medicine) => medicine.id !== id));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Medicines</h1>
        <Link href="/manager/medicines/addmedicines">
          <button className={styles.button}>Add Medicine</button>
        </Link>
      </div>
      <ul className={styles.medicineList}>
        {medicines.map((medicine) => (
          <li key={medicine.id}>
            <div className={styles.medicineInfo}>
              {medicine.name} - {medicine.manufacturer}
            </div>
            <div className={styles.medicineActions}>
              <Link href={`/manager/medicines/editmedicine/${medicine.id}`}>
                <button>Edit</button>
              </Link>
              <button onClick={() => handleDelete(medicine.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
