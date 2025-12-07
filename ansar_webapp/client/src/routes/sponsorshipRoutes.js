import React from 'react';
import { Route } from 'react-router-dom';

// Sponsorship pages
import SponsorshipPage from '../pages/sponsorship/SponsorshipPage';
import OrphanSponsorshipPage from '../pages/sponsorship/categories/OrphanSponsorshipPage';
import StudentSponsorshipPage from '../pages/sponsorship/categories/StudentSponsorshipPage';
import FamilySponsorshipPage from '../pages/sponsorship/categories/FamilySponsorshipPage';
import TeacherSponsorshipPage from '../pages/sponsorship/categories/TeacherSponsorshipPage';
import SpecialNeedsSponsorshipPage from '../pages/sponsorship/categories/SpecialNeedsSponsorshipPage';

/**
 * Sponsorship routes
 */
const sponsorshipRoutes = [
  <Route key="sponsorship-main" path="sponsorship" element={<SponsorshipPage />} />,
  <Route key="sponsorship-orphan" path="sponsorship/orphan" element={<OrphanSponsorshipPage />} />,
  <Route key="sponsorship-orphan-id" path="sponsorship/orphan/:id" element={<OrphanSponsorshipPage />} />,
  <Route key="sponsorship-student" path="sponsorship/student" element={<StudentSponsorshipPage />} />,
  <Route key="sponsorship-student-id" path="sponsorship/student/:id" element={<StudentSponsorshipPage />} />,
  <Route key="sponsorship-family" path="sponsorship/family" element={<FamilySponsorshipPage />} />,
  <Route key="sponsorship-family-id" path="sponsorship/family/:id" element={<FamilySponsorshipPage />} />,
  <Route key="sponsorship-teacher" path="sponsorship/teacher" element={<TeacherSponsorshipPage />} />,
  <Route key="sponsorship-teacher-id" path="sponsorship/teacher/:id" element={<TeacherSponsorshipPage />} />,
  <Route key="sponsorship-special-needs" path="sponsorship/special-needs" element={<SpecialNeedsSponsorshipPage />} />,
  <Route key="sponsorship-special-needs-id" path="sponsorship/special-needs/:id" element={<SpecialNeedsSponsorshipPage />} />
];

export default sponsorshipRoutes; 