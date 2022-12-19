import { Component, Input, OnInit } from '@angular/core';
import { INode } from 'src/app/interfaces/nodes.inteface';
import { TicketService } from 'src/app/services/tickets/ticket.service';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss']
})
export class TicketDetailComponent implements OnInit {
  @Input() data: INode | undefined;
  constructor(
    private ticketService: TicketService
  ) {
  }
  
  ngOnInit(): void {
    this.data = this.ticketService.getnodeData();
    this.ticketService.getNodeData$()
    .subscribe((res:INode | undefined) => {
      this.data = res;
    });
  }

  closeModal() {
    this.ticketService.openDetailsPanel(false);
  }

}
