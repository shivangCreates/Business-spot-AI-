import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface InquiryRequest {
  name: string;
  email: string;
  company: string | null;
  project_type: string;
  message: string;
}

export interface InquiryResponse {
  id: number;
  name: string;
  email: string;
  company: string | null;
  project_type: string;
  message: string;
  status: string;
  created_at: string;
}

@Injectable({ providedIn: 'root' })
export class InquiryService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = 'https://business-spot-ai-backend.onrender.com/api/v1/inquiries';

  createInquiry(inquiry: InquiryRequest): Observable<InquiryResponse> {
    return this.http.post<InquiryResponse>(this.endpoint, inquiry);
  }
}
