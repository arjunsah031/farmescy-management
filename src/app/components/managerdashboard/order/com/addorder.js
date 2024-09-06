'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './addorder.module.css'; 

export default function AddOrder() {

    const [orderId, setOrderId] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerContact, setCustomerContact] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [createdBy, setCreatedBy] = useState('');
    const [inventoryIds, setInventoryIds] = useState([]);
    const [medicineOptions, setMedicineOptions] = useState([]);
    const [products, setProducts] = useState([{ medicineId: '', quantity: '' }]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);


    useEffect(() => {
        const fetchInventories = async () => {
            try {
                const res = await axios.get('/api/inventory'); 
                setInventoryIds(res.data.map(inv => inv.id));
                setMedicineOptions(res.data.map(inv => inv.medicine))
        
            } catch (err) {
                console.error('Failed to fetch inventories:', err);
                setError('Failed to fetch inventories');
            }
        };

        fetchInventories();
    }, []);

    const handleProductChange = (index, event) => {

        const { name, value } = event.target;
        const newProducts = [...products];
        newProducts[index][name] = value;

        setProducts(newProducts);

    };

    const handleAddProduct = () => {
        setProducts([...products, { medicineId: '', quantity: '' }]);
    };

    const handleRemoveProduct = (index) => {
        const newProducts = products.filter((_, i) => i !== index);
        setProducts(newProducts);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const res = await axios.post('/api/order', {
                orderId,
                customerName,
                customerContact,
                products, // Send as an array of objects
                totalAmount: parseFloat(totalAmount),
                createdBy,
                inventoryIds, // Already an array
            });

            setSuccess('Order added successfully!');
            setOrderId('');
            setCustomerName('');
            setCustomerContact('');
            setTotalAmount('');
            setCreatedBy('');
            setProducts([{ medicineId: '', quantity: '' }]);
            setInventoryIds([]);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Add New Order</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="orderId">Order ID</label>
                    <input
                        type="text"
                        id="orderId"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="customerName">Customer Name</label>
                    <input
                        type="text"
                        id="customerName"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="customerContact">Customer Contact</label>
                    <input
                        type="text"
                        id="customerContact"
                        value={customerContact}
                        onChange={(e) => setCustomerContact(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="totalAmount">Total Amount</label>
                    <input
                        type="number"
                        id="totalAmount"
                        step="0.01"
                        value={totalAmount}
                        onChange={(e) => setTotalAmount(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="createdBy">Created By</label>
                    <input
                        type="text"
                        id="createdBy"
                        value={createdBy}
                        onChange={(e) => setCreatedBy(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="inventoryIds">Inventory IDs</label>
                    <select
                        id="inventoryIds"
                        multiple
                        value={inventoryIds}
                        onChange={(e) => setInventoryIds(Array.from(e.target.selectedOptions, option => option.value))}
                        required
                    >
                        {inventoryIds.map(id => (
                            <option key={id} value={id}>
                                {id}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label>Products</label>
                    {products.map((product, index) => (
                        <div key={index} className={styles.productGroup}>
                            <select
                                name="medicineId"
                                value={product.medicineId}
                                onChange={(e) => handleProductChange(index, e)}
                                required
                            >
                                <option className={styles.selectmedicines} value="" disabled>Select Medicine</option>
                                {medicineOptions.map((option, index) => (
                                    <option  key={index } value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="number"
                                name="quantity"
                                value={product.quantity}
                                onChange={(e) => handleProductChange(index, e)}
                                placeholder="Quantity"
                                min="1"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveProduct(index)}
                                className={styles.removeProductButton}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddProduct}
                        className={styles.addProductButton}
                    >
                        Add Another Product
                    </button>
                </div>
                <button type="submit" disabled={loading} className={styles.submitButton}>
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
                {error && <p className={styles.error}>{error}</p>}
                {success && <p className={styles.success}>{success}</p>}
            </form>
        </div>
    );
}
