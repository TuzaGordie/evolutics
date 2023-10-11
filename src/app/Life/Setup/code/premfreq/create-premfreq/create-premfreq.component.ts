import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CodeService } from 'src/app/Services/code.service';
import { PremFreqService } from 'src/app/Services/life/premium-frequency.service';
import { PremFreq } from 'src/app/Shared/models/life/setup/premium-freq/PremiumFreq';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-premfreq',
  templateUrl: './create-premfreq.component.html',
  styleUrls: ['./create-premfreq.component.scss'],
})
export class CreateCodePremiumFrequencyComponent implements OnInit {

  @ViewChild('f') form: any;

  premFreqs: any[] = []
  premFreq = new PremFreq()

  showEditButton: boolean = false;
  editMode: boolean = true;

  constructor(
    private codeService: CodeService,
    private premFreqService: PremFreqService,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getPremFreqCodes()

    let showPremiumFreq = JSON.parse(localStorage.getItem("showPremiumFreq"))

    if (showPremiumFreq != null) {
      this.premFreq = showPremiumFreq
      localStorage.removeItem("showPremiumFreq")
    }
  }

  getPremFreqCodes() {
    this.codeService.getCodesByCodeSubGroup("FREQUENCY")
      .subscribe((data: any) => {
        this.premFreqs = data
      })
  }

  createPremFreq() {
    if (this.form.valid) {
      this.snack.open("Process....", "Close", { duration: 5000 })
      this.premFreq.createdBy = environment.user?.userDetails.username;
      console.log("this.premFreq before posting: ", this.premFreq)
      this.premFreqService.createPremFreq(this.premFreq)
        .subscribe((data: any) => {
          this.snack.dismiss()
          this.snack.open("Premium frequency created successfully!.", "Close", { duration: 5000 })
          // switch to edit mode
          this.showEditButton = true;
          this.editMode = false;
        },
          (error: any) => {
            this.snack.dismiss()
            this.snack.open(error?.error?.error, "Close", { duration: 5000 })
          })
    } else {
      this.snack.dismiss()
      this.snack.open("Kindly fill all required fields to continue!.", "Close", { duration: 5000 })
    }

  }
}
