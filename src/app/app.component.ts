import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { NodeTreeService } from './services/nodetree.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  showLoader = true;
  private unsub$ = new Subject<void>();

  constructor(private nodeTreeService: NodeTreeService) {
    nodeTreeService.isLoadWindowOpen()
    .pipe(takeUntil(this.unsub$))
    .subscribe(res => this.showLoader = res)
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
