import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 

const routes: Routes = [
  {
    path: 'batch-uploads',
    loadChildren: () =>
      import('./admin-pages/batch-uploads/batch-uploads.module').then(
        (m) => m.BatchUploadsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
