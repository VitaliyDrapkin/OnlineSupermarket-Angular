import { Component, OnInit } from '@angular/core';
import { RegisterLogicService } from 'src/app/services/register-logic.service';

@Component({
  selector: 'app-first-step-register',
  templateUrl: './first-step-register.component.html',
  styleUrls: ['./first-step-register.component.css'],
})
export class FirstStepRegisterComponent implements OnInit {

  constructor(public registerLogic: RegisterLogicService) {}

  ngOnInit(): void {
    this.registerLogic.initializeFirstForm();
  }
}
