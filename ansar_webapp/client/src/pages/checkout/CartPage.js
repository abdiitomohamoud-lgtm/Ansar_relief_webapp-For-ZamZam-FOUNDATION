import React from 'react';

const CartPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Shopping Cart
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Review and manage your items
          </p>
        </div>

        <div className="mt-12">
          <div className="bg-white shadow rounded-lg p-6">
            {/* Cart Items */}
            <div className="space-y-4">
              {/* Sample Cart Item */}
              <div className="flex items-center justify-between py-4 border-b">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-md"></div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Item Name</h3>
                    <p className="text-sm text-gray-500">Item Description</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-gray-900">$99.99</div>
                  <button className="text-red-600 hover:text-red-800">
                    Remove
                  </button>
                </div>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="mt-6 border-t pt-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>$99.99</p>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <p>Shipping</p>
                <p>Free</p>
              </div>
              <div className="flex justify-between text-lg font-medium text-gray-900 mt-4">
                <p>Total</p>
                <p>$99.99</p>
              </div>
              <div className="mt-6">
                <button
                  type="button"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage; 