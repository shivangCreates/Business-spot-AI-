import { Component } from '@angular/core';

interface ServiceOffering {
  number: string;
  category: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  offerings: string[];
}

@Component({
  selector: 'app-services',
  imports: [],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services {
  readonly services: ServiceOffering[] = [
    {
      number: '01',
      category: 'Digital growth',
      title: 'Digital Growth & Marketing',
      description:
        'We help local businesses, startups, and established companies worldwide strengthen their digital presence, attract the right audience, generate quality leads, and grow their business through strategic digital marketing.',
      image: '/Digital%20Marketing%20Growth%20Dashboard.png',
      imageAlt: 'Digital marketing growth dashboard with campaign analytics',
      offerings: [
        'Social Media Marketing',
        'Search Engine Optimization (SEO)',
        'Paid Advertising Campaigns',
        'Lead Generation',
        'Website Development and Optimization',
        'Brand Visibility and Digital Strategy',
      ],
    },
    {
      number: '02',
      category: 'AI & automation',
      title: 'AI Solutions & Intelligent Automation',
      description:
        'We help businesses worldwide leverage AI-powered solutions and intelligent automation to reduce repetitive work, save time and operational costs, improve productivity, and build smarter business workflows.',
      image: '/AI%20Automation%20Workflow%20Assistant.png',
      imageAlt: 'AI automation workflow assistant interface',
      offerings: [
        'AI Agents and AI Chatbots',
        'Business Process Automation',
        'Workflow Automation',
        'AI-powered Customer Support',
        'Lead Management Automation',
        'Custom AI Integrations',
      ],
    },
    {
      number: '03',
      category: 'Digital transformation',
      title: 'Digital Transformation & Business Solutions',
      description:
        'We empower local businesses and global companies to transform their operations digitally with modern technology, scalable software solutions, and intelligent systems designed to improve efficiency and accelerate business growth.',
      image: '/localbusiness.png',
      imageAlt: 'Local business representing digital transformation and business solutions',
      offerings: [
        'Custom Software Development',
        'Business Website Development',
        'CRM and Third-party Integrations',
        'Digital Business Solutions',
        'Process Optimization',
        'Scalable Technology Solutions',
      ],
    },
  ];
}
