import { afterNextRender, Component, ElementRef, OnDestroy, signal, ViewChild } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class HeroComponent implements OnDestroy {

  @ViewChild('heroVideo') private heroVideo?: ElementRef<HTMLVideoElement>;

  rotatingTexts = [
    'AI & AUTOMATION',
    'SOFTWARE SERVICES',
    'BUSINESS SOLUTIONS',
    'DIGITAL PRODUCTS'
  ];

  rotatingText = signal(this.rotatingTexts[0]);
  previousRotatingText = signal(this.rotatingTexts[0]);
  isRotating = signal(false);

  private currentIndex = 0;
  private intervalId?: ReturnType<typeof setInterval>;
  private animationTimeoutId?: ReturnType<typeof setTimeout>;

  constructor() {
    afterNextRender(() => {
      const video = this.heroVideo?.nativeElement;
      if (!video) {
        return;
      }

      video.defaultMuted = true;
      video.muted = true;
      video.volume = 0;
      video.setAttribute('muted', '');
      video.src = video.dataset['src'] ?? '';
      video.addEventListener('loadedmetadata', () => {
        video.defaultMuted = true;
        video.muted = true;
        video.volume = 0;
      }, { once: true });
      video.load();
      void video.play().catch(() => undefined);

      this.intervalId = setInterval(() => {
        this.isRotating.set(false);
        this.previousRotatingText.set(this.rotatingText());
        this.currentIndex =
          (this.currentIndex + 1) % this.rotatingTexts.length;

        this.animationTimeoutId = setTimeout(() => {
          this.rotatingText.set(this.rotatingTexts[this.currentIndex]);
          this.isRotating.set(true);
        }, 30);
      }, 4200);
    });
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    if (this.animationTimeoutId) {
      clearTimeout(this.animationTimeoutId);
    }
  }
}