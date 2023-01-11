import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface IDropDown {
  name: string;
  value: string | number;
}
@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ]
})
export class DropdownComponent implements ControlValueAccessor {
  @HostListener('document:click', ['$event'])
  clickout(event: MouseEvent) {
    if(!this.elRef.nativeElement.contains(event.target) && this.clickable) {
      this.onSelect.next(this.selectedValue);
      this.isActive = false;
    }
  }

  @Output() onSelect: EventEmitter<string | number> = new EventEmitter();
  @Input() label!: string;
  @Input() clickable = false;
  _defaultOption!: IDropDown;
  @Input() set defaultOption(val: string) {
    this._defaultOption = {name: val, value: ''};
  }
  _options!: IDropDown[];
  @Input() set options(values: IDropDown[] | any[]) {
    this._options = values.every(val => this.dropDownType(val)) ? values : values.map(value => ({
      name: value,
      value
    }));
    if (this._options.length === 0) return;
    if (this._defaultOption) {
      const defaultOptIndex = this._options.map(opt => opt.name).indexOf(this._defaultOption.name);
      if (defaultOptIndex >= 0) {
        this.selectElement(defaultOptIndex);
      } else if(this._defaultOption.name !== '' && this._defaultOption.name !== undefined) {
        this._options.unshift(this._defaultOption);
        this.selectElement(0);
      }
    } else {
      this.selectElement(0);
    }
  }
  isActive = false;
  selectedIndex: number = 0;
  selectedValue: string | number = this.defaultOption;

  constructor(private elRef: ElementRef) { }

  dropDownType(object: any): object is IDropDown {
    if (typeof object === 'string') return false;
    return 'name' in object && 'value' in object;
  }

  selectElement(index: number) {
    if (index < 0 || this._options.length === 0) return;
    this.selectedIndex = index;
    this.selectedValue = this._options[index]?.name;
    this.isActive = false;
  }

  onElementClick(index: number) {
    if (index < 0 || this._options.length === 0) return;
    this.selectElement(index);
    this.onSelect.next(this._options[index].value);
  }

  onMouseOver() {
    if (!this.clickable) {
      this.isActive = true;
    }
  }

  onMouseOut() {
    if (!this.clickable) {
      this.isActive = false;
    }
  }

  onLabelClick() {
    if (this.clickable) {
      this.isActive = true;
    }
  }

  writeValue(value: any): void {
    this.propagateChange(this.selectedValue);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: (value: string) => void): void {
    this.propagateChange = fn;
  }

  propagateChange = (value: any) => {
    // console.log('propagate', value)
  };
}
