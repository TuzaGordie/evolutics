import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { Observable, of } from 'rxjs';
import {tap, map, catchError } from 'rxjs/operators';
import { QuotationService } from 'src/app/General/services/quotation-service.service';

@Component({
  selector: 'g-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss']
})
export class GroupAssetComponent implements OnInit {
  faUpload = faUpload
  assetForm: FormGroup;
  assetNameFromCheck: string = '';
  referrerNameFromCheck: string = '';
  private nbofasset: number = 1;
  asset: string[] = [''];
  assets: FormArray
  branchCode: any
  fileName: any
  file: any
  private nbofMember: number = 1;

  constructor(private fb: FormBuilder, private qs: QuotationService) { }

  ngOnInit(): void {
    this.assets = this.fb.array([
      new FormGroup ({
        assetNo: new FormControl(null, Validators.required),
        proportion: new FormControl(100, [Validators.required, Validators.max(100), Validators.min(1)]),
      })
    ])
    this.assetForm = this.fb.group({
      assets: this.assets,
    })
  }
  get formValue() {
    return this.assetForm.value
  }

  findAsset(i){
    const num = this.assetForm.value.assets[i].assetNo
    console.log(num)
    this.qs.getAssetDetails(num).subscribe( data => {
      console.log(data)
      //this.asset[i] = data
      console.log(this.asset)
    })
    this.qs.getBranchCode(this.assetForm.value.assets[0].assetNo).subscribe(data => {
      console.log(data)
      this.branchCode = data ? data : ''
      this.assetForm.get('branchCode').setValue(this.branchCode.branchCode)
    })
    
  }

  upload(event:any){
    let file = event.target.files[0];
    console.log("imagefile",file)
    console.log("imagepath",file.name)
    this.fileName = file.name
    this.file = file
  }

  validateassetNo(control: AbstractControl): Observable<ValidationErrors | null> {
    this.assetNameFromCheck = ''
    return this.qs.getAssetDetails(control?.value).pipe(
      tap(data => {
        this.assetNameFromCheck = data.registrationNo
      }),
      map(data => {
        return data ? null : { valid: false }
      }),
      catchError(() => {
        this.assetNameFromCheck = ''
        return of({ valid: false })
      })
    );
  }
  validateReferrerCode(control: AbstractControl): Observable<ValidationErrors | null> {
    this.referrerNameFromCheck = ''
    return this.qs.getClientFullName(control?.value).pipe(
      tap(data => {
        this.referrerNameFromCheck = data as string
      }),
      map(data => {
        return data ? null : { valid: false }
      }),
      catchError(() => {
        this.assetNameFromCheck = ''
        return of({ valid: false })
      })
    );
  }



  assetCounter() {
    return new Array(this.nbofasset);
  }

  assetInc() {
    const b = new FormGroup({
      assetNo: new FormControl(null, Validators.required),
        proportion: new FormControl(100, [Validators.required, Validators.max(100), Validators.min(1)]),
    })
    this.asset.push('')
    this.assets.push(b)
  }

  memberCounter() {
    return new Array(this.nbofMember);
  }

  memberInc() {
    this.nbofMember = this.nbofMember + 1
  }

}
