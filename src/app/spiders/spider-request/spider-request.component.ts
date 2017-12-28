import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-spider-request',
  templateUrl: './spider-request.component.html',
  styleUrls: ['./spider-request.component.css']
})
export class SpiderRequestComponent implements OnInit {
  requestForm: FormGroup;
  requestTypes = [{ value: 'lawbank', display: 'Law Bank' }];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createRegisterForm();
  }

  submit() {
    console.log(this.requestForm.value);
  }

  createRegisterForm() {
    this.requestForm = this.fb.group({
      requestType: ['lawbank'],
      searchKeys: this.fb.array([new FormControl()]),
      referenceKeys: this.fb.array([new FormControl()]),
      requester: ['', Validators.required],
      requestStatus: ['', Validators.required]
    });
  }

  addSearchKey() {
    const control = <FormArray>this.requestForm.controls['searchKeys'];
    control.push(new FormControl());
  }


  removeSearchKey(i: number) {
    const control = <FormArray>this.requestForm.controls['searchKeys'];
    control.removeAt(i);
  }

  addReferenceKey() {
    const control = <FormArray>this.requestForm.controls['referenceKeys'];
    control.push(new FormControl());
  }


  removeReferenceKey(i: number) {
    const control = <FormArray>this.requestForm.controls['referenceKeys'];
    control.removeAt(i);
  }
}
