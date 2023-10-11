import { Component, OnInit, ViewChild } from '@angular/core';
import { AgentService } from 'src/app/Services/agent.service';
import { BankService } from 'src/app/Services/cash/bank.service';
import { ReceiptService } from 'src/app/Services/cash/receipt.service';
import { DebitService } from 'src/app/Services/cash/debit.service';
import { PolicyService } from 'src/app/Services/cash/policy.service';
import { ProductService } from 'src/app/Services/cash/product.service';
import { CreateBatchReceipt, Receipt, ReceiptBatch } from 'src/app/Shared/models/cash/receipt';
import { CurrencyService } from 'src/app/Services/life/currency.service';
import { PayinMethodService } from 'src/app/Services/life/payout-method.service';
import { CodeService } from 'src/app/Services/code.service';
import { ClientService } from 'src/app/Services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReceiptUploadData } from 'src/app/Shared/models/cash/ReceiptUploadData';
import { CouponService } from 'src/app/Services/cash/coupon.service';
import { ApiService } from 'src/app/Services/api.service';
import { environment } from 'src/environments/environment';
import { ThemeService } from 'ng2-charts';
import { UtilityService } from 'src/app/Services/utility.service';
import { AgentFinderComponent } from 'src/app/General/quotation-desk/new-group-quotation-gb/modals/agent-finder/agent-finder.component';
import { PolicyFinderComponent } from 'src/app/Finance/shared/policy-finder/policy-finder.component';
import { QuoteFinderComponent } from 'src/app/Finance/shared/quote-finder/quote-finder.component';
import { CouponFinderComponent } from 'src/app/Finance/shared/coupon-finder/coupon-finder.component';
import { ClientFinderComponent } from 'src/app/General/quotation-desk/new-group-quotation-gb/modals/client-finder/client-finder.component';
import { PolicyDetailsModalComponent } from '../policy-details-modal/policy-details-modal.component';
import { BatchReceiptModalComponent } from '../batch-receipt-modal/batch-receipt-modal.component';

@Component({
  selector: 'app-create-new',
  templateUrl: './create-new.component.html',
  styleUrls: ['./create-new.component.scss']
})
export class CreateNewExpenseComponent implements OnInit {
  hide: boolean = false;
  hidecontent: boolean = false;

  baseUrl = environment.apiBaseUrl + '/rest';

  @ViewChild('content') content: any;
  @ViewChild('file') file: any;

  successMessage = false;
  warningMessage = false;
  errorMessage = false;
  showFileNameModal: boolean = false

  loading = false
  loadingText = ""
  isLoadingPolicyDetails = false

  action = ""

  ownerNamePolicy: string = "";
  ownerNameQuote: string = "";
  policyCodes: any[] = [];
  debitNotes: any[] = []
  currencies: any[] = []
  paymentMethods: any[] = []
  productCodes: any[] = []
  reasons: any[] = []
  bankAccs: any[] = []
  policyNoSuffixes: any[] = []
  bankCodes: any[] = []
  policy: any = {};
  policyDetailsExist: boolean = false;
  loanBalance: any = {};
  agent: string = ""
  clientName: string = ""
  batchFileEncoded: string = ""
  fileType: string = ""
  fileName: string = ""

  couponDisplay: string = ""

  isCouponNo = false;
  isQuoteNo = false;
  isAgentNo = false;
  isPolicyNo = false;

  connection = {
    creating: false,
    error: false
  };

  couponCurrency = ""

  receipt = new Receipt()
  receiptBatch = new ReceiptBatch()
  createBatchReceipt = new CreateBatchReceipt(
    this.receipt,
    [this.receiptBatch]
  )

  receiptUpload = new ReceiptUploadData(
    this.batchFileEncoded,
    this.fileType,
    this.fileName,
    this.receipt
  )

  constructor(
    private utilityService: UtilityService,
    private router: Router,
    private receiptService: ReceiptService,
    private productService: ProductService,
    private bankService: BankService,
    private debitService: DebitService,
    private policyService: PolicyService,
    private currencyService: CurrencyService,
    private agentService: AgentService,
    private payinMethodService: PayinMethodService,
    private codeService: CodeService,
    private clientService: ClientService,
    private couponService: CouponService,
    private route: ActivatedRoute,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.getPaymentMethod()
    this.getReason()
    this.getBankCodes()

    this.route.queryParams
      .subscribe(
        params => {
          const id = params.id
          const action = params.action
          if (id != null) {
            this.fetchReceipt(id, action)
          }
        }
      )
  }
  downloadTemplate() {
    // this.ho
    // const blob = document.cre
    // this.utilityService.downloader()
  }
  fetchReceipt(id: number, action: string) {
    this.loading = true
    this.loadingText = "Fetching Bank Transaction......."
    this.api.get(this.baseUrl + "/receipt/" + id)
      .subscribe((data: any) => {
        this.loading = false

        this.receipt = data
        this.action = action

        this.getCompanyBankAccs()
        if (this.receipt.policyNo != null) {
          this.getNameByPolicyNo()
        } else if (this.receipt.quoteNo != null) {
          this.getNameByQuoteNo()
        } else if (this.receipt.couponNo != null) {
          this.getPolicyDetailsByCouponNo()
        }

        this.sumGrossPremium()

        if (this.hide) {
          this.getCurrencies()
        } else {
          this.getProductValidCurrency()
        }

        this.getPolicyNoSuffix()
        this.getDebitNotes(this.receipt.policyNo, this.receipt.policyCode)

      }, () => {
        this.loading = false
        this.utilityService.notify("Internal server error.", 0, 5000)
      })
  }

  findCoupon() {
    this.router.navigateByUrl("/life/setups/code/currency/code/create")
  }

  getClientNameByClientNo() {
    if (this.receipt.clientNo?.length > 0)
      this.clientService.getClientNameByNum(this.receipt.clientNo)
        .subscribe((data: any) => {
          this.receipt.clientName = data
        })
  }

  getPolicyNoSuffix() {
    this.api.get(this.baseUrl + "/policy/group/list/policy/no/suffix/" + this.receipt.policyCode + "/" + this.receipt.policyNo)
      .subscribe((data: any) => {
        this.policyNoSuffixes = data
      })
  }

  updateRefCat() {
    if (this.receipt.refCat == "POL") {
      this.receipt.refNo += "_" + this.receipt.policyNoSuffix
    }
  }

  getPolicyDetailsByCouponNo() {
    if (this.receipt.couponNo?.length > 0)
      this.couponService.getCouponByCouponNo(this.receipt.couponNo)
        .subscribe((data: any) => {
          this.setCoupon(data)
        })
  }

  setCoupon(data) {
    this.receipt.policyCode = data?.policyCode
    this.receipt.policyNo = data?.policyNo
    this.receipt.refNo = this.receipt.couponNo
    this.receipt.refCat = "GRO"
    this.couponCurrency = data?.currency

    this.selectPolicyCode()

    this.api.get(this.baseUrl + "/policy/" + this.receipt.policyNo)
      .subscribe((data: any) => {
        this.receipt.productCode = data?.productCode
        this.receipt.productClass = data?.productClass
        this.receipt.policyStatus = data?.policyStatus
        this.couponDisplay = data?.policyNo + " - " + data?.policyCode + " - " + data?.ownerName

        this.getProductValidCurrency()
      })

    this.setPolicyCodesList(data?.policyNo)
  }

  setPolicyCodesList(policyNo) {
    this.policyService.getPolicyCodesByPolicyNo(policyNo)
      .subscribe((data: any) => {
        this.policyCodes = data
      })
  }
  getNameByQuoteNo() {
    if (this.receipt.quoteNo?.length > 0)
      this.policyService.getPolicyOwnersNameByQuoteNo(this.receipt.quoteNo)
        .subscribe((data: any) => {
          this.setQuote(data)
        })
  }

  setQuote(data) {
    this.ownerNameQuote = data?.ownerName
    this.receipt.quoteNo = data?.quoteNo
    this.receipt.policyCode = data?.policyCode
    this.receipt.policyNo = data?.policyNo
    this.receipt.productCode = data?.productCode
    this.receipt.productClass = data?.productClass
    this.receipt.policyStatus = data?.policyStatus
    this.receipt.refNo = this.receipt.quoteNo
    this.receipt.refCat = "QUO"


    this.getProductValidCurrency()
    this.selectPolicyCode()

    this.setPolicyCodesList(data?.policyNo)
  }

  getNameByPolicyNo() {
    if (this.receipt.policyNo?.length > 0)
      this.policyService.getPolicyOwnersNameByPolicyNo(this.receipt.policyNo)
        .subscribe((data: any) => {
          console.log(data);
          this.setPolicy(data)
        })
  }

  setPolicy(data) {
    this.ownerNamePolicy = data?.ownerName
    this.receipt.policyCode = data?.policyCode
    this.receipt.policyNo = data?.policyNo
    this.receipt.productCode = data?.productCode
    this.receipt.productClass = data?.productClass
    this.receipt.policyStatus = data?.policyStatus
    this.receipt.refNo = this.receipt.policyNo + "_" + this.receipt.policyCode
    this.receipt.refCat = "POL"

    this.getProductValidCurrency()
    this.selectPolicyCode()

    this.setPolicyCodesList(data?.policyNo)
    this.getPolicyDetails();
    this.getLoanBalance();
  }

  selectPolicyCode() {
    this.getPolicyNoSuffix()
    this.getDebitNotes(this.receipt.policyNo, this.receipt.policyCode)
    this.getPolicyDetails() // get policy details
  }

  getNameByPolicyNoInCreateBatchReceipt(i: number) {
    if (this.receipt.policyNo?.length > 0)
      this.policyService.getPolicyOwnersNameByPolicyNo(this.receipt.policyNo)
        .subscribe((data: any) => {
          this.createBatchReceipt.receiptBatches[i].clientName = data?.ownerName
        })
  }

  sumGrossPremium(): void {
    if (!this.hidecontent) {
      this.receipt.commDeduct = 0
      this.receipt.vatDeduct = 0
      this.receipt.whtDeduct = 0
      this.receipt.coinsDeduct = 0
      this.receipt.uwExpDeduct = 0
      this.receipt.netAmount = this.receipt.amount
    } else {
      // preceding + are used to cast each string value to number before addition
      this.receipt.netAmount = +this.receipt.amount + +this.receipt.commDeduct + +this.receipt.vatDeduct + +this.receipt.whtDeduct + +this.receipt.coinsDeduct + +this.receipt.uwExpDeduct
    }
  }

  getAgentByAgentNo() {
    if (this.receipt.agentNo?.length > 0)
      this.agentService.getAgentNameByAgentNo(this.receipt.agentNo)
        .subscribe((agentName: string) => {
          this.agent = agentName;
        })
  }

  getDebitNotes(policyNo: string, policyCode: string) {
    console.log("about to get debit notes")
    this.debitService.getDebitNotes(policyNo, policyCode)
      .subscribe((data: any) => {
        this.debitNotes = data
      })
  }

  getProductValidCurrency() {
    this.couponCurrency = ""
    this.api.get(this.baseUrl + "/product/valid/currency/" + this.receipt.productCode)
      .subscribe((data: any) => {
        this.currencies = data
      })
  }

  getCurrencies() {
    this.api.get(this.baseUrl + "/currency")
      .subscribe((data: any) => {
        this.currencies = data
      })
  }

  getPaymentMethod() {
    this.payinMethodService.getPayOutMethodCodesAndDesc()
      .subscribe((data: any) => {
        this.paymentMethods = data
      })
  }

  getReason() {
    this.codeService.getCodesByCodeSubGroup("PAYIN_REASON")
      .subscribe((data: any) => {
        this.reasons = data
      })
  }

  getCompanyBankAccs() {
    if (this.receipt.bankCode?.length > 0)
      this.bankService.getCompanyBankAccountsByBankCode(this.receipt.bankCode)
        .subscribe((data: any) => {
          this.bankAccs = data
        })
  }

  getBankCodes() {
    this.bankService.getBankCodes()
      .subscribe((data: any) => {
        this.bankCodes = data
      })
  }

  createClient() {
    this.router.navigateByUrl('/life/client-desk/create/individual')
  }

  trigger() {
    let element = document.getElementById('upload_file') as HTMLInputElement;
    element.click();
  }

  onFileSelected(fileInput: any) {
    //read file from input
    var file = fileInput.target.files[0];

    let reader: FileReader = new FileReader();
    reader.readAsText(file);

    reader.onload = (e) => {
      let csv = reader.result.toString();
      let allTextLines = csv.split("\r")
      let headers = allTextLines[0].split(',');
      let lines = [];
      let tarr = [];

      for (let i = 1; i < allTextLines.length; i++) {
        let data = allTextLines[i].split(',');
        if (data?.length === headers.length) {
          var rowObj = {}
          for (let j = 0; j < headers.length; j++) rowObj[headers[j]] = data[j]
          tarr.push(rowObj);
        }
      }

      for (let index = 0; index < tarr.length; index++) {
        var receipts = new ReceiptBatch()
        receipts.amount = parseFloat(tarr[index]["AMOUNT"])
        receipts.clientName = tarr[index]["FULL_NAME"]
        receipts.description = tarr[index]["NARRATION"]
        receipts.policyCode = tarr[index]["POLICY_CODE"]
        receipts.policyNo = tarr[index]["POLICY_NO"]
        receipts.reason = tarr[index]["REASON"]
        receipts.refNo = tarr[index]["POLICY_NO"] + "_" + tarr[index]["POLICY_CODE"]
        receipts.refCat = "POL"
        lines.push(receipts)
      }

      this.createBatchReceipt.receiptBatches = lines
      this.openBatchReceiptModal('UPLOAD')
      fileInput.target.value = null
    }
  }

  openBatchReceiptModal(mode: 'UPLOAD' | 'MANUAL'){
    this.utilityService.dialogOpener(
      BatchReceiptModalComponent,
      {
        data: {
          mode,
          receipt: this.receipt,
          receiptBatch: this.receiptBatch,
          createBatchReceipt: this.createBatchReceipt,
          receiptUpload: this.receiptUpload,
        }
      },
      (r)=>{

      }
    )
  }

  batchSaveReceipt() {
    if (this.createBatchReceipt.receiptBatches != undefined || this.createBatchReceipt.receiptBatches.length < 1)
      this.createBatchReceipt.receiptBatches.map(receipt => delete receipt.id)

    this.loading = true
    this.loadingText = "Batch Reciept upload in progress......."
    this.receiptService.batchSaveReceipt(this.createBatchReceipt)
      .subscribe((data: any) => {
        this.loading = false
        this.utilityService.notify("Batch receipt has been saved successfully!.", 1, 5000)
        this.connection.creating = false;
      }, () => {
        this.loading = false
        this.utilityService.notify("Internal server error.", 0, 5000)
      })
  }

  batchFileUploadReceipt() {
    this.loading = true
    this.loadingText = "Batch Receipt upload in progress........"
    this.receiptService.batchFileReceipt(this.receiptUpload)
      .subscribe((data: any) => {
        this.loading = false
        this.utilityService.notify("Batch receipt has been saved successfully!.", 1, 5000)
        this.connection.creating = false;
      }, () => {
        this.loading = false
        this.utilityService.notify("Internal server error.", 0, 5000)
      })
  }

  saveReciept() {
    this.loading = true
    this.loadingText = "Saving Bank Transaction........"
    this.receiptService.saveReceipt(this.receipt)
      .subscribe((data: any) => {
        this.loading = false
        this.utilityService.notify("Receipt has been saved successfully!.", 1, 5000)
        this.connection.creating = false;
      }, () => {
        this.loading = false
        this.utilityService.notify("Internal server error.", 0, 5000)
      })
  }

  postReciept() {
    if (this.hide) {
      if (this.receiptUpload.batchFileEncoded.length > 0) {
        this.batchFileUploadReceipt()
        return
      }

      this.batchSaveReceipt()
      return;
    }

    this.loading = true
    this.loadingText = "Posting Bank Transaction........"

    var saveId = this.receipt.id
    delete this.receipt.id

    this.receiptService.postReceipt(this.receipt)
      .subscribe((data: Receipt) => {

        this.connection.creating = false;

        if (this.action == "unposted") {
          this.receiptService.updateUnpostedReceiptToPosted(saveId)
            .subscribe(() => {
              this.loading = false
            }, () => { this.loading = false })
        } else this.loading = false

        this.utilityService.info("Bank Transaction Saved successfully!.", 1, data.receiptNo)

      }, (error) => {
        this.loading = false
        this.utilityService.info(error?.error?.message || "Internal server error.", 0)
      })
  }


  getPolicyDetails() {
    let policyNo = this.receipt.policyNo
    let policyCode = this.receipt.policyCode

    if (!policyNo || !policyCode) return;

    this.isLoadingPolicyDetails = true;

    this.policyService.getPolicy(policyNo, policyCode).subscribe(
      (data) => {
        this.policyDetailsExist = true
        this.policy = data;
        this.getPolicyClient(this.policy.ownerClientNo)
      },
      err => {
        this.policyDetailsExist = false;
        this.policy = {}
      }
    ).add(() => this.isLoadingPolicyDetails = false)
  }

  getLoanBalance() {
    this.connection.creating = true;

    let policyNo = this.receipt.policyNo
    let policyCode = this.receipt.policyCode

    this.policyService.getLoanBalance(policyNo, policyCode).subscribe((data) => {
      this.loanBalance = data;
      console.log(data);
      this.connection.creating = false;
    });
  }

  getPolicyClient(clientNo) {
    this.receipt.clientNo = clientNo
    this.clientService.getClientNameByNum(clientNo).subscribe(
      (res) => this.receipt.clientName = res
    )
  }

  checkCheckBoxvalue(value: boolean) {
    this.hide = value

    if (value == true) {
      this.getCurrencies()
    } else {
      this.getProductValidCurrency()
    }
  }

  checkCheckBox(value: boolean) {
    this.hidecontent = value
    this.sumGrossPremium()
  }

  disableFields() {
    this.isCouponNo = false;
    this.isQuoteNo = false;
    this.isAgentNo = false;
    this.isPolicyNo = false;

    if (this.receipt.couponNo?.length > 0) {
      this.isQuoteNo = true;
      this.isAgentNo = true;
      this.isPolicyNo = true;
    } else if (this.receipt.quoteNo?.length > 0) {
      this.isCouponNo = true;
      this.isAgentNo = true;
      this.isPolicyNo = true;
    } else if (this.receipt.agentNo?.length > 0) {
      this.isCouponNo = true;
      this.isQuoteNo = true;
      this.isPolicyNo = true;
    } else if (this.receipt.policyNo?.length > 0) {
      this.isAgentNo = true;
      this.isCouponNo = true;
      this.isQuoteNo = true;
    }
  }

  openCouponFinderModal() {
    this.utilityService.dialogOpener(
      CouponFinderComponent,
      { width: '60vw' },
      (coupon) => {
        this.receipt.couponNo = coupon.no;
        this.setCoupon(coupon);
        this.disableFields();
      }
    )
  }

  openQuoteFinderModal() {
    this.utilityService.dialogOpener(
      QuoteFinderComponent,
      { width: '60vw' },
      (quote) => {
        this.setQuote(quote)
        this.disableFields()
      }
    )
  }

  openAgentFinderModal() {
    this.utilityService.dialogOpener(
      AgentFinderComponent,
      { width: '60vw' },
      ({ agentNo, agentName }) => {
        this.receipt.agentNo = agentNo;
        this.agent = agentName;
        this.disableFields()
      }
    )
  }

  openPolicyFinderModal() {
    this.utilityService.dialogOpener(
      PolicyFinderComponent,
      { width: '60vw' },
      (policy) => {
        this.setPolicy(policy);
        this.disableFields()
      }
    )
  }

  openClientFinderModal() {
    this.utilityService.dialogOpener(
      ClientFinderComponent,
      { width: '60vw' },
      ({ clientNo, clientName }) => {
        this.receipt.clientNo = clientNo;
        this.receipt.clientName = clientName;
      }
    )
  }

  openPolicyDetailsModal() {
    this.utilityService.dialogOpener(
      PolicyDetailsModalComponent,
      {
        width: '30vw',
        data: {
          policy: this.policy,
        }
      },
      (r) => { }
    )
  }

  handleEmpty(field) {
    if (this[field]) return; // abort if field is not empty

    switch (field) {
      case 'receipt.couponNo':
        this.couponDisplay = '';
        break;
      case 'receipt.quoteNo':
        this.ownerNameQuote = '';
        break;
      case 'receipt.agentNo':
        this.agent = '';
        break;
      case 'receipt.policyNo':
        this.ownerNamePolicy = '';
    }
  }
}
