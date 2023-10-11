import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-screenshot2',
  templateUrl: './screenshot2.component.html',
  styleUrls: ['./screenshot2.component.scss']
})
export class Screenshot2Component implements OnInit {

  contactForm:FormGroup=new FormGroup({});
  contactDetails:any = FormArray;
  relationList:any = []
  constructor(private formService: ServiceService,public fb:FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      contactDetails: this.fb.array([])
      
    });
    this.onContactInfo()
    this.onContactInfo()
    this.onContactInfo()
    this.setRelationList()
  }
  get validation() { 
    /* console.log("validator",this.contactForm?.controls) */
    return this.contactDetails.controls[0].controls
    
  }

  onContactInfo(){
    this.contactDetails = this.contactForm.get('contactDetails') as FormArray;
    this.contactDetails.push(this.createContactData());
  }
  createContactData(): FormGroup {
    return this.fb.group({
      /* clientNo: ['', [Validators.required]], */
      name: ['', [Validators.required]],
      relationship: ['', [Validators.required]],
      phoneNo: ['', [Validators.required]],
      email: ['', [Validators.required]]
    });
  }
  onDeleteContact(index: any) {
    this.contactDetails?.removeAt(index);
  }
  get allContact() {
    /* console.log(this.contactForm.get('contactDetails') as FormArray) */
    return this.contactForm.get('contactDetails') as FormArray
  }
  onSubmit(){
    console.log(this.contactForm)
    this.formService.contactInfo(this.contactForm.value);
    let ss2 = { contactInfo: this.contactForm.value}
  }
  changeTab(tab:any){
    console.log("tab")
    this.formService.tabChange(tab)
    }

    setRelationList(){
      this.formService.getRelationList().subscribe( res => {
        this.relationList = res;
        console.log("relationList",res)
      })
    }
}
