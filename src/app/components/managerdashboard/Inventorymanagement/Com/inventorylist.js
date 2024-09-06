import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './inventorylist.module.css';

const InventoryList = () => {
  const [inventories, setInventories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInventories = async () => {
      try {
        const response = await axios.get('/api/inventory');
        setInventories(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchInventories();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/inventory/${id}`);
      setInventories((prevInventories) => prevInventories.filter((item) => item.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Inventory List</h1>
      {error && <p className={styles.error}>{error}</p>}
      <ul className={styles.list}>
        {inventories.map((inventory) => (
          <li key={inventory.id} className={styles.listItem}>
            <span>SKU:</span> {inventory.sku}, 
            <span>Medicine:</span> {inventory.medicine}, 
            <span>manufacturer:</span> {inventory.manufacturer},
            <span>Created At:</span> {new Date(inventory.createdAt).toLocaleDateString()}
            <button
              className={styles.deleteButton}
              onClick={() => handleDelete(inventory.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryList;
