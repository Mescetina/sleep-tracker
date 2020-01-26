import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OvernightSleepPage } from './overnight-sleep.page';

const routes: Routes = [
  {
    path: '',
    component: OvernightSleepPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OvernightSleepPage]
})
export class OvernightSleepPageModule {}
