import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'; 
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/Services/client.service';
import { UserService } from 'src/app/Services/user.service';
import { UtilityService } from 'src/app/Services/utility.service';

@Component({
  selector: 'app-create-user-index',
  templateUrl: './create-user-index.component.html',
  styleUrls: ['./create-user-index.component.scss'],
})
export class CreateUserIndexComponent implements OnInit {
  findClientForm = new FormGroup({
    clientNo: new FormControl(
      null,
      Validators.required,
      this.validateClient.bind(this)
    ),
    userCode:new FormControl()
  }); 
  message2: string;
  fullName: string=''; 
  userName: string=''; 

  constructor(
    public clientService: ClientService,
    private utilityS: UtilityService,
    private userService2: UserService,
    private router: Router,
    public route:ActivatedRoute,
  ) {}

  ngOnInit(): void {}

  async validateClient(control: FormControl) {
    return new Promise<any>((resolve) => {
      setTimeout(async () => {
        const val: string = control?.value;
        if (!val) return null; 
        this.fullName = null;
        this.message2 = null;
        try {
          this.fullName = await this.clientService
            .getClientNameByNum(val)
            .toPromise();
          if (!this.fullName) {
            this.message2 = 'This client number does not exist.';
            throw null;
          }
          const user = await this.userService2
            .checkIfClientExistsBy({ clientNo: val })
            .toPromise();
          if (user)
            this.message2 = 'This client number is already linked to a User';
        } catch (error) {
          console.log(error);
          this.message2 = this.message2 || 'An error occurred';
        } 

        resolve(this.message2 ? { invalid: true } : null);
      }, 1000);
    });
  }
  onNext() {
    if (this.findClientForm.valid) {
      this.router.navigate(['../'], {
        relativeTo: this.route,
        queryParams: { clientNo: this.findClientForm.value.clientNo },
      });
    } else
      this.utilityS.notify(
        'A valid Client Number is required to continue',
        2,
        3000
      );
  }
}
