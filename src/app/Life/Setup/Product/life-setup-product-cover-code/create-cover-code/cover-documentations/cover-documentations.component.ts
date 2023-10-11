import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeService } from 'src/app/Services/code.service';
import { CompanyService } from 'src/app/Services/life/company.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { FindProductService } from '../../../service/find-product.service';
import { CreateCoverCode, Documentations } from '../../cover-code';
import { CoverService } from '../../cover-service.service';

@Component({
  selector: 'app-cover-documentations',
  templateUrl: './cover-documentations.component.html',
  styleUrls: ['./cover-documentations.component.scss']
})
export class CoverDocumentationsComponent implements OnInit {

  @Input() createCoverCode: CreateCoverCode;
  @Input() action: string;  @ViewChildren('inp') inputs:QueryList<any>;
  @Input() coverCode: string

  eventTypeList: any = []
  events: any[] = [[]]
  languagesList: any = []
  actionsList: any = []
  documentationCategoryList: any = []
  docCodeList: any[] = [[]]
  conditionsList: any = []

  constructor(
    public findProductService: FindProductService,
    private activatedRoute: ActivatedRoute,
    private codeService: CodeService,
    private router: Router,
    private util: UtilityService,
    private companyService: CompanyService,
    public coverService: CoverService
  ) { }
  ngAfterViewInit(): void {
    this.coverService.disableInputs(this.inputs);
  }
  ngOnInit(): void {
    this.setEventType();
    this.setLanguauge();
    this.setAction();
    this.setDocumentCat();
    this.setCondition();
    // this.setEventList()  

    if (!this.coverService.isCreate) {
      this.findProductService.getDocumentation(this.coverCode)
        .subscribe((data: Documentations[]) => {
          this.createCoverCode.documentations = []

          if(this.createCoverCode.documentations.length < 1) {
            this.createCoverCode.documentations = [new Documentations()]
            return
          }

          data.map((documentations) => {
            if (this.action == 'clone') delete documentations.id;
            documentations.rowId =
              this.createCoverCode.documentations.length + 1;
            this.createCoverCode.documentations.push(documentations);
          });
          this.coverService.disableInputs(this.inputs);
        })
    }

    this.createCoverCode.documentations.map((doc, i) => {
      if (doc.eventType != null)
        this.setEventTypeParam(i)

      if (doc.action != null && doc.documentCategory != null)
        this.getDocCodesByCat(i)
    })
  }

  @Input() loading = false
  @Input() loadingText = ""

  saveDocumentation() {
    this.loading = true
    this.loadingText = "Saving Cover Documentation...."
    this.createCoverCode.documentations.map(docu => {
      docu.code = this.createCoverCode.basic.basic.code
    })
    this.coverService.saveDocumentations(this.createCoverCode.documentations)
      .subscribe((data: Documentations[]) => {
        this.loading = false
        this.util.notify("Cover Documentation saved successfully!.")
        this.createCoverCode.documentations = []

        data.map((doc, i) => {
          doc.rowId = this.createCoverCode.documentations.length + 1
          this.createCoverCode.documentations.push(doc)

          if (doc.eventType != null)
            this.setEventTypeParam(i)

          if (doc.action != null && doc.documentCategory != null)
            this.getDocCodesByCat(i)
        })
      }, () => {
        this.util.notify("Unable to save cover documentation!.", 0)
        this.loading = false
      })
  }

  setEventTypeParam(i: number) {
    this.findProductService.getEventListByGroup(this.createCoverCode.documentations[i].eventType)
      .subscribe((data: any[]) => {
        this.events[i] = data
      })
  }

  // setEventList() {
  //   this.findProductService.getEventList()
  //     .subscribe((data: any) => {
  //       this.events = data
  //     })
  // }

  getDocCodesByCat(i: number) {
    // this.docCodeList[i] = [[]]
    if (this.createCoverCode.documentations[i].action == "TC")
      this.findProductService.getDocCodesByCat(this.createCoverCode.documentations[i].documentCategory)
        .subscribe((data: any) => {
          this.docCodeList[i] = data

          console.log("DOCUMENT: ", data)
        })

    if (this.createCoverCode.documentations[i].action == "TW")
      this.findProductService.getWorkFlowTaskByCat(this.createCoverCode.documentations[i].documentCategory)
        .subscribe((data: any) => {
          this.docCodeList[i] = data

          console.log("DOCUMENT: ", data)
        })
  }

  setCondition() {
    this.findProductService.getCondition().subscribe((res) => {
      this.conditionsList = res;
      //console.log('Conditions list', res);
    });
  }

  setEventType() {
    this.findProductService.getEventType().subscribe((res) => {
      this.eventTypeList = res;
      //console.log('event type list', res);
    });
  }

  setLanguauge() {
    this.findProductService.getLanguauge().subscribe((res) => {
      this.languagesList = res;
      //console.log('Languages list', res);
    });
  }

  setAction() {
    this.findProductService.getAction().subscribe((res) => {
      this.actionsList = res;
      //console.log('Actions list', res);
    });
  }

  setDocumentCat() {
    this.codeService.getCodesByCodeSubGroup("DOCUMENT_CATEGORY").subscribe((res) => {
      this.documentationCategoryList = res;
      //console.log('Documentation category list', res);
    });
  }

  addNewDocumentationRow(i) {
    var docu = new Documentations()
    docu.rowId = this.createCoverCode.documentations.length + 1
    this.createCoverCode.documentations.splice(i,0,docu)
  }

  async removeDocumentation(i: number) {
    if (this.createCoverCode.documentations[i].id != null) {
      if (await this.util.confirm("Do you want to delete this Documentation?")) {
        this.findProductService.removeDocumentation(this.createCoverCode.documentations[i].id)
          .subscribe(
            () => {
              this.util.notify("Documentation deleted successfully", 1)
              this.createCoverCode.documentations.splice(i, 1)
            },
            () => this.util.notify("Unable to delete Documentation!.", 0)
          )
      }
    } else
      this.createCoverCode.documentations.splice(i, 1)
  }

}
