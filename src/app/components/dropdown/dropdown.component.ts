import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

export interface IDropDown {
  name: string;
  value: string | number;
}
@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnChanges {
  @Output() onSelect: EventEmitter<string | number> = new EventEmitter();
  @Input() label!: string;

  _defaultOption!: IDropDown;
  @Input() set defaultOption(val: string) {
    this._defaultOption = {name: val, value: ''}
  }
  _options!: IDropDown[];
  @Input() set options(values: IDropDown[] | any[]) {
    this._options = values.every(val => this.dropDownType(val)) ? values : values.map(value => ({
      name: value,
      value
    }));
    if (this._defaultOption) {
      this._options.unshift(this._defaultOption)
    }
  }
  
  selectedValue: string | number = this.defaultOption;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options'].currentValue.length > 0) {
      this.onElementClick(this._options[0])
    }
  }

  dropDownType(object: any): object is IDropDown {
    if(typeof object === 'string') return false;
    return 'name' in object && 'value' in object;
  }

  onElementClick(value: IDropDown) {
    this.selectedValue = value.name;
    this.onSelect.next(value.value);
  }

}
