import { Component, Input, OnChanges } from '@angular/core';

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
    if (this.data) {
      this.statuses = Object.keys(this.data);
    }
    for (const status in this.data) {
      if (Object.prototype.hasOwnProperty.call(this.data, status)) {
        const progress = this.data[status];
        this.totalEstimation += progress;
      }
    }
  }

}
