import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @Output() onSelect: EventEmitter<string> = new EventEmitter();
  @Input() set options(val:any) {
    this. sortedOptions = Object.values(val)
  };
  sortedOptions!: string[];
  
  DEFAULT_VALUE = 'None'
  selectedValue = this.DEFAULT_VALUE;

  constructor() { }

  ngOnInit(): void {
  }

  onElementClick(value:string = '') {
    this.selectedValue = value;
    this.onSelect.next(value);
  }

}
