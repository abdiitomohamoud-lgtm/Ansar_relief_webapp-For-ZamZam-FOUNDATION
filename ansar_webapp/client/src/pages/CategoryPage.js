import React from 'react';
import { useParams } from 'react-router-dom';
import HoverLink from '../components/common/HoverLink';
import FeatureImpactSection from '../components/common/FeatureImpactSection';
import SubcategoryCards from '../components/common/SubcategoryCards';
import CategoryProducts from '../components/common/CategoryProducts';
import StyledHero from '../components/common/StyledHero';
import StyledSection from '../components/common/StyledSection';
import { categoryColors } from '../utils/patternStyles';

const CategoryPage = () => {
  const { category } = useParams();

  // Category titles and descriptions
  const categoryInfo = {
    debtors: {
      title: "Debt Relief",
      description: "Support individuals and families struggling with financial burdens",
      pattern: "hexagons"
    },
    widows: {
      title: "Widow Support",
      description: "Empower and assist widows and their families",
      pattern: "dots"
    },
    students: {
      title: "Student Support",
      description: "Enable education through financial assistance",
      pattern: "grid"
    },
    dailySadaqa: {
      title: "Daily Sadaqa",
      description: "Make a difference every day through regular giving",
      pattern: "waves"
    },
    water: {
      title: "Water Projects",
      description: "Provide access to clean and safe water",
      pattern: "diagonal"
    },
    food: {
      title: "Food Security",
      description: "Fight hunger through sustainable food programs",
      pattern: "dots"
    },
    masjid: {
      title: "Masjid Support",
      description: "Help build and maintain places of worship",
      pattern: "hexagons"
    }
  };

  const info = categoryInfo[category] || categoryInfo.dailySadaqa;

  return (
    <div>
      {/* Hero Section */}
      <StyledHero
        category={category}
        title={info.title}
        description={info.description}
        pattern={info.pattern}
        texture="noise"
      >
        <HoverLink
          to={`/donate/${category}`}
          theme="light"
          pattern="waves"
          className="inline-block"
        >
          Donate Now
        </HoverLink>
      </StyledHero>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Feature and Impact Story Section */}
        <StyledSection
          category={category}
          title="Featured Programs"
          subtitle="Discover how your support makes a difference"
          pattern="grid"
          texture="grain"
        >
          <FeatureImpactSection category={category} />
        </StyledSection>

        {/* Featured Products */}
        <StyledSection
          category={category}
          title="Ways to Help"
          subtitle="Choose how you want to make an impact"
          pattern="dots"
          isDark={true}
        >
          <CategoryProducts category={category} />
        </StyledSection>

        {/* Subcategory Cards */}
        <StyledSection
          category={category}
          title="More Ways to Support"
          subtitle="Explore different opportunities to help"
          pattern="diagonal"
        >
          <SubcategoryCards category={category} />
        </StyledSection>

        {/* Call to Action */}
        <StyledSection
          category={category}
          pattern="hexagons"
          isDark={true}
          className="rounded-2xl mt-12"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Need More Information?</h2>
            <p className="text-white/90 mb-8">Our team is here to help you make the best decision for your sadaqa</p>
            <HoverLink
              to="/contact"
              theme="light"
              pattern="waves"
              className="inline-block"
            >
              Contact Us
            </HoverLink>
          </div>
        </StyledSection>
      </div>
    </div>
  );
};

export default CategoryPage; 