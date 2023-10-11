import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { faQuestionCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cost-type',
  templateUrl: './cost-type.component.html',
  styleUrls: ['./cost-type.component.scss']
})
export class CostTypeComponent implements OnInit {

  faQuestionCircle = faQuestionCircle
  styleCheck = 30
  thead = ['No',"Name","Type","Totalling","Cost Classification","G/L Account Range","Net Change","Cost Center Code","Cost Object Code","Combine Entries","Budget Amount","Block",'New Page','Blank Line', 'Balance To Allocate']
  tdata = [
      { 
        No: '---',
        Name: '---',
        type:'----',
        totalling:'---',
        costClass:'---',
        accountRange:'---',
        nextChange:'---',
        costCenter:'---',
        costObject:'---',
        combineEntries:'---',
        budjetAmount:'---',
        block:'---',
        newPage:'---',
        blankLine:'---',
        balanceToAllocate:'---',
      },
      {
        No: '---',
        Name: '---',
        type:'----',
        totalling:'---',
        costClass:'---',
        accountRange:'---',
        nextChange:'---',
        costCenter:'---',
        costObject:'---',
        combineEntries:'---',
        budjetAmount:'---',
        block:'---',
        newPage:'---',
        blankLine:'---',
        balaceToAllocate:'---'
      },
    ] 
  constructor(private fb:FormBuilder) { }
    
  ngOnInit() {}
  check(i){}
  }

