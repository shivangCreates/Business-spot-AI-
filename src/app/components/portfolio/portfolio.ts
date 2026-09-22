import { Component } from '@angular/core';

interface PortfolioProject {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  accent: string;
}

@Component({
  selector: 'app-portfolio',
  imports: [],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class Portfolio {
  readonly projects: PortfolioProject[] = [
    {
      id: 'northstar',
      category: 'AI OPERATIONS',
      title: 'Northstar Intelligence',
      description: 'A decision platform that turns complex business data into clear next actions.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85',
      alt: 'Analytics dashboard showing business performance',
      accent: '#ff6a00',
    },
    {
      id: 'atlas',
      category: 'DIGITAL PRODUCT',
      title: 'Atlas Commerce',
      description: 'A global commerce experience designed to make every customer journey feel effortless.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85',
      alt: 'Modern online shopping experience',
      accent: '#e2b35d',
    },
    {
      id: 'kinetic',
      category: 'AUTOMATION SYSTEMS',
      title: 'Kinetic Workflow',
      description: 'Connected automation that gives teams back time and keeps operations moving.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85',
      alt: 'Server room representing connected systems',
      accent: '#70a1ff',
    },
    {
      id: 'mosaic',
      category: 'BRAND EXPERIENCE',
      title: 'Mosaic Health',
      description: 'A calm, human digital experience for a healthcare brand serving modern families.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85',
      alt: 'Healthcare professional using a digital tablet',
      accent: '#67c587',
    },
  ];
}
