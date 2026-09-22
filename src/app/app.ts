import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroComponent } from './components/hero/hero';
import { NavbarComponent } from './components/navbar/navbar';
import { Services } from './components/services/services';
import { Portfolio } from './components/portfolio/portfolio';
import { About } from './components/about/about';
import { Testimonials } from './components/testimonials/testimonials';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [HeroComponent, NavbarComponent, Services, Portfolio, About, Testimonials, Contact, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
