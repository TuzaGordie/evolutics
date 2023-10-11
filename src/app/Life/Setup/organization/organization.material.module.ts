import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
    imports: [
        MatFormFieldModule,
        MatSnackBarModule
    ],
    exports: [
        MatFormFieldModule,
        MatSnackBarModule
    ],
  })
  export class OrganizationMaterialDesignModule {}