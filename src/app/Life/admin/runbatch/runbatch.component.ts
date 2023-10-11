import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { RunBatchProcessData } from './runbatch.interface';
import { RunBatchService } from './runbatch.service';

@Component({
  selector: 'app-runbatch',
  templateUrl: './runbatch.component.html',
  styleUrls: ['./runbatch.component.scss']
})


export class RunbatchComponent implements OnInit {

  public operation: string = 'actions'
  public batchCategory: any;
  public selectBatch: any
  public runBatchProcessData: RunBatchProcessData[] = []
  public selectedBatchCategory: any
  public selectBatchValue: any

  constructor(
    private route: ActivatedRoute,
    private runbatchService: RunBatchService,
    public snack: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    if (JSON.parse(localStorage.getItem('runBatchProcessDate'))) {
      this.runBatchProcessData = JSON.parse(localStorage.getItem('runBatchProcessDate'));
      localStorage.removeItem('runBatchProcessDate')
    }
    this.getData()
    this.route.paramMap.subscribe(
      params => {
        const oper = params.get('operation')
        this.operation = oper ? oper : 'actions';
        if (this.operation == "show" && this.runBatchProcessData.length == 0) {
          this.snack.open("You need to select some fields", "Close", { duration: 3000 });
          // this.router.navigate(['/life/admin/runbatch']);
        }
      }
    )
  }


  async getData() {
    try {
      this.batchCategory = await this.runbatchService.getCodeAndTitleByCodeSubgroup("BATCH_GROUP").toPromise()

    } catch (err) {
      this.snack.open("Error, couldn't fetch data", "Close", { duration: 3000 });
    }
  }


  onChangeBatchCategory(event: any) {
    this.runbatchService.getAllCodesAndDescriptionByGroup(event).subscribe(
      (res: any[]) => {
        this.selectBatch = res
      }
    )
  }


  show() {
    if (!this.selectBatchValue) {
      alert("You need to select a batch value");
      // this.router.navigate(['/life/admin/runbatch']);
      return
    }
    this.runbatchService.getAllBatchSetupProcess(this.selectBatchValue).subscribe(
      (res: any[]) => {
        localStorage.setItem('runBatchProcessDate', JSON.stringify(res));
        this.router.navigate(["show"],{relativeTo:this.route})

      }
    )

  }


  async runBatchProcess() {
    this.snack.open("Running Batch");
    try {
      await this.runbatchService.updateBatchProcess(this.runBatchProcessData).toPromise()
      this.snack.dismiss();
      this.snack.open("Batch has been run successfully!.", "Close", { duration: 3000 });

    } catch (error) {
      this.snack.dismiss();
      this.snack.open("Error running batch, Please try again later", "Close", { duration: 3000 });
    }
  }


}
