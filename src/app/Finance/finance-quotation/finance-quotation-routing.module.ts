import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuotationsIndexComponent } from 'src/app/CRMS/crms-pages/Sales/Quotations/index/index.component';
 
const routes: Routes = [ 
  {
    path: '',
    component: QuotationsIndexComponent,
    data: { title: 'Quotations' },
    pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceQuotationRoutingModule { }
