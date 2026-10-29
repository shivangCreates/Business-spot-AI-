import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { finalize } from 'rxjs';
import { InquiryRequest, InquiryService } from '../../services/inquiry.service';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  readonly submitted = signal(false);
  readonly isSubmitting = signal(false);
  readonly submissionError = signal('');

  private readonly inquiryService = inject(InquiryService);

  submitForm(form: NgForm): void {
    if (form.invalid || this.isSubmitting()) {
      return;
    }

    const values = form.value;
    const inquiry: InquiryRequest = {
      name: values.name.trim(),
      email: values.email.trim(),
      company: values.company?.trim() || null,
      project_type: values.projectType,
      message: values.message.trim(),
    };

    this.submissionError.set('');
    this.isSubmitting.set(true);

    this.inquiryService.createInquiry(inquiry)
      .pipe(finalize(() => this.isSubmitting.set(false)))
      .subscribe({
        next: () => {
          form.resetForm();
          this.submitted.set(true);
        },
        error: (error: unknown) => {
          if (error instanceof HttpErrorResponse) {
            console.error('Contact inquiry request failed', {
              status: error.status,
              statusText: error.statusText,
              url: error.url,
            });
            this.submissionError.set(error.status === 0
              ? 'We could not reach the server. Please check your connection and try again.'
              : 'We could not send your inquiry right now. Please try again or email us.');
            return;
          }

          console.error('Contact inquiry request failed unexpectedly');
          this.submissionError.set('We could not send your inquiry right now. Please try again or email us.');
        },
      });
  }
}
