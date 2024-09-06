"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import InventoryManagement from '@/app/components/managerdashboard/Inventorymanagement/Inventorymanagement';
import Order from '@/app/components/managerdashboard/order/order';

import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import jwt from 'jsonwebtoken'

export default function ManagerDashboard() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {

    const token = localStorage.getItem('token');
    let role;

    if (token) {
        const decodedToken = jwt.decode(token);
        role = decodedToken.role; 
      }
    
    if (role !== 'manager') {
      router.push('/login'); 
    } else {
      setLoading(false); 
    }
  }, []);

  if (loading) return <p className={styles.loading}>Loading...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Store Manager Dashboard</h1>
      <div className={styles.dashboardSections}>
       
        <div className={styles.section}>
          <InventoryManagement />
        </div>

        <div className={styles.section}>
          <Order/>
        </div>

      </div>
    </div>
  );
}
