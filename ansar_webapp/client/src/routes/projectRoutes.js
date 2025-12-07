import React from 'react';
import { Route } from 'react-router-dom';

// Projects pages
import ProjectsPage from '../pages/projects/ProjectsPage';
import ProjectDetails from '../pages/projects/ProjectDetails';
import MosquesProjectsPage from '../pages/projects/categories/MosquesProjectsPage';
import HousingProjectsPage from '../pages/projects/categories/HousingProjectsPage';
import WaterProjectsPage from '../pages/projects/categories/WaterProjectsPage';
import HealthProjectsPage from '../pages/projects/categories/HealthProjectsPage';
import EducationProjectsPage from '../pages/projects/categories/EducationProjectsPage';
import IncomeProjectsPage from '../pages/projects/categories/IncomeProjectsPage';
import ReliefProjectsPage from '../pages/projects/categories/ReliefProjectsPage';

/**
 * Project routes
 */
const projectRoutes = [
  <Route key="projects-main" path="projects" element={<ProjectsPage />} />,
  <Route key="projects-detail" path="projects/:id" element={<ProjectDetails />} />,
  <Route key="projects-mosques" path="projects/categories/mosques" element={<MosquesProjectsPage />} />,
  <Route key="projects-housing" path="projects/categories/housing" element={<HousingProjectsPage />} />,
  <Route key="projects-water" path="projects/categories/water" element={<WaterProjectsPage />} />,
  <Route key="projects-health" path="projects/categories/health" element={<HealthProjectsPage />} />,
  <Route key="projects-education" path="projects/categories/education" element={<EducationProjectsPage />} />,
  <Route key="projects-income" path="projects/categories/income" element={<IncomeProjectsPage />} />,
  <Route key="projects-relief" path="projects/categories/relief" element={<ReliefProjectsPage />} />
];

export default projectRoutes; 