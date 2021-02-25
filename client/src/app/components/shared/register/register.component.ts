import { RegisterLogicService } from './../../../services/register-logic.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  firstStep = true;
  secondForm: FormGroup;
  constructor(
    public router: Router,
    public registerLogic: RegisterLogicService
  ) {}

  ngOnInit(): void {
    this.secondForm = new FormGroup({});
  }
}
