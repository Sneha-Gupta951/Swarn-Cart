/**
 * Global Constants
 * 
 * Note: Core data (PRODUCTS and FEATURES) has been migrated to the Node.js backend 
 * to allow for dynamic updates and database integration.
 * Please use the respective API endpoints to fetch this data in components.
 */

export const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5001/api' 
  : 'https://swarn-cart.onrender.com/api';
