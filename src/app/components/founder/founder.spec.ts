import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Founder } from './founder';

describe('Founder', () => {
  let fixture: ComponentFixture<Founder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Founder],
    }).compileComponents();

    fixture = TestBed.createComponent(Founder);
    fixture.detectChanges();
  });

  it('should render the founder story, portrait, and four highlights', () => {
    const element: HTMLElement = fixture.nativeElement;

    expect(element.querySelector('h2')?.textContent).toContain('Meet the Founder');
    expect(element.textContent).not.toContain('Building Digital Success Through Technology.');
    expect(element.querySelector('img')?.getAttribute('src')).toBe('/ShivangShukla.png');
    expect(element.querySelector('.founder__signature')?.textContent).toContain('Shivang Shukla');
    expect(element.textContent).toContain("With over 3 years of freelance experience");
    expect(element.querySelectorAll('.founder__highlights li').length).toBe(4);
    expect(element.textContent).toContain('200+ Projects Delivered');
    expect(element.textContent).toContain('Delivered throughout our 3+ years of development.');
  });
});
