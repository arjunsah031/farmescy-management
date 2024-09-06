'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css'; // Import the CSS module

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const token = localStorage.getItem('token');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.token);
       // Refresh the page
     
      window.location.href = '/'

    } else {
      alert(data.error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Username:
          <input
            className={styles.input}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label className={styles.label}>
          Password:
          <input
          className={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className={styles.button} type="submit">Login</button>
      </form>
    </div>
  );
}
