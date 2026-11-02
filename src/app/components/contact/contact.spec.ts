import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { NgForm, NgModel } from '@angular/forms';

import { Contact } from './contact';

describe('Contact', () => {
  let component: Contact;
  let fixture: ComponentFixture<Contact>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contact],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Contact);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTestingController.verify());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows an error and blocks submission when the project description is under 10 characters', () => {
    const textarea = fixture.debugElement.query(By.css('textarea'));
    const messageModel = textarea.injector.get(NgModel);
    const messageElement = textarea.nativeElement as HTMLTextAreaElement;

    messageModel.control.setValue('Too short');
    messageModel.control.markAsTouched();
    component.updateMessageLength('Too short');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('#project-message-error')?.hidden).toBeFalse();
    expect(messageElement.getAttribute('aria-invalid')).toBe('true');
    expect(fixture.nativeElement.querySelector('button[type="submit"]')?.disabled).toBeTrue();

    messageModel.control.setValue('This is long enough');
    component.updateMessageLength('This is long enough');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('#project-message-error')?.hidden).toBeTrue();
    expect(messageElement.getAttribute('aria-invalid')).toBe('false');
  });

  it('submits the backend payload and shows success only after the request succeeds', () => {
    const form = fixture.debugElement.query(By.directive(NgForm)).injector.get(NgForm);
    form.control.setValue({
      name: ' Jane Smith ',
      email: 'jane@example.com',
      company: '  ',
      projectType: 'Custom software',
      message: ' I need a new business website. ',
      consent: true,
    });

    component.submitForm(form);

    expect(component.isSubmitting()).toBeTrue();
    expect(component.submitted()).toBeFalse();
    const request = httpTestingController.expectOne(
      'https://business-spot-ai-backend.onrender.com/api/v1/inquiries',
    );
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({
      name: 'Jane Smith',
      email: 'jane@example.com',
      company: null,
      project_type: 'Custom software',
      message: 'I need a new business website.',
    });

    request.flush({
      id: 1,
      name: 'Jane Smith',
      email: 'jane@example.com',
      company: null,
      project_type: 'Custom software',
      message: 'I need a new business website.',
      status: 'received',
      created_at: '2026-10-29T00:00:00Z',
    }, { status: 201, statusText: 'Created' });

    expect(component.isSubmitting()).toBeFalse();
    expect(component.submitted()).toBeTrue();
    expect(form.pristine).toBeTrue();
  });

  it('keeps form data and reports HTTP failures without showing success', () => {
    spyOn(console, 'error');
    const form = fixture.debugElement.query(By.directive(NgForm)).injector.get(NgForm);
    form.control.setValue({
      name: 'Jane Smith',
      email: 'jane@example.com',
      company: 'Example Company',
      projectType: 'Custom software',
      message: 'I need a new business website.',
      consent: true,
    });

    component.submitForm(form);
    httpTestingController.expectOne(
      'https://business-spot-ai-backend.onrender.com/api/v1/inquiries',
    ).flush({ detail: 'Request failed' }, { status: 500, statusText: 'Server Error' });

    expect(component.submitted()).toBeFalse();
    expect(component.isSubmitting()).toBeFalse();
    expect(component.submissionError()).toContain('Please try again');
    expect(form.control.get('name')?.value).toBe('Jane Smith');
    expect(console.error).toHaveBeenCalledWith('Contact inquiry request failed', {
      status: 500,
      statusText: 'Server Error',
      url: 'https://business-spot-ai-backend.onrender.com/api/v1/inquiries',
    });
  });
});
