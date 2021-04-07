import { NgModule } from '@angular/core';
import {MatDatepickerModule} from "@angular/material/datepicker"
import {MatButtonModule} from "@angular/material/button"
import {MatButtonToggleModule} from "@angular/material/button-toggle"
import {MatNativeDateModule} from "@angular/material/core"
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


const MaterialComponents = [
  MatDatepickerModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatInputModule,
];
@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
