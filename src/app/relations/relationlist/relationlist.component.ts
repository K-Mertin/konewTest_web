import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { AlertifyService } from '../../_service/alertify.service';
import { RelationService } from '../../_service/relation.service';
import { Relation } from '../../_model/Relation';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-relationlist',
  templateUrl: './relationlist.component.html',
  styleUrls: ['./relationlist.component.css']
})
export class RelationlistComponent implements OnInit {

  private baseUrl = environment.apiUrl + '/relation';
  relationForm: FormGroup;
  relation: Relation;
<<<<<<< HEAD
  uploader: FileUploader;
  relationlist = ['關係A', '關係B', '關係C', '關係D', '關係E', '關係F', '關係G', '其他'];
=======
  dropdownList = [];
  dropdownSettings = {};
  filePath: string;
>>>>>>> 479e4886d9a4ee45b0b0541aae12346cf9291864

  constructor(private fb: FormBuilder, private alertify: AlertifyService, private relationService: RelationService) { }

  ngOnInit() {
    this.createRelationForm();
<<<<<<< HEAD
    this.initializeUploader();
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + '/uploads',
      headers: [{ name: 'Content-Type', value: 'application/form-data' }],
      isHTML5: true,
      removeAfterUpload: true,
      autoUpload: true,
    });

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        console.log(status);
      }
=======
    this.dropdownList = [
      { "id": 8, "itemName": "relateionType1" },
      { "id": 2, "itemName": "relateionType2" },
      { "id": 3, "itemName": "relateionType3" },
      { "id": 4, "itemName": "relateionType4" },
      { "id": 5, "itemName": "relateionType5" },
      { "id": 6, "itemName": "relateionType6" },
      { "id": 7, "itemName": "relateionType7" },
      { "id": 1, "itemName": "其他" },

    ];
    this.dropdownSettings = {
      singleSelection: false,
      enableCheckAll: false,
      text: "請選擇關係種類",
      enableSearchFilter: false,
      classes: "relationTypeList"
>>>>>>> 479e4886d9a4ee45b0b0541aae12346cf9291864
    };
  }

  createRelationForm() {
    this.relationForm = this.fb.group({
      subjects: this.fb.array([this.fb.group({
        name: [''],
        idNumber: [''],
        memo: ['']
<<<<<<< HEAD
      }, { validator: this.checkValidate('name', 'idNumber')})]),
      objects: this.fb.array([this.fb.group({
        name: [''],
        idNumber: [''],
        relationType: ['', Validators.required ],
        memo: ['']
      }, { validator: this.checkValidate('name', 'idNumber')})]),
=======
      }, { validator: this.checkValidate('name', 'idNumber') })]),
      objects: this.fb.array([this.fb.group({
        name: [''],
        idNumber: [''],
        relationType: [[], Validators.required],
        memo: ['']
      }, { validator: Validators.compose([this.checkValidate('name', 'idNumber'), this.checkMemo('relationType', 'memo')]) })]),
>>>>>>> 479e4886d9a4ee45b0b0541aae12346cf9291864
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
<<<<<<< HEAD
      relationType: ['', Validators.required ],
      memo: ['']
    }, {validator: this.checkValidate('name', 'idNumber')}));
=======
      relationType: [[], Validators.required],
      memo: ['']
    }, { validator: Validators.compose([this.checkValidate('name', 'idNumber'), this.checkMemo('relationType', 'memo')]) }));
>>>>>>> 479e4886d9a4ee45b0b0541aae12346cf9291864
  }

  addSubject() {
    // add address to the list
    const control = <FormArray>this.relationForm.controls['subjects'];
    control.push(this.fb.group({
      name: [''],
      idNumber: [''],
      memo: ['']
<<<<<<< HEAD
    }, {validator: this.checkValidate('name', 'idNumber')}));
=======
    }, { validator: this.checkValidate('name', 'idNumber') }));
>>>>>>> 479e4886d9a4ee45b0b0541aae12346cf9291864
  }

  remove(i: number, target: string) {
    // remove address from the list
    const control = <FormArray>this.relationForm.controls[target];
    control.removeAt(i);
  }


  addRelation() {

    this.relation = Object.assign({}, this.relationForm.value);

<<<<<<< HEAD
    // this.relationService.addRelation(this.relation).subscribe(request => {
    //     this.alertify.success('relation created');
    //     this.clearForm();
    // }, error => {
    //     this.alertify.error('failed');
    // }  );
    console.log(this.relationForm.value);
=======
    this.relationService.addRelation(this.relation).subscribe(request => {
      this.alertify.success('relation created');
      this.clearForm()
    }, error => {
      this.alertify.error('failed');
    });
    // console.log(this.relationForm.value);
>>>>>>> 479e4886d9a4ee45b0b0541aae12346cf9291864
  }


  clearForm() {
    this.createRelationForm();
  }


  checkValidate(nameKey: string, idnumberKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let name = group.controls[nameKey];
      let idnumber = group.controls[idnumberKey];
      if (name.value.trim() === '' && idnumber.value.trim() === '') {
        return {
          checkValidate: true
        };
      }
    }
  }

  checkMemo(relationType: string, memo: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let r = group.controls[relationType];
      let m = group.controls[memo];
      if (r.value.map(e => e.itemName).includes("其他") && m.value.trim() === '') {
        return {
          checkMemo: true
        };

      }
    }
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let fileSize: number = fileList[0].size;
      if (fileSize <= 10485760) {
        let formData: FormData = new FormData();
        formData.append('Document', file);
        this.relationService.uplodaRelation(formData).subscribe(response => {
          if (response == 'success') {
            this.alertify.success(response);
          }
          else {
            this.alertify.error(response);
          }
        }, error => {
          this.alertify.error(error)
        }, () => {
          event.target.value =""
        });
      }
      else {
        this.alertify.error("File size is exceeded");
      }
    }
    else {
      this.alertify.error("Something went Wrong.");
    }
  }



}
