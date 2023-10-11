import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CurrencyService } from 'src/app/Services/life/currency.service';
import { StorageService } from 'src/app/Services/storage.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { UwrtQuestionIndexService } from '../underwriting-questions-index/uwrtQuestIndex.service';
import { UnderwritingQuestionService } from './uwr-question.service';
import { CreateuwrQuestionList, UnderwritingQuestionclass, uwrQuestion, uwrQuestionList } from './uwrt-question';
declare var $: any;
@Component({
  selector: 'app-underwriting-questions-create',
  templateUrl: './underwriting-questions-create.component.html',
  styleUrls: ['./underwriting-questions-create.component.scss']
})
export class UnderwritingQuestionsCreateComponent implements OnInit {
  _responseType: any = {}; // properties are rowId's while their values are one of LV | YN | FD | FI . They indicate the response type for each row

  constructor(
    private route: ActivatedRoute,
    private uwrtQuestIndexService: UwrtQuestionIndexService,
    private uwrqService: UnderwritingQuestionService,
    private util: UtilityService,
    private localStorage: StorageService,
    private currencyService: CurrencyService,
  ) { }
  @ViewChild('questionForm') form: NgForm

  loadingText = ""
  loading = false
  editMode = true;
  showEditButton = false;
  disableTableSection = true;
  isSavingBasic = false;

  public setCategoryArray: any[] = []
  public triggerBasisArray: any[] = []
  public triggerStatusArray: any[] = []
  public ageBandFilterArray: any[] = []
  public companyFilterArray: any[] = []
  public sumAssuredFilterArray: any[] = []
  public conditionArray: any[] = []
  public currencyArray: any[] = []
  public responseTypeArray: any[] = []
  public valueUnitArray: any[] = []

  public uwQuestionCodeAndDesc: any[] = []
  public uwQuestionList: any[] = []
  public uwQuestionLV: any[] = []
  public unitValueList: any[] = []

  uwrQuestionData = new UnderwritingQuestionclass(
    new uwrQuestion(),
    [new CreateuwrQuestionList()]
  )

  ngOnInit(): void {
    this.uwrqService.getCodeAndTitleByCodeSubgroup("UW_QUEST_SET_CAT").subscribe((res: []) => { this.setCategoryArray = res })
    this.uwrqService.getCodeAndTitleByCodeSubgroup("UWR_SA_BASIS").subscribe((res: []) => { this.triggerBasisArray = res })
    this.uwrqService.getCodeAndTitleByCodeSubgroup("AGE_GROUP").subscribe((res: []) => { this.ageBandFilterArray = res })
    this.uwrqService.getCodeAndTitleByCodeSubgroup("SA_BASIS").subscribe((res: []) => { this.sumAssuredFilterArray = res })
    this.uwrqService.getCodeAndTitleByCodeSubgroup("CONDITION_BASIS").subscribe((res: []) => { this.conditionArray = res })
    this.currencyService.getCurrency().subscribe((res: []) => this.currencyArray = res)

    this.uwrqService.getCodeAndTitleByCodeSubgroup("UW_RESPONSE_TYPE").subscribe((res: []) => { this.responseTypeArray = res })
    this.uwrqService.getCodeAndTitleByCodeSubgroup("UNIT_VALUE ").subscribe((res: []) => { this.valueUnitArray = res })
    this.uwrqService.getCompanyCodeAndDescription().subscribe((res: []) => { this.companyFilterArray = res })

    this.uwrqService.getUWQuestionCodeAndDescription().subscribe((res: []) => { this.uwQuestionCodeAndDesc = res })
    this.uwrqService.getUWQuestionListCodeAndDescription().subscribe((res: []) => { this.uwQuestionList = res })
    this.uwrqService.getUWQuestionListCodeSubGroup().subscribe((res: []) => { this.uwQuestionLV = res })
    this.uwrqService.getCodeAndTitleByCodeSubgroup("UNIT_VALUE").subscribe((res: []) => { this.unitValueList = res })

    this.route.queryParams
      .subscribe(
        params => {
          const code = params.code
          const action = params.action
          if (code != null && action != null) {
            this.editMode = false; // if show or clone disable all fields until edit button is clicked
            this.showEditButton = true;
            this.fetchQuestions(action, code)
          }
        }
      )

  }

  fetchQuestions(action: string, code: string) {
    this.loading = true
    this.loadingText = "Fetching Under Writing Questions....."
    this.uwrtQuestIndexService
      .getUwrtQuestionCodeByCode(code)
      .subscribe((data: UnderwritingQuestionclass) => {
        this.loading = false
        this.uwrQuestionData.uwrQuestionLists = []
        this.uwrQuestionData.uwrQuestion = data?.uwrQuestion

        data?.uwrQuestionLists.map(question => {
          if (action == "clone") {
            question.uwrQuestionList.id
            if (question.uwrQuestionListResult != null)
              question.uwrQuestionListResult.id
          }
          question.uwrQuestionList.rowId = this.uwrQuestionData.uwrQuestionLists.length + 1

          if (question.uwrQuestionListResult != null) {
            question.uwrQuestionListResult.rowId = this.uwrQuestionData.uwrQuestionLists.length + 1
          }

          this.uwrQuestionData.uwrQuestionLists.push(question)
        })

        if (this.uwrQuestionData.uwrQuestionLists.length < 1) this.addUwrQuestionList()
      }, () => {
        this.loading = false
        this.util.notify("Error, Please try again later!", 0, 5000, "fail")
      })
  }

  compFilterChanged(event) {
    this.uwrqService.getStatusCode(this.uwrQuestionData.uwrQuestion.uwQuestSetCat, this.uwrQuestionData.uwrQuestion.companyCode).subscribe((res: []) => { this.triggerStatusArray = res })

  }

  deleteUwrQuestionList(i: number) {
    this.uwrQuestionData.uwrQuestionLists.splice(i, 1)

  }

  onActionModalView(i: number) {
    $('#actionModal_' + i).modal('show');
  }

  onExampleView(i: number) {
    $('#exampleModal_' + i).modal('show');
  }

  resDesCheckbox(checked: boolean, index: number) {
    if (!checked) {
      this.uwrQuestionData.uwrQuestionLists[index].uwrQuestionListResult.valueUnit = null
      this.uwrQuestionData.uwrQuestionLists[index].uwrQuestionListResult.valueFrom = null
      this.uwrQuestionData.uwrQuestionLists[index].uwrQuestionListResult.valueTo = null
      this.uwrQuestionData.uwrQuestionLists[index].uwrQuestionListResult.loading = null
    }

  }
  addUwrQuestionList(i?) {
    const data = new CreateuwrQuestionList()
    data.uwrQuestionList.rowId = this.uwrQuestionData.uwrQuestionLists.length + 1
    data.uwrQuestionListResult.rowId = this.uwrQuestionData.uwrQuestionLists.length + 1
    this.uwrQuestionData.uwrQuestionLists.push(data)
  }

  submitQuestion() {
    this.loading = true
    this.loadingText = "Saving Under Writing Questions....."

    // THIS DISABLED VALIDATION BECAUSE SOME FIELDS RETURN AN EMPTY ARRAY

    // if (this.form.invalid) {
    //   this.util.notify("Error, This form is invalid!", 0, 3000, "close")
    //   return
    // }
    this.uwrqService.createUnderWritingQuestion(this.uwrQuestionData)
      .subscribe((data: UnderwritingQuestionclass) => {
        this.util.info("Submitted successfully!", 1)

        this.uwrQuestionData.uwrQuestionLists = []
        this.uwrQuestionData.uwrQuestion = data?.uwrQuestion

        data.uwrQuestionLists.map(question => {
          question.uwrQuestionList.rowId = this.uwrQuestionData.uwrQuestionLists.length + 1
          question.uwrQuestionListResult.rowId = this.uwrQuestionData.uwrQuestionLists.length + 1
          this.uwrQuestionData.uwrQuestionLists.push(question)
        })

        if (this.uwrQuestionData.uwrQuestionLists.length < 1) this.addUwrQuestionList()
      },
        () => {
          this.util.info("Error, Please try again later!", 0)
        }).add(() => this.loading = false)

  }

  responseTypeChanged(event, item) {
    this._responseType[item.rowId] = event.target.value
  }

  isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  saveBasicSection() {
    this.isSavingBasic = true
    // format sum assured numbers properly
    // TODO fix the appCommafyNumber directive to not affect the control value itself
    const pattern = /[^\d]/g
    const uwrQuestionData = this.uwrQuestionData;
    if (this.isObjectEmpty(uwrQuestionData.uwrQuestionLists[0].uwrQuestionList)) {
      uwrQuestionData.uwrQuestionLists = []
    }
    uwrQuestionData.uwrQuestionLists.map(questions => {
      var res = questions.uwrQuestionListResult
      if (
        res.loading == null &&
        res.valueFrom == null &&
        res.valueTo == null &&
        res.valueUnit == null
      ) {
        delete questions.uwrQuestionListResult.rowId
      }
    })
    uwrQuestionData.uwrQuestion.lowerLimitSa = +this.uwrQuestionData.uwrQuestion.lowerLimitSa.toString().replace(pattern, '')
    uwrQuestionData.uwrQuestion.upperLimitSa = +this.uwrQuestionData.uwrQuestion.upperLimitSa.toString().replace(pattern, '')

    this.uwrqService.createUnderWritingQuestion(uwrQuestionData)
      .subscribe((data: UnderwritingQuestionclass) => {
        this.disableTableSection = false;
        this.util.info("Saved successfully!", 1, data.uwrQuestion.code)

        this.uwrQuestionData.uwrQuestionLists = []
        this.uwrQuestionData.uwrQuestion = data.uwrQuestion

        data?.uwrQuestionLists.map(question => {
          question.uwrQuestionList.rowId = this.uwrQuestionData.uwrQuestionLists.length + 1
          question.uwrQuestionListResult.rowId = this.uwrQuestionData.uwrQuestionLists.length + 1
          this.uwrQuestionData.uwrQuestionLists.push(question)
        })

        if (this.uwrQuestionData.uwrQuestionLists.length < 1) this.addUwrQuestionList()

        this.showEditButton = true;
        this.editMode = true; // ensure inputs are enabled;
      },
        () => {
          this.util.info("Error, Please try again later!", 0)
        }).add(() => this.isSavingBasic = false)
  }

  get anyListValueSource() {
    return this.uwrQuestionData.uwrQuestionLists.some((item) => (
      item.uwrQuestionList?.responseType == 'LV'
    ))
  }

  get anyQuestionHasButton() {
    return this.uwrQuestionData.uwrQuestionLists.some((item) => (
      item.uwrQuestionList?.responseType == 'LV' ||
      item.uwrQuestionList?.responseType == 'FD' ||
      item.uwrQuestionList?.responseType == 'FI'
    ))
  }
}
