import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BatchReceiptId, BatchReceiptReconcile } from 'src/app/Shared/models/cash/receipt';
import { UtilityService } from 'src/app/Services/utility.service';

@Component({
  selector: 'app-unreconcilied',
  templateUrl: './unreconcilied.component.html',
  styleUrls: ['./unreconcilied.component.scss']
})
export class UnreconciliedComponent implements OnInit {

  baseUrl = environment.apiBaseUrl + '/rest';
  unReconciledData: any[] = []


  isMasterSel = false;

  isChecked = false;
  loading = false
  loadingText = ""

  declineReason: string = ""
  authorizeReason: string = ""

  checkedList: any;
  checkedList2: any[] = [];

  declineReasons: any[] = []
  authroizeREasons: any[] = []

  userId: string = "user"

  batchReconcileInfo = new BatchReceiptId()
  batchReceiptReconcile = new BatchReceiptReconcile(
    this.userId,
    [this.batchReconcileInfo]
  )

  constructor(
    private util: UtilityService,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.loading = true
    this.loadingText = "Fetching unreconciled receipts...."
    this.api.get(this.baseUrl + "/receipt/reconciled/0")
      .subscribe((data: any) => {
        this.loading = false
        this.unReconciledData = data
      }, () => {
        this.loading = false
        this.util.notify("Internal server error.", 0)
      })

    this.api.get(`${this.baseUrl}/codes/sub/category/RECONCILE_REASON`)
      .subscribe((data: any) => {
        this.authroizeREasons = data
      })

    this.api.get(`${this.baseUrl}/codes/sub/category/UNRECONCILE_REASON`)
      .subscribe((data: any) => {
        this.declineReasons = data
      })
  }

  reconcileReceipt() {
    this.batchReceiptReconcile.batchReconcileInfo = []

    this.checkedList.map(checked => {
      this.batchReceiptReconcile.batchReconcileInfo.push({
        id: checked.id,
        reason: this.authorizeReason
      })
    })

    var receiptsInfo = this.batchReceiptReconcile.batchReconcileInfo.filter(batch => { return batch.id != null })

    this.batchReceiptReconcile.batchReconcileInfo = receiptsInfo

    console.log("BATCH:::", this.batchReceiptReconcile)

    this.loading = true
    this.loadingText = "Processing receipts...."
    this.api.post(`${this.baseUrl}/receipt/batch/reconcile`, this.batchReceiptReconcile)
      .subscribe(() => {
        this.loading = false
        setTimeout(() => {
          location.reload()
        }, 5000);
        this.util.info("Receipt reconciled successfully!", 1)
      }, () => {
        this.loading = false
        this.util.info("Internal server error!.", 0)
      })
  }

  declineReceiptReconciliation() {
    this.batchReceiptReconcile.batchReconcileInfo = []

    this.checkedList.map(checked => {
      this.batchReceiptReconcile.batchReconcileInfo.push({
        id: checked.id,
        reason: this.declineReason
      })
    })

    var receiptsInfo = this.batchReceiptReconcile.batchReconcileInfo.filter(batch => { return batch.id != null })

    this.batchReceiptReconcile.batchReconcileInfo = receiptsInfo

    this.loading = false
    this.loadingText = "Processing declined receipts...."
    this.api.post(`${this.baseUrl}/receipt/batch/cancel/reconcile`, this.batchReceiptReconcile)
      .subscribe(() => {
        this.loading = false
        setTimeout(() => {
          location.reload()
        }, 5000);
        this.util.info("Receipt reconciliation declined successfully!", 1)
      }, () => {
        this.loading = false
        this.util.info("Internal server error!.", 0)
      })
  }


  checkUncheckAll() {
    for (var i = 0; i < this.unReconciledData.length; i++) {
      this.unReconciledData[i].selected = this.isMasterSel;
    }
    this.getCheckedItemList();
  }

  isAllSelected(i: number) {
    console.log("SELECT:::", this.unReconciledData[i].selected)
    this.isMasterSel = this.unReconciledData.every(function (item: any) {
      return item.selected == true;
    })
    this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.checkedList = [];
    for (var i = 0; i < this.unReconciledData.length; i++) {
      if (this.unReconciledData[i].selected)
        this.checkedList.push({
          "id": this.unReconciledData[i].id,
          "clientName": this.unReconciledData[i].clientName,
          "selected": this.unReconciledData[i].selected
        });
    }
    this.checkedList2 = this.checkedList;
    console.log('authorizeList', JSON.stringify(this.checkedList));
  }

}
