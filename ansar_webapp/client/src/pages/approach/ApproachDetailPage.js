import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { approachService } from '../../services/approach.service';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';

const ApproachDetailPage = () => {
  const { slug } = useParams();
  const [approach, setApproach] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    approachService.getApproachBySlug(slug)
      .then(data => {
        setApproach(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load approach.');
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!approach) return null;

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-6 text-primary">{approach.title}</h1>
      <div className="prose max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: approach.content }} />
    </div>
  );
};

export default ApproachDetailPage;
