import { Component, OnInit } from '@angular/core';
import { LoanCase, LOANCASES } from '../_model/LoanCase';

@Component({
  selector: 'app-loancases',
  templateUrl: './loancases.component.html',
  styleUrls: ['./loancases.component.css']
})
export class LoancasesComponent implements OnInit {

  loancases: LoanCase[];
  queryType: string;
  loancaseEdit: LoanCase;

  public theBoundCallback: Function;

  constructor() { }

  ngOnInit() {
    this.queryType = 'idNumber';
    this.loancases = LOANCASES;
    this.theBoundCallback = this.search.bind(this);
  }

  
  search() {
    console.log('search');
  }

  setEditLoancase(loancaseEdit) {
    this.loancaseEdit = loancaseEdit;
  }
  resetEditLoancase() {
    this.loancaseEdit = null;
  }

}
