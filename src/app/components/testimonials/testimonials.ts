import { Component, signal } from '@angular/core';

interface Testimonial {
  name: string;
  role: string;
  review: string;
  image: string;
  alt: string;
}

@Component({
  selector: 'app-testimonials',
  imports: [],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css',
})
export class Testimonials {
  readonly activeIndex = signal(0);
  readonly movementDirection = signal(1);
  private pointerStartX = 0;
  private pointerStartY = 0;
  private moved = false;

  readonly testimonials: Testimonial[] = [
    {
      name: 'Ava Mitchell',
      role: 'Founder, Northstar Health',
      review: 'Business Spot AI helped us turn a complex idea into a product our team and customers could immediately understand.',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=500&q=85',
      alt: 'Professional woman smiling in an office',
    },
    {
      name: 'Marcus Chen',
      role: 'CEO, Atlas Commerce',
      review: 'They brought clarity to every decision, moved quickly, and delivered an experience that feels genuinely premium.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=85',
      alt: 'Professional man in a suit',
    },
    {
      name: 'Sofia Bennett',
      role: 'Director, Mosaic Group',
      review: 'The team understood our customers before they touched the design. The result feels thoughtful, calm, and completely ours.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=85',
      alt: 'Professional woman in a modern office',
    },
    {
      name: 'Daniel Brooks',
      role: 'COO, Kinetic Systems',
      review: 'Our workflows are faster, our reporting is clearer, and our team finally has the right systems behind the work.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=85',
      alt: 'Professional man portrait',
    },
    {
      name: 'Priya Kapoor',
      role: 'Product Lead, Orbit Labs',
      review: 'From strategy through launch, they made a complicated transformation feel remarkably simple and collaborative.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=85',
      alt: 'Professional woman portrait',
    },
    {
      name: 'James Wilson',
      role: 'Managing Partner, Verve Co.',
      review: 'We needed a partner who could think commercially and creatively. Business Spot AI did both from day one.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=85',
      alt: 'Professional man in business attire',
    },
  ];

  testimonialAt(offset: number): Testimonial {
    const index = (this.activeIndex() + offset + this.testimonials.length) % this.testimonials.length;
    return this.testimonials[index];
  }

  move(direction: number): void {
    const next = this.activeIndex() + direction;
    this.movementDirection.set(direction >= 0 ? 1 : -1);
    this.activeIndex.set((next + this.testimonials.length) % this.testimonials.length);
  }

  select(offset: number): void {
    this.move(offset);
  }

  onDeckClick(event: MouseEvent): void {
    const deck = event.currentTarget as HTMLElement;
    const bounds = deck.getBoundingClientRect();
    const clickedLeftOfCenter = event.clientX < bounds.left + bounds.width / 2;
    this.move(clickedLeftOfCenter ? -1 : 1);
  }

  onPointerDown(event: PointerEvent): void {
    const deck = event.currentTarget as HTMLElement;
    this.pointerStartX = event.clientX;
    this.pointerStartY = event.clientY;
    this.moved = false;
    deck.setPointerCapture(event.pointerId);
  }

  onPointerMove(event: PointerEvent): void {
    this.moved = Math.max(
      Math.abs(event.clientX - this.pointerStartX),
      Math.abs(event.clientY - this.pointerStartY),
    ) > 10;
  }

  onPointerUp(event: PointerEvent): void {
    const horizontal = event.clientX - this.pointerStartX;
    const vertical = event.clientY - this.pointerStartY;
    const deck = event.currentTarget as HTMLElement;
    if (deck.hasPointerCapture(event.pointerId)) deck.releasePointerCapture(event.pointerId);
    if (!this.moved) return;
    this.move(horizontal < -30 || vertical < -30 ? 1 : -1);
  }

}
