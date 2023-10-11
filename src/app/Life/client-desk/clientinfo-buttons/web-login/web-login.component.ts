import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FindClientService } from '../../service/find-client.service';

@Component({
  selector: 'app-web-login',
  templateUrl: './web-login.component.html',
  styleUrls: ['./web-login.component.scss'],
})
export class ClientWebLoginComponent implements OnInit {
  webLoginList: any = [];
  webLoginForm: FormGroup;
  validResult: string;

  constructor(
    public findClientService: FindClientService,
    private fb: FormBuilder,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    console.log('param id', id);
    this.setWebLogin(id);
    this.createForm();
  }
  setWebLogin(id: any) {
    this.findClientService.getWebLogin(id).subscribe((res) => {
      this.webLoginList = res;
      console.log('weblogin Info', res);
    });
  }

  createForm() {
    this.webLoginForm = this.fb.group({
      userName: ['', Validators.required],
      status: ['', Validators.required],
      language: [''],
      webAccess: [''],
      documents: [null],
      viewPolicies: [null],
      quotations: [null],
    });
  }

  onSave() {
    console.log('clicked save button');
  }
}
