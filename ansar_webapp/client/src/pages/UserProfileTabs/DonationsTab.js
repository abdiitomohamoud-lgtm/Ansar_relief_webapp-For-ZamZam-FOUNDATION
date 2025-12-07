import React from "react";
import { Card, CardBody } from "../../components/common";
import { useQuery } from "@tanstack/react-query";
import { fetchUserDonations } from "../../api/user";

const DonationsTab = () => {
  const { data: donations, isLoading, error } = useQuery({
    queryKey: ["userDonations"],
    queryFn: fetchUserDonations
  });

  if (isLoading) return <div>Loading donation history...</div>;
  if (error) return <div className="text-red-600">{error.message || "Failed to load donation history"}</div>;
  if (!donations || donations.length === 0) return <div>No donation history found.</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-green-700 mb-8">Donation History</h2>
      {donations.map((donation) => (
        <Card key={donation.id} className="mb-4">
          <CardBody>
            <div className="font-semibold">{donation.campaign}</div>
            <div className="text-gray-500">Amount: {donation.amount}</div>
            <div className="text-gray-400 text-xs">{donation.date}</div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default DonationsTab;
