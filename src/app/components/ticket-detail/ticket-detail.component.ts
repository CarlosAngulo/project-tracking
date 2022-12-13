import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss']
})
export class TicketDetailComponent implements OnInit {
  @Input() data!: any;
  constructor() {
  }
  
  ngOnInit(): void {
    this.data = {
      title: 'Título del ticket',
      description: '<p>Descripción del ticket</p>';
    }
  }

}
