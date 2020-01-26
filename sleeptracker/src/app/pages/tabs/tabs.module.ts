import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'overnight-sleep',
        loadChildren: () => import('../overnight-sleep/overnight-sleep.module').then(m => m.OvernightSleepPageModule)
      },
      {
        path: 'sleepiness',
        loadChildren: () => import('../sleepiness/sleepiness.module').then(m => m.SleepinessPageModule)
      },
      {
        path: 'stats',
        loadChildren: () => import('../stats/stats.module').then(m => m.StatsPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/overnight-sleep',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
