import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Footer } from './footer';

describe('Footer', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should link to the Business Spot AI social profiles', () => {
    const links: NodeListOf<HTMLAnchorElement> =
      fixture.nativeElement.querySelectorAll('.footer__socials a');

    expect(links.length).toBe(3);
    expect(links[0].href).toBe(
      'https://www.instagram.com/businessspot.ai?srtk=bjUyZXNsNTZkaWE5&utm_source=qr',
    );
    expect(links[1].href).toBe(
      'https://www.facebook.com/share/1Mut1oPSUR/?mibextid=wwXIfr',
    );
    expect(links[2].href).toBe('https://www.linkedin.com/company/business-spot-ai/');
    links.forEach((link) => {
      expect(link.target).toBe('_blank');
      expect(link.rel).toContain('noopener');
    });
  });
});
