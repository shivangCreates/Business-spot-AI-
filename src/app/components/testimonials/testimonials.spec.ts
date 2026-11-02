import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Testimonials } from './testimonials';

describe('Testimonials', () => {
  let component: Testimonials;
  let fixture: ComponentFixture<Testimonials>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Testimonials],
    }).compileComponents();

    fixture = TestBed.createComponent(Testimonials);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => fixture.destroy());

  it('should render eight clearly labeled sample testimonials and navigation controls', () => {
    const element: HTMLElement = fixture.nativeElement;

    expect(component.testimonials.length).toBe(8);
    expect(element.querySelectorAll('.testimonial-card').length).toBe(3);
    expect(element.querySelectorAll('.testimonials__indicator').length).toBe(8);
    expect(element.textContent).toContain('not verified client reviews');
    expect(element.querySelectorAll('.testimonial-card__sample').length).toBe(3);
  });

  it('should wrap in both directions and select an indicator directly', () => {
    component.move(-1);
    expect(component.activeIndex()).toBe(7);

    component.move(1);
    expect(component.activeIndex()).toBe(0);

    component.select(5);
    expect(component.activeIndex()).toBe(5);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
