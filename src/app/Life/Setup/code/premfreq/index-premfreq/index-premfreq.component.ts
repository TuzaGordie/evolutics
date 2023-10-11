import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeService } from 'src/app/Services/code.service';
import { PremFreqService } from 'src/app/Services/life/premium-frequency.service';

@Component({
  selector: 'app-index-premfreq',
  templateUrl: './index-premfreq.component.html',
  styleUrls: ['./index-premfreq.component.scss'],
})
export class IndexCodePremiumFrequencyComponent implements OnInit {
  premFreqs: any[] = [];
  premfreqCode: string = '';

  message = {
    success: false,
    warning: false,
    error: false,
  };

  constructor(
    private codeService: CodeService,
    public router: Router,public route:ActivatedRoute,
    private premFreqService: PremFreqService,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getPremFreqCodes();
  }

  getPremFreqCodes() {
    this.codeService
      .getCodesByCodeSubGroup('FREQUENCY')
      .subscribe((data: any) => {
        this.premFreqs = data;
      });
  }

  show(): void {
    this.snack.open("Processing.....", "Close", { duration: 5000 })
    if (this.premfreqCode) {
      this.premFreqService.getPremiumFreqByPremFreq(this.premfreqCode)
        .subscribe((data: any) => {
          this.snack.dismiss()
          localStorage.setItem('showPremiumFreq', JSON.stringify(data)); 
          this.router.navigate(['../create-premfreq'],{relativeTo:this.route});
        },
          (error: any) => {
            this.snack.dismiss()
            this.snack.open(error?.error?.error, "Close", { duration: 5000 })
          })
    } else {
      this.snack.dismiss()
      this.message.error = true;
    }
  }

}
