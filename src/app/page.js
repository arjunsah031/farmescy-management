"use client";

import React, { useState } from 'react';
import styles from './page.module.css';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Add search logic here if needed
  };

  return (
    <div className={styles.container}>
      {/* Banner Section */}
      <div className={styles.banner}>
        <h1>Welcome to PharmaStore</h1>
        <p>Your trusted pharmacy for all your healthcare needs.</p>
        <button className={styles.shopButton}>Shop Now</button>
      </div>

      {/* Search Section */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search for medicines, products, etc."
          value={searchTerm}
          onChange={handleSearch}
          className={styles.searchBar}
        />
        <button className={styles.searchButton}>Search</button>
      </div>

      {/* Featured Products Section */}
      <div className={styles.section}>
        <h2>Featured Products</h2>
        <div className={styles.productsContainer}>
          {/* Replace with dynamic products data */}
          <div className={styles.product}>
            <img src="/images/medicine3.jpg" alt="Medicine 1" />
            <p>Medicine A</p>
            <button className={styles.buyButton}>Buy Now</button>
          </div>
          <div className={styles.product}>
            <img src="/images/medicine2.jpg" alt="Medicine 2" />
            <p>Medicine B</p>
            <button className={styles.buyButton}>Buy Now</button>
          </div>
          <div className={styles.product}>
            <img src="/images/medicine3.jpg" alt="Medicine 3" />
            <p>Medicine C</p>
            <button className={styles.buyButton}>Buy Now</button>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className={styles.section}>
        <h2>Categories</h2>
        <div className={styles.categoriesContainer}>
          <div className={styles.category}>
            <img src="/images/cat-vitamins.jpg" alt="Vitamins" />
            <p>Vitamins</p>
          </div>
          <div className={styles.category}>
            <img src="/images/cat-health.jpg" alt="Health" />
            <p>Health</p>
          </div>
          <div className={styles.category}>
            <img src="/images/cat-health.jpg" alt="Supplements" />
            <p>Supplements</p>
          </div>
        </div>
      </div>

      {/* Promo Section */}
      <div className={styles.promoSection}>
        <h2>Special Offer: 20% off on all vitamins!</h2>
        <p>Hurry up, limited time only!</p>
        <button className={styles.promoButton}>Get Offer</button>
      </div>
    </div>
  );
};

export default HomePage;
