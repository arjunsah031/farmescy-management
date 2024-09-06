// src/components/ManagerDashboard.js
import styles from './managerdashboard.module.css';

export default function ManagerDashboard() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Manager Dashboard</h1>
      <p className={styles.description}>
        Welcome, Manager! Here you can manage inventory, orders, and team.
      </p>
    </div>
  );
}
