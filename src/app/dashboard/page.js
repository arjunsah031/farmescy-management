"use client";
// src/dashboard.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import jwt from "jsonwebtoken";

import ManagerDashboard from '../components/managerdashboard/managerdashbord';
import SalesExecutiveDashboard from '../components/salsesexutedashboard/salsesexutedashboard';

export default function Dashboard() {
  const [role, setRole] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
   
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const decoded = jwt.decode(token);
      setRole(decoded.role);
    } catch (error) {
      console.error('Invalid token:', error);
      router.push('/login');
    }
  }, [router]);

  if (!role) return <div>Loading...</div>; // Show a loading state while checking the role

  const renderDashboard = () => {
    switch (role) {
      case 'manager':
        return <ManagerDashboard />;
      case 'executive':
        return <SalesExecutiveDashboard />;
      default:
        return <div>Access Denied</div>;
    }
  };

  return (
    <div>
      {renderDashboard()}
    </div>
  );
}
