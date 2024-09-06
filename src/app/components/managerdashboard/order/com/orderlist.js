'use client';

import { useState, useEffect } from 'react';
import styles from './orderlist.module.css'; // Ensure this path is correct

export default function OrderList() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch('/api/order'); // Ensure this matches your API endpoint
                if (!res.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const data = await res.json();
                setOrders(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleDelete = async (orderId) => {
        try {
            const res = await fetch(`/api/order/${orderId}`, {
                method: 'DELETE',
            });
            if (!res.ok) {
                throw new Error('Failed to delete order');
            }
            setOrders((prevOrders) => prevOrders.filter(order => order.id !== orderId));
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Orders</h1>
            {orders.length === 0 ? (
                <p>No orders found</p>
            ) : (
                <ul className={styles.orderList}>
                    {orders.map(order => (
                        <li key={order.id} className={styles.orderItem}>
                            <h2 className={styles.orderId}>Order ID: {order.orderId}</h2>
                            <p>Customer: {order.customerName} ({order.customerContact})</p>
                            <p>Total Amount: ${order.totalAmount.toFixed(2)}</p>
                            <p>Created By: {order.createdBy}</p>
                            <p>Created At: {new Date(order.createdAt).toLocaleDateString()}</p>
                            <p>Updated At: {new Date(order.updatedAt).toLocaleDateString()}</p>

                            <h3>Products:</h3>
                            <ul>
                                {order.products.map((product, index) => (
                                    <li key={index}>
                                        Medicine ID: {product.medicineId}, Quantity: {product.quantity}
                                    </li>
                                ))}
                            </ul>

                            <h3>Inventories:</h3>
                            <ul>
                                {order.inventories.map(inventory => (
                                    <li key={inventory.id} className={styles.inventoryItem}>
                                        <p>SKU: {inventory.sku}</p>
                                        {inventory.medicine && (
                                            <div>
                                                <p>Medicine Name: {inventory.medicine.name}</p>
                                                <p>Manufacturer: {inventory.medicine.manufacturer}</p>
                                            </div>
                                        )}
                                        <p>Created At: {new Date(inventory.createdAt).toLocaleDateString()}</p>
                                        <p>Updated At: {new Date(inventory.updatedAt).toLocaleDateString()}</p>
                                    </li>
                                ))}
                            </ul>

                            <button
                                className={styles.deleteButton}
                                onClick={() => handleDelete(order.id)}
                            >
                                Delete Order
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
