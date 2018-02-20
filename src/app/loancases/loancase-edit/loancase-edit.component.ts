import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { LoanCase, LOANCASES } from '../../_model/LoanCase';
import { CommonService } from '../../_service/common.service';

import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/bs-moment';
import { zhCn } from 'ngx-bootstrap/locale';


@Component({
  selector: 'app-loancase-edit',
  templateUrl: './loancase-edit.component.html',
  styleUrls: ['./loancase-edit.component.css']
})
export class LoancaseEditComponent implements OnInit {
  @Input() loancaseEdit: LoanCase
  @Input() public search: Function
  @ViewChild('closeTag') closeTag: ElementRef

  newState = true;

  loancaseForm: FormGroup;

  loanStatusList;

  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();

  constructor(private fb: FormBuilder, private commonService: CommonService,private _localeService: BsLocaleService) {
    defineLocale('zh_cn', zhCn);
    this.dpConfig.containerClass = 'theme-blue';
    this.dpConfig.dateInputFormat = 'L'; // Or format like you want
    this._localeService.use('zh_cn')
  }

  ngOnInit() {
    this.createLoancaseForm();
    this.commonService.getLoanStatus().subscribe(r => this.loanStatusList = r);
  }

  ngOnChanges() {
    if (this.loancaseEdit) {
      console.log('edit');
      this.setLoancaseForm();
      this.newState = false;
    }
    else {
      console.log('new');
      this.newState = true;
      this.createLoancaseForm();
    }

  }

  createLoancaseForm() {
    this.loancaseForm = this.fb.group({
      idNumber: ['', Validators.required],
      name: ['', Validators.required],
      status: ['new', Validators.required],
      applyDate: [null, Validators.required],
      contactor: ['', Validators.required],
      sales: ['', Validators.required],
      ticketCredit: [''],
      salesVisitDate: [null],
      lastReplyDate: [null],
      user: ['', Validators.required]
    });
  }

  setLoancaseForm() {
    this.createLoancaseForm();
    this.loancaseForm.controls['idNumber'].setValue(this.loancaseEdit.idNumber);
    this.loancaseForm.controls['name'].setValue(this.loancaseEdit.name);
    this.loancaseForm.controls['status'].setValue(this.loancaseEdit.status);
  }

  addLoancase() {
    console.log(this.loancaseForm.value);
  }
}
