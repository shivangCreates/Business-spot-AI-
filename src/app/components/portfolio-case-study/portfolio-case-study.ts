import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-portfolio-case-study',
  imports: [RouterLink],
  templateUrl: './portfolio-case-study.html',
  styleUrl: './portfolio-case-study.css',
})
export class PortfolioCaseStudy {
  private readonly route = inject(ActivatedRoute);

  readonly category: string = this.route.snapshot.data['category'];
  readonly title: string = this.route.snapshot.data['title'];
}
