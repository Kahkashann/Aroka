// src/components/Orders.jsx
import { Link } from 'react-router-dom';
import React from 'react';

const Orders = () => {
  return (
    <div className="space-y-6">
      <div className="text-gray-090 font-thin py-8">
          <p className="mb-4">You have not placed any orders yet.</p>
          <Link to="/shop-all">
          <button className="text-black border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors duration-200">
              Start Shopping
          </button>
          </Link>
      </div>
    </div>
  );
};

export default Orders;