import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface PortfolioProject {
  number: string;
  category: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  route: string;
  tags: string[];
}

@Component({
  selector: 'app-portfolio',
  imports: [RouterLink],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class Portfolio {
  readonly projects: PortfolioProject[] = [
    {
      number: '01',
      category: 'LOCAL BUSINESS SOLUTIONS',
      title: 'Digital Experiences That Help Local Businesses Grow',
      description:
        'We help local businesses establish a strong digital presence through modern websites, smart business solutions, and customer-focused experiences that turn visitors into potential customers.',
      image: '/Local%20Business%20Growth%20Solutions.png',
      alt: 'Local business growth solutions concept',
      route: '/portfolio/local-business-solutions',
      tags: ['Web Development', 'Business Solutions', 'UX Design'],
    },
    {
      number: '02',
      category: 'AI & AUTOMATION',
      title: 'Smarter Workflows. Powered by AI.',
      description:
        'We build intelligent AI assistants, custom chatbots, and workflow automation systems that help businesses reduce repetitive work, improve customer interactions, and operate more efficiently.',
      image: '/Work%20Smarter%20with%20AI-2.png',
      alt: 'AI and automation solutions concept',
      route: '/portfolio/ai-automation',
      tags: ['AI Solutions', 'Automation', 'AI Chatbots'],
    },
    {
      number: '03',
      category: 'DIGITAL MARKETING',
      title: 'Turn Attention Into Business Growth',
      description:
        'We help brands grow their online presence through strategic digital marketing, engaging content, SEO, and data-driven campaigns designed to reach the right audience.',
      image: '/Business%20Spot%20AI%20Growth%20Campaign-1.png',
      alt: 'Digital marketing growth campaign concept',
      route: '/portfolio/digital-marketing',
      tags: ['Digital Marketing', 'SEO', 'Social Media'],
    },
  ];
}
