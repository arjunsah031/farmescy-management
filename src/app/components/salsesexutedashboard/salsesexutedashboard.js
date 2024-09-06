// src/components/SalesExecutiveDashboard.js
import styles from './salsesexutedashboard.module.css';

export default function SalesExecutiveDashboard() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sales Executive Dashboard</h1>
      <p className={styles.description}>
        Welcome, Sales Executive! Here you can manage orders and view sales data.
      </p>
    </div>
  );
}
