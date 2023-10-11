import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lifeadminusermenu',
  templateUrl: './lifeadminusermenu.component.html',
  styleUrls: ['./lifeadminusermenu.component.scss']
})
export class CRMSadminusermenuComponent implements OnInit {

  templateMenu: {name: string,active: boolean} [] =  [
    {name:'Details',active: true}, 
    {name:'Agent Desk',active: false}, 
    {name:'Quotation Desk',active: false}, 
    {name:'Policy Desk',active: false},
    {name:'Group Policy',active: false},
    {name:'Workflow',active: false},
    {name:'Payments',active: false},
    {name:'Set-Ups',active: false},
    {name:'Administration',active: false},
    {name:'User',active: false},
  ]

  userMenuContent : {  menuName : string,subMenuName : string} [] = []
  activeUserMenuContent : {  menuName : string,subMenuName : string} [] = []

  operation: string = ''
  tab: string = 'Details'


  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        const oper = params.get('operation')
        this.operation = oper ? oper : 'actions';
      }
    )

    this.userMenuContent = [
      { menuName: 'Agent Desk', subMenuName: 'Overview' },
      { menuName: 'Agent Desk', subMenuName: 'Find Agent' },
      { menuName: 'Agent Desk', subMenuName: 'Create New Individual Agent' },
      { menuName: 'Agent Desk', subMenuName: 'Create New Corporate Agent' },
      { menuName: 'Agent Desk', subMenuName: 'View Documents' },
      { menuName: 'Agent Desk', subMenuName: 'View Endorsements' },
      { menuName: 'Agent Desk', subMenuName: 'View WebLogin' },
      { menuName: 'Agent Desk', subMenuName: 'View AgentLoan' },
      { menuName: 'Agent Desk', subMenuName: 'View Commission Record' },
      { menuName: 'Agent Desk', subMenuName: 'View Production' },
      { menuName: 'Agent Desk', subMenuName: 'Add Documents' },
      { menuName: 'Agent Desk', subMenuName: 'Make Endorsement' },
      { menuName: 'Agent Desk', subMenuName: 'Create Workflows' },

      { menuName: 'Client Desk', subMenuName: 'Overview' },
      { menuName: 'Client Desk', subMenuName: 'Find Agent' },
      { menuName: 'Client Desk', subMenuName: 'Create New Individual Agent' },
      { menuName: 'Client Desk', subMenuName: 'Create New Corporate Agent' },
      { menuName: 'Client Desk', subMenuName: 'View Documents' },
      { menuName: 'Client Desk', subMenuName: 'View Policies' },
      { menuName: 'Client Desk', subMenuName: 'View Workflows' },
      { menuName: 'Client Desk', subMenuName: 'View Production' },
      { menuName: 'Client Desk', subMenuName: 'View Documents' },
      { menuName: 'Client Desk', subMenuName: 'Edit Documents' },
      { menuName: 'Client Desk', subMenuName: 'Make Documents' },
      { menuName: 'Client Desk', subMenuName: 'Edit Workflows' },
      { menuName: 'Client Desk', subMenuName: 'Edit Relationships' },

      { menuName: 'Quotation Desk', subMenuName: 'Overview' },
      { menuName: 'Quotation Desk', subMenuName: 'Find Quote' },
      { menuName: 'Quotation Desk', subMenuName: 'Create New Individual Quote' },
      { menuName: 'Quotation Desk', subMenuName: 'Create New Group Quote' },
      { menuName: 'Quotation Desk', subMenuName: 'View Pricing' },
      { menuName: 'Quotation Desk', subMenuName: 'Edit Quotation' },
      { menuName: 'Quotation Desk', subMenuName: 'Covert Quote to Policy' },
      { menuName: 'Quotation Desk', subMenuName: 'Edit Pricing' },
      { menuName: 'Quotation Desk', subMenuName: 'Generate Quote' },
      { menuName: 'Quotation Desk', subMenuName: 'Authorise Quote' },

      { menuName: 'Policy Desk', subMenuName: 'Overview' },
      { menuName: 'Policy Desk', subMenuName: 'Find Policy' },
      { menuName: 'Policy Desk', subMenuName: 'View Workflows' },
      { menuName: 'Policy Desk', subMenuName: 'View Documents' },
      { menuName: 'Policy Desk', subMenuName: 'View Reinsurance' },
      { menuName: 'Policy Desk', subMenuName: 'View Pricing' },
      { menuName: 'Policy Desk', subMenuName: 'View Underwriting' },
      { menuName: 'Policy Desk', subMenuName: 'View Commissions' },
      { menuName: 'Policy Desk', subMenuName: 'View Future Activity' },
      { menuName: 'Policy Desk', subMenuName: 'View Suspense Inwards' },
      { menuName: 'Policy Desk', subMenuName: 'View Peril' },
      { menuName: 'Policy Desk', subMenuName: 'View Pricing' },
      { menuName: 'Policy Desk', subMenuName: 'View Workflows' },
      { menuName: 'Policy Desk', subMenuName: 'View Commissions' },
      { menuName: 'Policy Desk', subMenuName: 'View Future Activity' },
      { menuName: 'Policy Desk', subMenuName: 'View Peril' },
      { menuName: 'Policy Desk', subMenuName: 'View Relationships' },
      { menuName: 'Policy Desk', subMenuName: 'View Payment Received' },
      { menuName: 'Policy Desk', subMenuName: 'View Payment Outwards' },
      { menuName: 'Policy Desk', subMenuName: 'View Endorsements' },
      { menuName: 'Policy Desk', subMenuName: 'Make Policy Accounting' },
      { menuName: 'Policy Desk', subMenuName: 'Make Workflows' },
      { menuName: 'Policy Desk', subMenuName: 'Add Documents' },
      { menuName: 'Policy Desk', subMenuName: 'Make Faculative Reinsurance' },
      { menuName: 'Policy Desk', subMenuName: 'Edit Pricing' },
      { menuName: 'Policy Desk', subMenuName: 'Make Renewal' },
      { menuName: 'Policy Desk', subMenuName: 'Make Commission Adjustments' },
      { menuName: 'Policy Desk', subMenuName: 'Make Claim' },

      { menuName: 'Group Policy', subMenuName: 'Overview' },
      { menuName: 'Group Policy', subMenuName: 'Find Group' },
      { menuName: 'Group Policy', subMenuName: 'View Workflows' },
      { menuName: 'Group Policy', subMenuName: 'View Documents' },
      { menuName: 'Group Policy', subMenuName: 'View Pricing' },
      { menuName: 'Group Policy', subMenuName: 'View Underwriting' },
      { menuName: 'Group Policy', subMenuName: 'View Commission' },
      { menuName: 'Group Policy', subMenuName: 'View Future Activity' },
      { menuName: 'Group Policy', subMenuName: 'View Peril' },
      { menuName: 'Group Policy', subMenuName: 'View Payment Outwards' },
      { menuName: 'Group Policy', subMenuName: 'View Suspense Inwards' },
      { menuName: 'Group Policy', subMenuName: 'View Uncovered SAR' },
      { menuName: 'Group Policy', subMenuName: 'View Pending Payments Outwards' },
      { menuName: 'Group Policy', subMenuName: 'View Payments Received' },
      { menuName: 'Group Policy', subMenuName: 'Make Endorsements' },
      { menuName: 'Group Policy', subMenuName: 'View Relationships' },
      { menuName: 'Group Policy', subMenuName: 'View Payment Received' },
      { menuName: 'Group Policy', subMenuName: 'View Endorsements' },
      { menuName: 'Group Policy', subMenuName: 'Make Policy Accounting' },
      { menuName: 'Group Policy', subMenuName: 'Make Workflows' },
      { menuName: 'Group Policy', subMenuName: 'Add Documents' },
      { menuName: 'Group Policy', subMenuName: 'Make Faculative Reinsurance' },
      { menuName: 'Group Policy', subMenuName: 'Edit Pricing' },
      { menuName: 'Group Policy', subMenuName: 'Make Renewal' },
      { menuName: 'Group Policy', subMenuName: 'Make Commission Adjustments' },
      { menuName: 'Group Policy', subMenuName: 'Make Claim' },
      { menuName: 'Workflow', subMenuName: 'Overview' },
      { menuName: 'Workflow', subMenuName: 'Find Workflow Task' },
      { menuName: 'Workflow', subMenuName: 'Create New Task' },
      { menuName: 'Workflow', subMenuName: 'Create New Schedule' },
      { menuName: 'Payments', subMenuName: 'Create Coupon' },
      { menuName: 'Payments', subMenuName: 'Authorise Coupon' },
      { menuName: 'Payments', subMenuName: 'Pending Payments Outward' },
      { menuName: 'Payments', subMenuName: 'Authorise Payments Outward' },
      { menuName: 'Payments', subMenuName: 'Authorise Inwards Suspense Switch' },
      { menuName: 'Payments', subMenuName: 'Authorise Policy Accounts' },
      { menuName: 'Payments', subMenuName: 'Authorise Commission Adjustments' },

      { menuName: 'Set-Ups', subMenuName: 'Products' },
      { menuName: 'Set-Ups', subMenuName: 'Screens' },
      { menuName: 'Set-Ups', subMenuName: 'Translations' },
      { menuName: 'Set-Ups', subMenuName: 'Codes' },
      { menuName: 'Set-Ups', subMenuName: 'Events' },
      { menuName: 'Set-Ups', subMenuName: 'Correspondence' },
      { menuName: 'Set-Ups', subMenuName: 'Process Design' },
      { menuName: 'Set-Ups', subMenuName: 'Task Set Up' },
      { menuName: 'Set-Ups', subMenuName: 'Appraisal' },
      { menuName: 'Set-Ups', subMenuName: 'Claims' },
      { menuName: 'Set-Ups', subMenuName: 'Tarrifs' },
      { menuName: 'Set-Ups', subMenuName: 'Underwriting' },
      { menuName: 'Set-Ups', subMenuName: 'Reinsurance' },
      { menuName: 'Set-Ups', subMenuName: 'Agents' },
      { menuName: 'Set-Ups', subMenuName: 'Rates' },
      { menuName: 'Set-Ups', subMenuName: 'Organisation' },
      { menuName: 'Set-Ups', subMenuName: 'Address' },
      { menuName: 'Set-Ups', subMenuName: 'Accounts' },
      { menuName: 'Set-Ups', subMenuName: 'Authorise Commission Adjustments' },

      { menuName: 'Administration', subMenuName: 'User Group' },
      { menuName: 'Administration', subMenuName: 'User Menu' },
      { menuName: 'Administration', subMenuName: 'Dates' },
      { menuName: 'Administration', subMenuName: 'Create Batch' },
      { menuName: 'Administration', subMenuName: 'Run Batch' },

      { menuName: 'User', subMenuName: 'Logout' },
      { menuName: 'User', subMenuName: 'Screen Colour' },
      { menuName: 'User', subMenuName: 'Menu Layout' },
      { menuName: 'User', subMenuName: 'Language' },
      { menuName: 'User', subMenuName: 'Break' },
      { menuName: 'User', subMenuName: 'Out of Office' },

    ]
  }

  activate(name: string) {
    this.templateMenu.forEach(m=>{
      m.active = (m.name === name)? true : false
    }
    )
    this.tab = name
    this.activeUserMenuContent = this.userMenuContent.filter(m=>m.menuName === this.tab) 
  }

}
