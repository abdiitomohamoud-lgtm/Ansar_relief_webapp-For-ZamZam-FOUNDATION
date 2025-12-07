import React from "react";
import { Card, CardBody } from "../../components/common";
import { useQuery } from "@tanstack/react-query";
import { fetchUserCart } from "../../api/user";

const CartTab = () => {
  const { data: cart, isLoading, error } = useQuery({
    queryKey: ["userCart"],
    queryFn: fetchUserCart
  });

  if (isLoading) return <div>Loading cart...</div>;
  if (error) return <div className="text-red-600">{error.message || "Failed to load cart"}</div>;
  const items = Array.isArray(cart?.cartItems) ? cart.cartItems : [];
  if (!cart || items.length === 0) return <div>Your cart is empty.</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-green-700 mb-8">My Cart</h2>
      {items.map((item) => (
        <Card key={item.itemId || item.id} className="mb-4">
          <CardBody>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="sm:w-24 sm:h-24 flex-shrink-0">
                <img
                  src={item.image && item.image !== '' ? item.image : '/images/placeholder.jpg'}
                  alt={item.name || item.title}
                  className="w-full h-full object-cover rounded"
                  onError={e => {
                    if (e.target.src.indexOf('placeholder.jpg') === -1) {
                      e.target.src = '/images/placeholder.jpg';
                    } else {
                      e.target.onerror = null;
                    }
                  }}
                />
              </div>
              <div className="flex-grow flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800">{item.name || item.title}</h3>
                  <span className="text-primary-600 font-bold">${(item.amount || item.cardAmount || 0) * (item.quantity || 1)}</span>
                </div>
                <div className="text-gray-500 mb-1">{item.description || item.cardDescription}</div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>Quantity: {item.quantity || 1}</span>
                  <span>Type: {item.type || 'General'}</span>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default CartTab;
