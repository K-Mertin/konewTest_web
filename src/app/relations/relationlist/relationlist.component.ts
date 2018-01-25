import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { AlertifyService } from '../../_service/alertify.service';
import { RelationService } from '../../_service/relation.service';
import { Relation } from '../../_model/Relation';

@Component({
  selector: 'app-relationlist',
  templateUrl: './relationlist.component.html',
  styleUrls: ['./relationlist.component.css']
})
export class RelationlistComponent implements OnInit {

  relationForm: FormGroup;
  relation: Relation;
  // requestTypes = [{ value: 'lawbank', display: '法源網' }];
  iSearchKey = '';
  iReferenceKey = '';

  constructor(private fb: FormBuilder, private alertify: AlertifyService, private relationService: RelationService) { }

  ngOnInit() {
    this.createRelationForm();
  }

  createRelationForm() {
    this.relationForm = this.fb.group({
      subjects: this.fb.array([this.fb.group({
        name: [''],
        idNumber: [''],
        memo: ['', Validators.required]
      },{validator: this.checkValidate('name', 'idNumber')})]),
      objects: this.fb.array([this.fb.group({
        name: [''],
        idNumber: [''],
        memo: ['', Validators.required]
      },{validator: this.checkValidate('name', 'idNumber')}),]),
      reason: ['', Validators.required],
      user: ['', Validators.required]
    });
  }

  addObject() {
    // add address to the list
    const control = <FormArray>this.relationForm.controls['objects'];
    control.push(this.fb.group({
      name: [''],
      idNumber: [''],
      memo: ['', Validators.required]
    },{validator: this.checkValidate('name', 'idNumber')}));
  }

  addSubject() {
    // add address to the list
    const control = <FormArray>this.relationForm.controls['subjects'];
    control.push(this.fb.group({
      name: [''],
      idNumber: [''],
      memo: ['', Validators.required]
    },{validator: this.checkValidate('name', 'idNumber')}));
  }

  remove(i: number, target: string) {
    // remove address from the list
    const control = <FormArray>this.relationForm.controls[target];
    control.removeAt(i);
  }


  addRelation() {

    this.relation = Object.assign({}, this.relationForm.value);

    this.relationService.addRelation(this.relation).subscribe(request => {
        this.alertify.success('relation created');
        this.clearForm()
    }, error => {
        this.alertify.error('failed');
    }  );
    // console.log(this.relationForm.value);
  }


  clearForm() {
    this.createRelationForm();
  }


  checkValidate(nameKey: string, idnumberKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let name = group.controls[nameKey];
      let idnumber = group.controls[idnumberKey];
      if (name.value.trim() === '' && idnumber.value.trim() === '') {
        return {
          checkValidate: true
        };
      }
    }
  }



}
