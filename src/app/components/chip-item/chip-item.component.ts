import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chip-item',
  templateUrl: './chip-item.component.html',
  styleUrls: ['./chip-item.component.scss']
})
export class ChipItemComponent implements OnInit {
  @Input() id!: string | undefined;
  @Input() text!: string;
  @Input() confirmation!: string;
  @Output() onDelete: EventEmitter<string> = new EventEmitter();
  confirmationVisible = false;

  constructor() { }

  ngOnInit(): void {
  }

  onDeleteClick(){
    this.confirmationVisible = true;
  }

  confirmDelete() {
    if (!this.id) return;
    this.onDelete.next(this.id);
  }

  cancelDelete() {
    this.confirmationVisible = false;
  }

}
