import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { NodeTreeService } from './services/nodetree.service';
import { TicketService } from './services/tickets/ticket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit{
  showLoader = true;
  isDetailPanelOpen = false;
  private unsub$ = new Subject<void>();

  constructor(
    private nodeTreeService: NodeTreeService,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    localStorage.clear();
    this.nodeTreeService.loadFromLocalStorage();

    if (localStorage.getItem('project')) {
      this.showLoader = false;
    }

    this.nodeTreeService.isLoadWindowOpen()
    .pipe(takeUntil(this.unsub$))
    .subscribe(res => this.showLoader = res);


    this.ticketService.isDetailsPanelOpen()
    .pipe(takeUntil(this.unsub$))
    .subscribe((res:boolean) => {
      this.isDetailPanelOpen = res;
    });
  }

  onJSONLoad(project:any) {
    this.onShowLoader(false);
    this.nodeTreeService.loadProject(project)
  }
  
  onShowLoader(event:boolean) {
    this.showLoader = event;
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.unsubscribe();
  }
}
