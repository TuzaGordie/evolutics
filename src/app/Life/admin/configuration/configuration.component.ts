import { Component, OnInit } from '@angular/core';
import { CodeService } from 'src/app/Services/code.service';
import { CompanyService } from 'src/app/Services/life/company.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { Config, ConfigLang, CreateConfig } from './config';
import { ConfigService } from './config.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  loadingText = ""
  loading = false

  config = new Config()
  configLanguage = new ConfigLang()
  createConfig = new CreateConfig(
    0,
    this.config,
    [this.configLanguage]
  )

  modalConfig = new CreateConfig(
    0,
    this.config,
    [this.configLanguage]
  )

  rowNum: number = -1

  finalConfig = [this.createConfig]

  companies: any[] = []
  docPrinters: any[] = []
  languages: any[] = []
  screenColors: any[] = []


  constructor(
    private codeService: CodeService,
    private companyService: CompanyService,
    private utility: UtilityService,
    private configService: ConfigService
  ) { }

  ngOnInit(): void {
    this.companyService.getCompanyCodeAndDesc()
      .subscribe((data: any) => {
        this.companies = data
      })

    this.codeService.getCodesByCodeSubGroup("LANGUAGE")
      .subscribe((data: any) => {
        this.languages = data
      })

    this.codeService.getCodesByCodeSubGroup("SCREEN_COLOUR")
      .subscribe((data: any) => {
        this.screenColors = data
      })

    this.codeService.getCodesByCodeSubGroup("DOC_PRINTER_OPTION")
      .subscribe((data: any) => {
        this.docPrinters = data
      })

  }

  storeModal(){
    this.finalConfig[this.rowNum] = this.modalConfig
  }

  fetchConfigByCompanyCode(i: number) {
    this.configService.fetchConfigByCompanyCode(this.finalConfig[i].config.code)
      .subscribe((data: any) => {
        this.finalConfig[i] = data
      })
  }

  addConfig() {
    let config = new CreateConfig(
      this.finalConfig.length + 1,
      this.config,
      [this.configLanguage]
    )
    this.finalConfig.push(config)
  }

  deleteConfig(i: number) {
    this.finalConfig.splice(i, 1)
  }

  addLanguage() {
    let lang = new ConfigLang()
    lang.rowId = this.createConfig.configLanguage.length + 1
    this.createConfig.configLanguage.push(lang)
  }

  deleteLanguage(i: number) {
    if (this.createConfig.configLanguage[i].id == null)
      this.createConfig.configLanguage.splice(i, 1)
    else {
      if (this.utility.confirm("Do you want to delete this language?")) {
        this.configService.deleteLanguage(this.createConfig.configLanguage[i].id)
          .subscribe(
            () => {
              this.utility.notify("Config language deleted successfully!.", 1)
            },
            () => {
              this.utility.notify("Unable to delete config language!.", 0)
              return
            }
          )
      }
    }
  }

  fillConfig(i: number) {
    this.modalConfig = this.finalConfig[i]
    this.modalConfig.rowId = i
    this.rowNum = i
  }

  saveConfig() {
    this.loading = true
    this.loadingText = "Saving Configuration...."
    this.configService.saveConfig(this.finalConfig)
      .subscribe((data: any) => {
        this.loading = false
        this.finalConfig = data
        this.utility.notify("Configuration saved successfully!.", 1)
      }, () => {
        this.loading = false
        this.utility.notify("Internal server error!.", 0)
        return
      })
  }

}
