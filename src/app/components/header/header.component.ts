import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { NodeTreeService } from 'src/app/services/nodetree.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  
  title = '';
  mvps = {}
  progressStatus!: any[];
  private unsub$ = new Subject<void>();

  constructor(private nodeTreeService: NodeTreeService) {
    nodeTreeService.getMVPs()
    .pipe(takeUntil(this.unsub$))
    .subscribe((mvps:any[]) => this.mvps = mvps);
    
    nodeTreeService.getProgress()
    .pipe(takeUntil(this.unsub$))
    .subscribe((progress: any[]) => this.progressStatus = progress);
    
    nodeTreeService.getTitle()
    .pipe(takeUntil(this.unsub$))
    .subscribe((title: string) => this.title = title);
  }

  ngOnInit(): void {
  }

  onSelectMVP(mvp?: string) {
    this.nodeTreeService
    .onSelectMVP(mvp);
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.unsubscribe();
  }
}
