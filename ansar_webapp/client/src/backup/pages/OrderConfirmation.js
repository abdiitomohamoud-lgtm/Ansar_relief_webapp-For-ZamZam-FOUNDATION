import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const OrderConfirmation = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <FaCheckCircle className="mx-auto text-green-500 text-6xl" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
        <p className="text-gray-600 mb-8">
          Your order has been successfully placed. We will send you an email confirmation with your order details shortly.
        </p>
        
        <div className="space-y-4">
          <Link
            to="/campaigns"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
          <br />
          <Link
            to="/profile"
            className="inline-block text-blue-600 hover:text-blue-800"
          >
            View Order History
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation; 