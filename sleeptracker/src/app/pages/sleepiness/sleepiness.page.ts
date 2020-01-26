import { Component, OnInit } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
import { StanfordSleepinessData } from '../../data/stanford-sleepiness-data';
import { SleepService } from '../../services/sleep.service';

@Component({
  selector: 'app-sleepiness',
  templateUrl: './sleepiness.page.html',
  styleUrls: ['./sleepiness.page.scss'],
})
export class SleepinessPage implements OnInit {
  public sleepinessData: StanfordSleepinessData[] = [];
  private pickerValueSelected = false;

  constructor(private sleepService: SleepService, private pickerController: PickerController) {
    this.sleepinessData = SleepService.AllSleepinessData;
  }

  ngOnInit() {
  }

  onButtonClicked(sleepData: StanfordSleepinessData) {
    this.sleepService.deleteSleepinessData(sleepData);
  }

  async showPicker() {
    const opts: PickerOptions = {
      cssClass: 'sleepiness-picker',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Done',
          handler: () => this.pickerValueSelected = true
        }
      ],
      columns: [
        {
          name: 'sleepiness',
          options: [
            { text: StanfordSleepinessData.ScaleValues[1], value: 1},
            { text: StanfordSleepinessData.ScaleValues[2], value: 2},
            { text: StanfordSleepinessData.ScaleValues[3], value: 3},
            { text: StanfordSleepinessData.ScaleValues[4], value: 4},
            { text: StanfordSleepinessData.ScaleValues[5], value: 5},
            { text: StanfordSleepinessData.ScaleValues[6], value: 6},
            { text: StanfordSleepinessData.ScaleValues[7], value: 7}
          ]
        }
      ]
    };
    const picker = await this.pickerController.create(opts);
    picker.present();
    picker.onDidDismiss().then(async () => {
      if (this.pickerValueSelected) {
        const column = await picker.getColumn('sleepiness');
        const sleepiness = column.options[column.selectedIndex].value;
        this.sleepService.logSleepinessData(new StanfordSleepinessData(sleepiness));
      }
    });
  }
}
