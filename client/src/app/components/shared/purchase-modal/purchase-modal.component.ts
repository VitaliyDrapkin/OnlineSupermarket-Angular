import { PurchaseLogicService } from './../../../services/purchase-logic.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-purchase-modal',
  templateUrl: './purchase-modal.component.html',
  styleUrls: ['./purchase-modal.component.css'],
})
export class PurchaseModalComponent implements OnInit {
  constructor(
    private router: Router,
    private purchaseLogic: PurchaseLogicService
  ) {}

  ngOnInit(): void {}

  backToShop() {
    this.router.navigate(['/main']);
  }

  getReceipt() {
    var blob = new Blob([this.purchaseLogic.receipt], {
      type: 'text/plain;charset=utf-8',
    });
    saveAs.saveAs(blob, 'receipt.txt');
  }
}
