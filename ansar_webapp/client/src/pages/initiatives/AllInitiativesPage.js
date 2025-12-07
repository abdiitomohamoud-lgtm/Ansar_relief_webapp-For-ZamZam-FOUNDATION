import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaChevronRight, FaSearch } from 'react-icons/fa';
import InitiativeCard from '../../components/initiatives/InitiativeCard';
import SectionHeading from '../../components/common/SectionHeading';
import { initiativesService } from '../../services/initiatives.service';

const AllInitiativesPage = () => {
  const [initiatives, setInitiatives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0
  });

  useEffect(() => {
    document.title = "All Initiatives | Ansar Organization";
    fetchInitiatives();
  }, [pagination.page]);

  const fetchInitiatives = async () => {
    try {
      setLoading(true);
      const response = await initiativesService.getInitiatives({
        page: pagination.page,
        limit: pagination.limit
      });
      setInitiatives(response.initiatives);
      setPagination(prev => ({
        ...prev,
        total: response.pagination.total,
        totalPages: response.pagination.totalPages
      }));
      setLoading(false);
    } catch (err) {
      setError('Failed to load initiatives');
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    window.scrollTo(0, 0);
  };

  if (loading) return <div className="py-32 text-center text-lg">Loading...</div>;
  if (error) return <div className="py-32 text-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white py-16 border-b">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="All Initiatives"
            subtitle="Explore our complete range of humanitarian initiatives and programs"
            tag="Our Work"
            titleColor="primary"
            tagColor="primary"
          />
        </div>
      </section>

      {/* Initiatives Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {initiatives.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {initiatives.map((initiative, index) => (
                  <motion.div
                    key={initiative._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <InitiativeCard 
                      initiative={initiative}
                      uiText={{
                        readMore: 'Read More',
                        donate: 'Donate'
                      }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="mt-12 flex justify-center gap-2">
                  {[...Array(pagination.totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handlePageChange(i + 1)}
                      className={`px-4 py-2 rounded-md ${
                        pagination.page === i + 1
                          ? 'bg-primary-600 text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <div className="text-gray-400 text-5xl mb-4">
                <FaSearch className="inline-block" />
              </div>
              <h3 className="text-xl font-bold mb-2">No initiatives found</h3>
              <p className="text-gray-600 mb-8">
                We couldn't find any initiatives at the moment. Please check back later.
              </p>
              <Link
                to="/initiatives"
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
              >
                Back to Initiatives
                <FaChevronRight className="ml-2" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AllInitiativesPage;