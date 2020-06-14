import { Component } from '@angular/core';
import {Validators,FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {LoginServices} from './services/login.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  login = true;
  submitted = false;
  a={name:"User"}
  fileURL="";

  formGrp:FormGroup;
  constructor(private fb: FormBuilder, private ls: LoginServices){}
  ngOnInit(){
    this.formGrp = this.fb.group({
      'fullName': ['', [Validators.required]],
      'emailId':['', [Validators.required]],
      'mobile': ['', [Validators.required, Validators.minLength(10)]],
      'nationality':['', [Validators.required]],
      'file':[new FormControl(), [Validators.required]]
    });
  }

  fileUpload(event){
    // this.seletedFile = event.target.files[0];
    if (event.target.files && event.target.files.length > 0){
      let fileup= new FormData();
      fileup.append('fileUrl', event.target.files[0]);
      let test = fileup.get('fileUrl');
      console.log(test);
       this.ls.uploadFile(fileup).subscribe( (data: any) => {
        this.formGrp.controls['file'].setValue(data)
      });
    }
  }
  postUser(data){
    this.ls.postUser(data).subscribe( (item: any) =>{
      console.log(item)
      this.submitted = true
      this.fileURL = item.details.file
    })
  }

  viewFile(){
    console.log(this.fileURL)
    window.open(this.fileURL)
  }

}
