import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountClassComponent } from 'src/app/Life/Setup/Account/financial-statement/account-class/create-account-class/create-account-class.component';
import { IndexAccountClassComponent } from 'src/app/Life/Setup/Account/financial-statement/account-class/index-account-class/index-account-class.component';
import { CreateAccountLineComponent } from 'src/app/Life/Setup/Account/financial-statement/account-line/create-account-line/create-account-line.component';
import { IndexAccountLineComponent } from 'src/app/Life/Setup/Account/financial-statement/account-line/index-account-line/index-account-line.component';
import { CreateFinancialStatementComponent } from 'src/app/Life/Setup/Account/financial-statement/financial-statement/create-financial-statement/create-financial-statement.component';
import { IndexFinancialStatementComponent } from 'src/app/Life/Setup/Account/financial-statement/financial-statement/index-financial-statement/index-financial-statement.component';
 
const routes: Routes = [
  {
    path: 'account-line',
    children: [
        { path: '', redirectTo: 'index', pathMatch: 'full' },
        { path: 'index', component: IndexAccountLineComponent , data:{title:'Accounting Desk / Accounts / Financial Statement / Account Line'}},
        { path: 'create', component: CreateAccountLineComponent, data:{title:'Accounting Desk / Accounts / Financial Statement / Create Account Line'} }
    ]
},
{
    path: 'account-class',
    children: [
        { path: '', redirectTo: 'index', pathMatch: 'full' },
        { path: 'index', component: IndexAccountClassComponent , data:{title:'Accounting Desk / Accounts / Financial Statement / Account Class'}},
        { path: 'create', component: CreateAccountClassComponent , data:{title:'Accounting Desk / Accounts / Financial Statement / Create Account Class'}}
    ]
},
{
    path: 'financial-statement',
    children: [
        { path: '', redirectTo: 'index', pathMatch: 'full' },
        { path: 'index', component: IndexFinancialStatementComponent, data:{title:'Accounting Desk / Accounts / Financial Statement / Financial Statement'} },
        { path: 'create', component: CreateFinancialStatementComponent , data:{title:'Accounting Desk / Accounts / Financial Statement / Create Financial Statement'}}
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancialStatementRoutingModule { }
