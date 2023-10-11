import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';

@Component({
  selector: 'app-find-provider',
  templateUrl: './find-provider.component.html',
  styleUrls: ['./find-provider.component.scss']
})
export class FindProviderComponent implements OnInit {
  findProviderForm: FormGroup;
  attemptedEmptySearch: boolean;
  constructor(
    public route: ActivatedRoute,
    public uS: UtilityService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.findProviderForm = new FormGroup({
      providerName: new FormControl(
        null,
        Validators.required,
        // null,
       // this.clientService.validateClientNo.bind(this)
      ),
    });
  }

  onNext() {
    console.log(this.findProviderForm);
    console.log('id', this.findProviderForm.value.providerName);

    if (this.findProviderForm.value.providerName) {
        this.router.navigate(['../view-provider'], {
          relativeTo: this.route,
          queryParams: { providerDetails: this.findProviderForm.value.providerName },
        });
    }

  }

  onSearch() {
    this.router.navigate(
      ['../view-provider'],
      {relativeTo: this.route,
        queryParams: {...this.findProviderForm.value}
      }
    );
  }

}
