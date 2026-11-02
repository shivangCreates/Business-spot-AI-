import { isPlatformBrowser } from '@angular/common';
import { Component, NgZone, OnDestroy, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';

interface Testimonial {
  id: number;
  image: string;
  imageAlt: string;
  name: string;
  category: string;
  review: string;
  rating: number;
}

@Component({
  selector: 'app-testimonials',
  imports: [],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css',
})
export class Testimonials implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly ngZone = inject(NgZone);
  private autoplayTimer?: ReturnType<typeof setInterval>;
  private motionPreference?: MediaQueryList;
  private isPaused = false;
  private readonly onMotionPreferenceChange = (event: MediaQueryListEvent): void => {
    if (event.matches) {
      this.clearAutoplay();
    } else {
      this.startAutoplay();
    }
  };

  readonly activeIndex = signal(0);
  readonly movementDirection = signal(1);
  readonly dragOffset = signal(0);
  readonly isDragging = signal(false);
  readonly offsets = [-1, 0, 1];
  readonly indicators = Array.from({ length: 8 }, (_, index) => index);
  private pointerStartX = 0;
  private pointerStartY = 0;

  readonly testimonials: Testimonial[] = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&crop=faces&w=160&h=160&q=75',
      imageAlt: 'Sample profile portrait',
      name: 'Sample Client 01',
      category: 'Small business · Digital growth',
      review: 'Sample testimonial for digital marketing and stronger online visibility.',
      rating: 5,
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&crop=faces&w=160&h=160&q=75',
      imageAlt: 'Sample profile portrait',
      name: 'Sample Client 02',
      category: 'Startup · Web development',
      review: 'Sample testimonial for a modern website built around a growing business.',
      rating: 5,
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&crop=faces&w=160&h=160&q=75',
      imageAlt: 'Sample profile portrait',
      name: 'Sample Client 03',
      category: 'Business · AI solutions',
      review: 'Sample testimonial for practical AI tools designed around everyday needs.',
      rating: 5,
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&crop=faces&w=160&h=160&q=75',
      imageAlt: 'Sample profile portrait',
      name: 'Sample Client 04',
      category: 'Operations · Automation',
      review: 'Sample testimonial for workflows that help teams reduce repetitive tasks.',
      rating: 5,
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&crop=faces&w=160&h=160&q=75',
      imageAlt: 'Sample profile portrait',
      name: 'Sample Client 05',
      category: 'Growing company · Integrations',
      review: 'Sample testimonial for connecting business systems and simplifying operations.',
      rating: 5,
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&crop=faces&w=160&h=160&q=75',
      imageAlt: 'Sample profile portrait',
      name: 'Sample Client 06',
      category: 'Entrepreneur · Digital strategy',
      review: 'Sample testimonial for clear digital planning and a stronger brand presence.',
      rating: 5,
    },
    {
      id: 7,
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&crop=faces&w=160&h=160&q=75',
      imageAlt: 'Sample profile portrait',
      name: 'Sample Client 07',
      category: 'Business · Customer experience',
      review: 'Sample testimonial for thoughtful digital experiences and customer support.',
      rating: 5,
    },
    {
      id: 8,
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&crop=faces&w=160&h=160&q=75',
      imageAlt: 'Sample profile portrait',
      name: 'Sample Client 08',
      category: 'Established company · Software',
      review: 'Sample testimonial for tailored software that supports business growth.',
      rating: 5,
    },
  ];

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.motionPreference.addEventListener('change', this.onMotionPreferenceChange);
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.clearAutoplay();
    this.motionPreference?.removeEventListener('change', this.onMotionPreferenceChange);
  }

  testimonialAt(offset: number): Testimonial {
    const index =
      (this.activeIndex() + offset + this.testimonials.length) % this.testimonials.length;
    return this.testimonials[index];
  }

  indexAt(offset: number): number {
    return (this.activeIndex() + offset + this.testimonials.length) % this.testimonials.length;
  }

  move(direction: number): void {
    const step = direction >= 0 ? 1 : -1;
    this.isDragging.set(false);
    this.dragOffset.set(0);
    this.movementDirection.set(step);
    this.activeIndex.set(
      (this.activeIndex() + step + this.testimonials.length) % this.testimonials.length,
    );
    this.resetAutoplay();
  }

  select(index: number): void {
    const normalizedIndex = (index + this.testimonials.length) % this.testimonials.length;
    if (normalizedIndex === this.activeIndex()) return;

    this.isDragging.set(false);
    this.dragOffset.set(0);
    this.movementDirection.set(normalizedIndex > this.activeIndex() ? 1 : -1);
    this.activeIndex.set(normalizedIndex);
    this.resetAutoplay();
  }

  pauseAutoplay(): void {
    this.isPaused = true;
    this.clearAutoplay();
  }

  resumeAutoplay(): void {
    this.isPaused = false;
    this.startAutoplay();
  }

  onPointerDown(event: PointerEvent): void {
    this.pointerStartX = event.clientX;
    this.pointerStartY = event.clientY;
    this.dragOffset.set(0);
    this.isDragging.set(true);
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  }

  onPointerMove(event: PointerEvent): void {
    if (!this.isDragging()) return;

    const horizontal = event.clientX - this.pointerStartX;
    const vertical = event.clientY - this.pointerStartY;
    if (Math.abs(horizontal) > Math.abs(vertical) * 1.2) {
      this.dragOffset.set(Math.max(-180, Math.min(180, horizontal)));
    }
  }

  onPointerUp(event: PointerEvent): void {
    const deck = event.currentTarget as HTMLElement;
    if (deck.hasPointerCapture(event.pointerId)) deck.releasePointerCapture(event.pointerId);

    const horizontal = event.clientX - this.pointerStartX;
    const vertical = event.clientY - this.pointerStartY;
    const isSwipe = Math.abs(horizontal) >= 45 && Math.abs(horizontal) >= Math.abs(vertical) * 1.2;
    this.isDragging.set(false);

    if (isSwipe) {
      this.move(horizontal < 0 ? 1 : -1);
    } else {
      this.dragOffset.set(0);
    }
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.move(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.move(1);
    }
  }

  private startAutoplay(): void {
    if (
      !isPlatformBrowser(this.platformId) ||
      this.isPaused ||
      this.motionPreference?.matches ||
      this.autoplayTimer
    ) {
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      this.autoplayTimer = setInterval(() => {
        this.ngZone.run(() => this.move(1));
      }, 4500);
    });
  }

  private clearAutoplay(): void {
    if (!this.autoplayTimer) return;
    clearInterval(this.autoplayTimer);
    this.autoplayTimer = undefined;
  }

  private resetAutoplay(): void {
    this.clearAutoplay();
    this.startAutoplay();
  }
}
