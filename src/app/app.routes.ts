import { Routes } from '@angular/router';
import { HomePage } from './home';
import { PortfolioCaseStudy } from './components/portfolio-case-study/portfolio-case-study';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomePage,
  },
  {
    path: 'portfolio/local-business-solutions',
    component: PortfolioCaseStudy,
    data: {
      category: 'LOCAL BUSINESS SOLUTIONS',
      title: 'Digital Experiences That Help Local Businesses Grow',
    },
  },
  {
    path: 'portfolio/ai-automation',
    component: PortfolioCaseStudy,
    data: {
      category: 'AI & AUTOMATION',
      title: 'Smarter Workflows. Powered by AI.',
    },
  },
  {
    path: 'portfolio/digital-marketing',
    component: PortfolioCaseStudy,
    data: {
      category: 'DIGITAL MARKETING',
      title: 'Turn Attention Into Business Growth',
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
