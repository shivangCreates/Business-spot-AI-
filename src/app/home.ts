import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero';
import { NavbarComponent } from './components/navbar/navbar';
import { Services } from './components/services/services';
import { Portfolio } from './components/portfolio/portfolio';
import { About } from './components/about/about';
import { Founder } from './components/founder/founder';
import { Testimonials } from './components/testimonials/testimonials';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    NavbarComponent,
    Services,
    Portfolio,
    About,
    Founder,
    Testimonials,
    Contact,
    Footer,
  ],
  templateUrl: './home.html',
  styleUrl: './app.css',
})
export class HomePage {}
