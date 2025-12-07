import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { donateService } from '../../services/donate.service';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';

const DonateDetailPage = () => {
  const { slug } = useParams();
  const [donateItem, setDonateItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    donateService.getDonateItemBySlug(slug)
      .then(data => {
        setDonateItem(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load donation item.');
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!donateItem) return null;

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-6 text-primary">{donateItem.title}</h1>
      <img src={donateItem.image} alt={donateItem.title} className="rounded-lg shadow-lg mb-6 w-full max-h-96 object-cover" />
      <div className="prose max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: donateItem.description }} />
      <div className="mt-8 flex justify-center">
        <a href={donateItem.donateUrl} className="btn btn-primary text-lg px-8 py-3 rounded-full shadow-lg hover:bg-primary-dark transition">Donate Now</a>
      </div>
    </div>
  );
};

export default DonateDetailPage;
