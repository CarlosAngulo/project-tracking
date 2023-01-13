import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { IBlockStatus, NodeStatus } from 'src/app/interfaces/nodes.inteface';

export enum SelectBy {
  COUNT = 'count',
  POINTS = 'points'
}

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnChanges {
  @Input() statuses: IBlockStatus[] = [];
  @Output() onStatusSelected: EventEmitter<string> = new EventEmitter();
  selectedStatus = '';
  completed!: IBlockStatus;
  total!: {
    count: number,
    points: number
  }
  selectBy: SelectBy = SelectBy.COUNT;
  selectByOpts: string[] = [SelectBy.COUNT, SelectBy.POINTS];

  constructor() { }

  ngOnChanges(): void {
    if (this.statuses) {
      this.total = this.statuses
      .reduce((acc, curr) =>  ({
        count: curr.count + acc.count,
        points: acc.points + curr.points,
      }),{
        count: 0,
        points: 0
      });
      this.completed = this.statuses.find(status => status.name === NodeStatus.done) || {
        name: 'DONE',
        count: 0,
        points: 0,
      };
    }
  }

  selectType(evt: any) {
    this.selectBy = evt
  }

  onStatusSelect(status: string) {
    this.selectedStatus = this.selectedStatus === status ? '' : status;
    this.onStatusSelected.next(this.selectedStatus);
  }

}
