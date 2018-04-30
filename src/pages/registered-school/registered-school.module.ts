import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisteredSchoolPage } from './registered-school';

@NgModule({
  declarations: [
    RegisteredSchoolPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisteredSchoolPage),
  ],
})
export class RegisteredSchoolPageModule {}
