import AboutPage from '../pages/about/AboutPage';
import VolunteerPage from '../pages/volunteer/VolunteerPage';
import CampaignDetails from '../pages/CampaignDetails';
import SponsorshipPage from '../pages/sponsorship/SponsorshipPage';
import OrphanSponsorshipPage from '../pages/sponsorship/categories/OrphanSponsorshipPage';
import StudentSponsorshipPage from '../pages/sponsorship/categories/StudentSponsorshipPage';
import FamilySponsorshipPage from '../pages/sponsorship/categories/FamilySponsorshipPage';
import TeacherSponsorshipPage from '../pages/sponsorship/categories/TeacherSponsorshipPage';
import SpecialNeedsSponsorshipPage from '../pages/sponsorship/categories/SpecialNeedsSponsorshipPage';
import ProjectsPage from '../pages/projects/ProjectsPage';
import ProjectDetails from '../pages/projects/ProjectDetails';
import MosquesProjectsPage from '../pages/projects/categories/MosquesProjectsPage';
import HousingProjectsPage from '../pages/projects/categories/HousingProjectsPage';
import WaterProjectsPage from '../pages/projects/categories/WaterProjectsPage';
import HealthProjectsPage from '../pages/projects/categories/HealthProjectsPage';
import EducationProjectsPage from '../pages/projects/categories/EducationProjectsPage';
import IncomeProjectsPage from '../pages/projects/categories/IncomeProjectsPage';
import ReliefProjectsPage from '../pages/projects/categories/ReliefProjectsPage';

const routes = [
  {
    path: '/about',
    element: <AboutPage />
  },
  {
    path: '/volunteer',
    element: <VolunteerPage />
  },
  {
    path: '/campaigns/:id',
    element: <CampaignDetails />
  },
  {
    path: '/sponsorship',
    element: <SponsorshipPage />
  },
  {
    path: '/sponsorship/orphan',
    element: <OrphanSponsorshipPage />
  },
  {
    path: '/sponsorship/orphan/:id',
    element: <OrphanSponsorshipPage />
  },
  {
    path: '/sponsorship/student',
    element: <StudentSponsorshipPage />
  },
  {
    path: '/sponsorship/student/:id',
    element: <StudentSponsorshipPage />
  },
  {
    path: '/sponsorship/family',
    element: <FamilySponsorshipPage />
  },
  {
    path: '/sponsorship/family/:id',
    element: <FamilySponsorshipPage />
  },
  {
    path: '/sponsorship/teacher',
    element: <TeacherSponsorshipPage />
  },
  {
    path: '/sponsorship/teacher/:id',
    element: <TeacherSponsorshipPage />
  },
  {
    path: '/sponsorship/special-needs',
    element: <SpecialNeedsSponsorshipPage />
  },
  {
    path: '/sponsorship/special-needs/:id',
    element: <SpecialNeedsSponsorshipPage />
  },
  // Projects Routes
  {
    path: '/projects',
    element: <ProjectsPage />
  },
  {
    path: '/projects/:id',
    element: <ProjectDetails />
  },
  {
    path: '/projects/mosques',
    element: <MosquesProjectsPage />
  },
  {
    path: '/projects/mosques/:id',
    element: <ProjectDetails />
  },
  {
    path: '/projects/housing',
    element: <HousingProjectsPage />
  },
  {
    path: '/projects/housing/:id',
    element: <ProjectDetails />
  },
  {
    path: '/projects/water',
    element: <WaterProjectsPage />
  },
  {
    path: '/projects/water/:id',
    element: <ProjectDetails />
  },
  {
    path: '/projects/health',
    element: <HealthProjectsPage />
  },
  {
    path: '/projects/health/:id',
    element: <ProjectDetails />
  },
  {
    path: '/projects/education',
    element: <EducationProjectsPage />
  },
  {
    path: '/projects/education/:id',
    element: <ProjectDetails />
  },
  {
    path: '/projects/income',
    element: <IncomeProjectsPage />
  },
  {
    path: '/projects/income/:id',
    element: <ProjectDetails />
  },
  {
    path: '/projects/relief',
    element: <ReliefProjectsPage />
  },
  {
    path: '/projects/relief/:id',
    element: <ProjectDetails />
  }
];

export default routes; 