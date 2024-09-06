"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function EditMedicine({ params }) {
  const [formData, setFormData] = useState({
    name: '',
    manufacturer: '',
    price: 0,
    stock: 0,
    discount: 0,
  });
  const router = useRouter();
  const id = params.id; // Access the dynamic `id` from params

  useEffect(() => {
    async function fetchMedicine() {
      const token = localStorage.getItem("token");
      if (!id) return;

      try {
        const response = await axios.get(`/api/medicine/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching medicine:", error);
      }
    }

    fetchMedicine();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'price' || name === 'stock' || name === 'discount' ? Math.max(0, value) : value  });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.put(`/api/medicine/${id}`, formData,  {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      router.push('/manager/medicines');
    } catch (error) {
      console.error("Error updating medicine:", error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h1 className={styles.heading}>Edit Medicine</h1>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <input
          name="manufacturer"
          value={formData.manufacturer}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <input
          type="number"
          name="discount"
          value={formData.discount}
          onChange={handleChange}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Update Medicine
        </button>
      </form>
    </div>
  );
}
