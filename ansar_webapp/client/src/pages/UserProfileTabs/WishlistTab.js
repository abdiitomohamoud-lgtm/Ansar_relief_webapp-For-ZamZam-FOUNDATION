import React from "react";
import { Card, CardBody } from "../../components/common";
import { useQuery } from "@tanstack/react-query";
import { fetchUserWishlist } from "../../api/user";

const WishlistTab = () => {
  const { data: wishlist, isLoading, error } = useQuery({
    queryKey: ["userWishlist"],
    queryFn: fetchUserWishlist
  });

  if (isLoading) return <div>Loading wishlist...</div>;
  if (error) return <div className="text-red-600">{error.message || "Failed to load wishlist"}</div>;
  if (!wishlist || wishlist.length === 0) return <div>Your wishlist is empty.</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-green-700 mb-8">Wishlist / Saved Campaigns</h2>
      {wishlist.map((item) => (
        <Card key={item.id} className="mb-4">
          <CardBody>
            <div className="font-semibold">{item.title}</div>
            <div className="text-gray-500">{item.description}</div>
            <div className="text-gray-400 text-xs">{item.date}</div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default WishlistTab;
