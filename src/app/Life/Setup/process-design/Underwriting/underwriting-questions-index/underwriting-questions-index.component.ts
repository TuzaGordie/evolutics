import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/Services/storage.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { UwrtQuestionIndexService } from './uwrtQuestIndex.service';

@Component({
  selector: 'app-underwriting-questions-index',
  templateUrl: './underwriting-questions-index.component.html',
  styleUrls: ['./underwriting-questions-index.component.scss']
})
export class UnderwritingQuestionsIndexComponent implements OnInit {

  constructor(private uwrtQuestIndexService: UwrtQuestionIndexService, private router: Router, private route: ActivatedRoute, private util: UtilityService, private localStorage: StorageService) { }


  public questionCategoryArray: any[] = []
  public questionCategoryValue: string


  public questionSetCodeArray: any[] = []
  public questionSetCodeValue: string

  ngOnInit(): void {

    this.uwrtQuestIndexService.getUwrtQuestionCat()
      .subscribe((res: []) => {
        this.questionCategoryArray = res
      })
  }
  onChangeQuestionCategory(event: string) {
    this.uwrtQuestIndexService.getUwrtQuestionCodeByCat(this.questionCategoryValue)
      .subscribe((res: []) => {
        this.questionSetCodeArray = res

      })

  }


  show() {
    if (!this.questionSetCodeValue) return
    this.localStore("show")

  }
  clone() {
    if (!this.questionSetCodeValue) return
    this.localStore("clone")

  }

  localStore(action: string) {

    if (!this.questionSetCodeArray || !this.questionSetCodeValue) {
      this.router.navigate(["life/process-design/underwriting/Questions-index"])
      this.util.notify("Error, Please Fill all the required fields!", 0, 5000, "fail")
      return
    }

    if (this.questionSetCodeValue.length > 0) {
      this.router.navigate(
        ["../Questions-create"],
        {
          queryParams: {
            action: action,
            code: this.questionSetCodeValue
          },
          relativeTo: this.route
        }
      )
    } else {
      this.util.notify("Select Question Set Code to continue.", 2)
    }
  }


}
