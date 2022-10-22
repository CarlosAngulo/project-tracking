import { Component, Input, OnChanges } from '@angular/core';
import { NodeStatus } from 'src/app/services/ticketss.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnChanges {
  @Input() data: any;
  statuses: string[] = [];
  totalEstimation = 0;

  constructor() { }

  ngOnChanges(): void {
    this.totalEstimation = 0;
    this.statuses = Object.keys(this.data);
    for (const status in this.data) {
      if (Object.prototype.hasOwnProperty.call(this.data, status)) {
        const progress = this.data[status];
        this.totalEstimation += progress;
      }
    }
  }

}
