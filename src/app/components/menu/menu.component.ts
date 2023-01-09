import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Output() onUploadClick: EventEmitter<boolean> = new EventEmitter();
  @Output() onZoomClick: EventEmitter<number> = new EventEmitter();
  @Output() onCreateNode: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onUploadFile() {
    this.onUploadClick.next(true);
  }

  onZoom(val: number) {
    this.onZoomClick.next(val);
  }

  onCreate() {
    this.onCreateNode.next();
  }

}
