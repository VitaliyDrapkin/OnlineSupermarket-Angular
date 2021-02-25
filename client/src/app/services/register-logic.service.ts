import { NotificationsService } from './notifications.service';
import { AuthDataService } from './auth-data.service';
import { UsersRequestsService } from './users-requests.service';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class RegisterLogicService {
  firstInit = false;
  secondInit = false;
  firstStep = true;
  clientErrors = false;

  cities = [
    'Tel aviv',
    'Petah Tikva',
    'Rishon leZion',
    'Ramat Gan',
    'Bat Yam',
    'Holon',
    'Jerusalem',
    'Haifa',
  ];

  firstStepForm: FormGroup;
  secondStepForm: FormGroup;

  constructor(
    private usersRequests: UsersRequestsService,
    private authData: AuthDataService,
    private toast: NotificationsService
  ) {}

  initializeFirstForm() {
    if (this.firstInit) {
      return;
    }
    this.firstStepForm = new FormGroup({
      id: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
      ]),
      confirmPassword: new FormControl('', Validators.required),
    });
    this.firstInit = true;
  }

  initializeSecondForm() {
    if (this.secondInit) {
      return;
    }
    this.secondStepForm = new FormGroup({
      name: new FormControl('', Validators.required),
      lastName: new FormControl('', [Validators.required]),
      city: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
    });
    this.secondInit = true;
  }

  async firstCheck() {
    if (
      this.firstStepForm.controls.id.value.length !== 9 ||
      !Number.isInteger(+this.firstStepForm.controls.id.value)
    ) {
      this.firstStepForm.controls.id.setErrors({ incorrect: true });
      this.clientErrors = true;
    }

    if (
      this.firstStepForm.controls.password.value !==
      this.firstStepForm.controls.confirmPassword.value
    ) {
      this.firstStepForm.controls.confirmPassword.setValue('');
      this.firstStepForm.controls.confirmPassword.setErrors({
        confirmFail: true,
      });
      this.clientErrors = true;
    }

    if (this.clientErrors) {
      return;
    }

    this.usersRequests
      .checkFirstFields(
        +this.firstStepForm.controls.id.value,
        this.firstStepForm.controls.email.value,
        this.firstStepForm.controls.password.value
      )
      .subscribe(
        (response) => {
          if (response.isGood) {
            this.firstStep = false;
            return;
          }

          if (!response.id.isGood) {
            this.firstStepForm.controls.id.setErrors({
              serverError: response.id.message,
            });
          }

          if (!response.email.isGood) {
            this.firstStepForm.controls.email.setErrors({
              serverError: response.email.message,
            });
          }
        },
        (err) => {
          this.toast.showError('Please try later', 'Server error');
        }
      );
  }

  register() {
    this.usersRequests
      .register(
        +this.firstStepForm.controls.id.value,
        this.firstStepForm.controls.email.value,
        this.firstStepForm.controls.password.value,
        this.secondStepForm.controls.name.value,
        this.secondStepForm.controls.lastName.value,
        this.secondStepForm.controls.city.value,
        this.secondStepForm.controls.street.value
      )
      .subscribe(
        (data) => {
          this.authData.setAuthData(data);
          this.authData.loginModalWindow = true;
        },
        (err) => {
          this.toast.showError('Please try later', 'Server error');
        }
      );
  }
}
