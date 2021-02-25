import { Component, OnInit } from '@angular/core';
import { RegisterLogicService } from 'src/app/services/register-logic.service';

@Component({
  selector: 'app-second-step-register',
  templateUrl: './second-step-register.component.html',
  styleUrls: ['./second-step-register.component.css'],
})
export class SecondStepRegisterComponent implements OnInit {
  
  constructor(public registerLogic: RegisterLogicService) {}

  ngOnInit(): void {
    this.registerLogic.initializeSecondForm();
  }
}
