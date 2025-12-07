import React from 'react';
import { useDonation } from '../../contexts/DonationContext';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { patterns } from '../../assets/images/patterns/index';
import { motion } from 'framer-motion';
import { FaHandHoldingHeart, FaWater, FaUtensils, FaMosque, FaGraduationCap, FaHome, FaUserFriends, FaHandshake, FaRegCalendarCheck, FaPaw, FaGlobeAfrica, FaQuestionCircle, FaRegCommentDots } from 'react-icons/fa';

// Example card data (replace with real API/data)
const categoryData = {
  general: {
    title: 'General Sadaqah',
    description: 'Make a general donation to support our various humanitarian projects.',
    image: '/images/sadaqah/general-sadaqah.jpg',
    icon: <FaHandHoldingHeart className="text-5xl text-primary-600" />,
    color: 'bg-blue-500',
    impact: 'Your donation will help us provide essential support to communities in need.',
    suggestedAmounts: [10, 25, 50, 100, 250]
  },
  water: {
    title: 'Water Sadaqah',
    description: 'Help provide clean water to communities in need.',
    image: '/images/sadaqah/water-sadaqah.jpg',
    icon: <FaWater className="text-5xl text-cyan-500" />,
    color: 'bg-cyan-500',
    impact: 'Your donation will help provide clean water access to communities.',
    suggestedAmounts: [20, 50, 100, 200, 500]
  },
  food: {
    title: 'Food Sadaqah',
    description: 'Support food security programs and provide meals to those in need.',
    image: '/images/sadaqah/food-sadaqah.jpg',
    icon: <FaUtensils className="text-5xl text-orange-500" />,
    color: 'bg-orange-500',
    impact: 'Your donation will help provide food to families in need.',
    suggestedAmounts: [15, 30, 60, 120, 300]
  },
  mosque: {
    title: 'Mosque Sadaqah',
    description: 'Contribute to the construction and maintenance of mosques.',
    image: '/images/sadaqah/mosque-sadaqah.jpg',
    icon: <FaMosque className="text-5xl text-green-500" />,
    color: 'bg-green-500',
    impact: 'Your donation will help maintain and improve mosque facilities.',
    suggestedAmounts: [50, 100, 200, 500, 1000]
  },
  // ...add other categories as needed
};

function getBaseCategory(id) {
  if (!id) return 'general';
  const match = id.match(/^(general|water|food|mosque|education|housing|orphans|community|immediate|periodic|kafarat|aqiqah|specific)/);
  return match ? match[1] : 'general';
}

const SadaqahCategoryDetail = () => {
  const { openQuickDonateWithUrgentNeed } = useDonation();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const { id } = useParams();
  const location = useLocation();
  // Prefer card data passed via router state
  let cardData = location.state && location.state.cardData ? location.state.cardData : null;
  const baseCategory = getBaseCategory(id);
  // If not passed, fallback to lookup by ID
  if (!cardData) {
    if (window.sadaqahOptions) {
      const optionsArr = window.sadaqahOptions[baseCategory] || [];
      cardData = optionsArr.find(opt => opt.id === id);
    }
    if (!cardData) {
      try {
        const localOptions = JSON.parse(localStorage.getItem('sadaqahOptions'));
        if (localOptions && localOptions[baseCategory]) {
          cardData = localOptions[baseCategory].find(opt => opt.id === id);
        }
      } catch (e) {}
    }
  }
  // Fallback: fetch from backend if still not found
  const [fetchedCard, setFetchedCard] = React.useState(null);
  React.useEffect(() => {
    if (!cardData && id) {
      setLoading(true);
      fetch(`/api/sadaqah/card/${id}`)
        .then(res => {
          if (!res.ok) throw new Error('Card not found');
          return res.json();
        })
        .then(data => {
          setFetchedCard(data);
          setError(null);
        })
        .catch(err => {
          setError(err.message);
        })
        .finally(() => setLoading(false));
    }
  }, [cardData, id]);
  if (!cardData && fetchedCard) cardData = fetchedCard;
  // Debug log
  React.useEffect(() => {
    console.log('SadaqahCategoryDetail: id', id);
    console.log('SadaqahCategoryDetail: cardData', cardData);
  }, [id, cardData]);
  let category = categoryData[baseCategory] || categoryData.general;
  let notFound = false;
  if (cardData) {
    category = {
      ...category,
      ...cardData,
      title: cardData.title || category.title || 'Sadaqah',
      icon: cardData.iconName ? React.createElement(
        (require('react-icons/fa')[cardData.iconName] || require('react-icons/fa').FaHandHoldingHeart),
        { className: 'text-5xl text-primary-600' }
      ) : category.icon
    };
  } else if (!categoryData[baseCategory] && !cardData) {
    notFound = true;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-primary-600 font-medium">Loading Sadaqah card data...</p>
        </div>
      </div>
    );
  }
  if (error || notFound) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-primary-50">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-primary-700 mb-4">Sadaqah Category Not Found</h1>
          <p className="text-gray-700 mb-6">{error || 'The requested Sadaqah category does not exist or is unavailable.'}</p>
          <Link to="/sadaqah" className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            <FaArrowLeft className="mr-2" /> Back to Sadaqah
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 pt-20 pb-12 relative overflow-hidden">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <nav className="flex items-center gap-2 mb-4 text-sm" aria-label="Breadcrumb">
          <button type="button" className="text-primary-600 hover:underline font-semibold bg-transparent border-none p-0 cursor-pointer" onClick={() => navigate('/')}>Home</button>
          <span className="text-primary-400">/</span>
          <button type="button" className="text-primary-600 hover:underline font-semibold bg-transparent border-none p-0 cursor-pointer" onClick={() => navigate('/sadaqah')}>Sadaqah</button>
          <span className="text-primary-400">/</span>
          <span className="text-primary-700 font-bold">{category.title}</span>
        </nav>
      </div>
      {/* Decorative Patterns */}
      <div className="absolute inset-0 pattern-overlay opacity-5" style={{ backgroundImage: `url(${patterns.geometric})` }}></div>
      <div className="absolute top-0 left-0 w-64 h-64 -translate-x-1/2 -translate-y-1/2 pattern-overlay opacity-10" style={{ backgroundImage: `url(${patterns.arabesque})` }}></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 translate-x-1/2 translate-y-1/2 pattern-overlay opacity-10" style={{ backgroundImage: `url(${patterns.islamic})` }}></div>
      <style>{`
        .pattern-overlay {
          background-repeat: repeat;
          background-size: 200px;
          width: 100%;
          height: 100%;
        }
      `}</style>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Left Panel: Card Details */}
          <section className="flex flex-col items-center gap-8 mb-12">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="bg-white rounded-2xl shadow-2xl p-12 w-full min-h-[600px] flex flex-col items-center border border-primary-100">
              <div className="mb-4">{category.icon}</div>
              <h1 className="text-5xl font-extrabold text-primary-700 mb-2 mt-2 drop-shadow-lg text-center">{category.title}</h1>
              {category.type && (
                <div className="text-lg font-semibold text-primary-500 mb-2 text-center uppercase tracking-wide">{category.type}</div>
              )}
              {category.subtitle && (
                <h2 className="text-2xl font-semibold text-primary-600 mb-4 text-center italic">{category.subtitle}</h2>
              )}
              <p className="text-lg text-gray-700 mb-4 text-center leading-relaxed">{category.description}</p>
              <div className="bg-gradient-to-r from-primary-100 via-white to-primary-100 rounded-lg p-4 mb-4 w-full text-center border border-primary-200">
                <span className="text-primary-700 font-semibold">Impact:</span> {category.impact}
              </div>
              <div className="flex flex-wrap gap-2 mt-2 justify-center">
                {category.suggestedAmounts && category.suggestedAmounts.map((amt) => (
                  <span key={amt} className="px-4 py-2 bg-primary-600 text-white rounded-full font-medium shadow-md hover:bg-primary-700 transition-colors cursor-pointer">${amt}</span>
                ))}
              </div>
              {/* Divider */}
              <div className="w-full border-t border-primary-100 my-6"></div>
              {/* Display extra fields if present */}
              <div className="grid grid-cols-2 gap-4 w-full mb-4">
                {category.goal && (
                  <div className="text-center bg-primary-50 rounded-lg p-3 shadow-sm">
                    <span className="font-semibold text-primary-700">Goal:</span> <span className="text-primary-900">${category.goal}</span>
                  </div>
                )}
                {category.raised && (
                  <div className="text-center bg-primary-50 rounded-lg p-3 shadow-sm">
                    <span className="font-semibold text-primary-700">Raised:</span> <span className="text-primary-900">${category.raised}</span>
                  </div>
                )}
                {category.location && (
                  <div className="text-center bg-primary-50 rounded-lg p-3 shadow-sm">
                    <span className="font-semibold text-primary-700">Location:</span> <span className="text-primary-900">{category.location}</span>
                  </div>
                )}
                {category.donors && (
                  <div className="text-center bg-primary-50 rounded-lg p-3 shadow-sm">
                    <span className="font-semibold text-primary-700">Donors:</span> <span className="text-primary-900">{category.donors}</span>
                  </div>
                )}
                {category.daysLeft && (
                  <div className="text-center bg-primary-50 rounded-lg p-3 shadow-sm">
                    <span className="font-semibold text-primary-700">Days Left:</span> <span className="text-primary-900">{category.daysLeft}</span>
                  </div>
                )}
              </div>
              {/* Benefits Section */}
              {category.benefits && category.benefits.length > 0 && (
                <div className="mt-2 w-full">
                  <h3 className="text-lg font-bold text-primary-700 mb-2 text-center flex items-center justify-center gap-1">
                    <span className="inline-block bg-primary-100 rounded-full p-1"><FaHandHoldingHeart className="text-primary-600 text-base" /></span>
                    Benefits
                  </h3>
                  <div className="grid gap-2 max-w-xl mx-auto grid-cols-1 sm:grid-cols-2">
                    {category.benefits.map((benefit, idx) => (
                      <div key={idx} className="bg-primary-50 rounded-lg shadow p-1 flex items-center gap-2 border border-primary-100">
                        <span className="inline-block bg-primary-200 rounded-full p-1"><FaRegCalendarCheck className="text-primary-700 text-sm" /></span>
                        <span className="text-primary-900 font-normal text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Extra Info Section */}
              {category.extraInfo && (
                <div className="mt-6 w-full">
                  <h3 className="text-lg font-semibold text-primary-700 mb-2 text-center">Additional Information</h3>
                  <p className="text-gray-700 text-center max-w-xl mx-auto">{category.extraInfo}</p>
                </div>
              )}
            </motion.div>
          </section>
          {/* Right Panel: Donation Form & Why Give Sadaqah */}
          <section className="flex flex-col gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-12 mb-8 min-h-[400px]">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Make a Donation</h2>
              <p className="text-gray-600 mb-6">Choose an amount or enter a custom value to support this cause.</p>
              {/* Suggested Amounts Selection (fix: fallback to default if missing) */}
              {(category.suggestedAmounts && category.suggestedAmounts.length > 0
                ? category.suggestedAmounts
                : (categoryData[category.id] && categoryData[category.id].suggestedAmounts) ? categoryData[category.id].suggestedAmounts : categoryData.general.suggestedAmounts
              ) && (
                <div className="flex flex-wrap gap-3 mb-6 justify-center">
                  {(category.suggestedAmounts && category.suggestedAmounts.length > 0
                    ? category.suggestedAmounts
                    : (categoryData[category.id] && categoryData[category.id].suggestedAmounts) ? categoryData[category.id].suggestedAmounts : categoryData.general.suggestedAmounts
                  ).map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      className="px-5 py-2 bg-primary-600 text-white rounded-full font-medium shadow hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400"
                      onClick={() => {
                        const input = document.getElementById('donation-amount-input');
                        if (input) input.value = amt;
                      }}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
              )}
              {/* Donation Form */}
              <form className="flex flex-col gap-4" onSubmit={e => {
                e.preventDefault();
                openQuickDonateWithUrgentNeed(category);
              }}>
                <input id="donation-amount-input" type="number" min="1" placeholder="Enter amount" className="border border-gray-300 rounded-lg px-4 py-2" />
                <button type="submit" className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">Donate Now</button>
              </form>
            </div>
            <div className="bg-primary-100 rounded-xl shadow-lg p-12 min-h-[300px]">
              <h2 className="text-xl font-bold text-primary-700 mb-4">Why Give Sadaqah?</h2>
              <p className="text-gray-700 mb-2">Sadaqah is a powerful way to help those in need, purify your wealth, and earn ongoing rewards. Your generosity makes a real difference in the lives of vulnerable communities.</p>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Support sustainable projects</li>
                <li>Respond to urgent needs</li>
                <li>Empower families and children</li>
                <li>Earn spiritual rewards</li>
              </ul>
            </div>
          </section>
        </div>
        {/* FAQ Section - Flexed at Bottom */}
        {category.faq && category.faq.length > 0 && (
          <section className="flex flex-col items-center justify-center mt-12 mb-4">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-8 border border-primary-100">
              <h3 className="text-2xl font-bold text-primary-700 mb-6 text-center flex items-center justify-center gap-2">
                <span className="inline-block bg-primary-100 rounded-full p-2"><FaRegCalendarCheck className="text-primary-600 text-xl" /></span>
                Frequently Asked Questions
              </h3>
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                {category.faq.map((faqItem, idx) => (
                  <div key={faqItem._id || idx} className="bg-primary-50 rounded-xl shadow-md p-6 flex flex-col gap-2 border border-primary-100 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-3">
                      <span className="inline-block bg-primary-50 rounded-full p-2"><FaQuestionCircle className="text-primary-700 text-lg" /></span>
                      <span className="font-semibold text-gray-900 text-lg">{faqItem.question}</span>
                    </div>
                    {faqItem.answer && (
                      <div className="flex items-start gap-3 mt-2">
                        <span className="inline-block bg-primary-50 rounded-full p-2"><FaRegCommentDots className="text-primary-500 text-lg" /></span>
                        <span className="text-gray-700 text-base">{faqItem.answer}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default SadaqahCategoryDetail;
