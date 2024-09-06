"use client"
// src/components/Navbar.js
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';

import styles from './navbar.module.css'; // Import CSS module

export default function Navbar() {
  const [role, setRole] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwt.decode(token);
        setRole(decoded.role);
      } catch (error) {
        router.push('/login');
      }
    }
  }, [router]);

  return (
    <nav className={styles.nav}>
       <div>FARMASCY STORE</div>
      <ul className={styles.ul}>
        <li className={styles.li}><Link href="/">Home</Link></li>
        {role === 'manager' && (
          <>
            <li className={styles.li}><Link href="/manager/dashboard">Dashboard</Link></li>
            <li className={styles.li}><Link href="/manager/medicines">Medicines</Link></li>
          </>
        )}
        {role === 'executive' && (
          <>
            <li className={styles.li}><Link href="/dashboard">Dashboard</Link></li>
            <li className={styles.li}><Link href="/api/orders">Orders</Link></li>
          </>
        )}
        {!role && (
          <li className={styles.li}><Link href="/login">Login</Link></li>
        )}
        {role && (
          <li className={styles.li}>
            <a href="#" onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/login'
            
            }}>Logout</a>
          </li>
        )}
      </ul>

     
    </nav>
  );
}
