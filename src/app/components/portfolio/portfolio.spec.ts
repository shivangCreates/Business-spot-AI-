import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Portfolio } from './portfolio';

describe('Portfolio', () => {
  let component: Portfolio;
  let fixture: ComponentFixture<Portfolio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Portfolio],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Portfolio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders exactly three service-category cards with dedicated routes', () => {
    const cards = fixture.nativeElement.querySelectorAll('.portfolio-card') as NodeListOf<HTMLAnchorElement>;

    expect(cards.length).toBe(3);
    expect(cards[0].getAttribute('href')).toBe('/portfolio/local-business-solutions');
    expect(cards[1].getAttribute('href')).toBe('/portfolio/ai-automation');
    expect(cards[2].getAttribute('href')).toBe('/portfolio/digital-marketing');
    expect(cards[0].querySelector('img')?.getAttribute('src')).toBe(
      '/Local%20Business%20Growth%20Solutions.png',
    );
    expect(cards[1].querySelector('img')?.getAttribute('src')).toBe('/Work%20Smarter%20with%20AI-2.png');
    expect(cards[2].querySelector('img')?.getAttribute('src')).toBe(
      '/Business%20Spot%20AI%20Growth%20Campaign-1.png',
    );
    expect(fixture.nativeElement.textContent).toContain('Ideas Into Digital Experiences.');
  });
});
