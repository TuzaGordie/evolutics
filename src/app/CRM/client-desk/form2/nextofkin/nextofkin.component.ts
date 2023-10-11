import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Form2Service } from '../form2.service';

@Component({
  selector: 'app-nextofkin',
  templateUrl: './nextofkin.component.html',
  styleUrls: ['./nextofkin.component.scss']
})
export class NextofkinComponent implements OnInit {

  nextOfKinForm:FormGroup=new FormGroup({});
  contactDetails:any = FormArray;
  relationList:any = []
  constructor(private allFormService: Form2Service,public fb:FormBuilder) { }

  ngOnInit(): void {
    this.nextOfKinForm = this.fb.group({
      contactDetails: this.fb.array([])
      
    });
    this.onContactInfo()
    this.onContactInfo()
    this.setRelationList()
  }
  get validation() { 
    /* console.log("validator",this.nextOfKinForm?.controls)
    console.log("validator2",this.contactDetails.controls[0].controls) */
    return this.contactDetails.controls[0].controls 
   /*  return (<FormArray>this.fb.group.get('contactDetails')).controls[i].invalid; */
  }

  onContactInfo(){
    this.contactDetails = this.nextOfKinForm.get('contactDetails') as FormArray;
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
    return this.nextOfKinForm.get('contactDetails') as FormArray
  }
  onSubmit(){
    console.log(this.nextOfKinForm)
    this.allFormService.nextOfKinInfo(this.nextOfKinForm.value);
  }
  changeTab(tab:any){
    console.log("tab")
    this.allFormService.tabChange(tab)
    }

    setRelationList(){
      this.allFormService.getRelationList().subscribe( res => {
        this.relationList = res;
        console.log("relationList",res)
      })
    }
}
