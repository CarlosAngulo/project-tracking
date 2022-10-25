import { Component, OnDestroy} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { NodeTreeService } from 'src/app/services/nodetree.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {
  
  mvps = {}
  leader = '';
  progressStatus!: any[];
  title = '';
  private unsub$ = new Subject<void>();

  constructor(private nodeTreeService: NodeTreeService) {
    nodeTreeService.getMVPs()
    .pipe(takeUntil(this.unsub$))
    .subscribe((mvps:any[]) => this.mvps = mvps);
    
    nodeTreeService.getProgress()
    .pipe(takeUntil(this.unsub$))
    .subscribe((progress: any[]) => this.progressStatus = progress);
    
    nodeTreeService.getProjectName()
    .pipe(takeUntil(this.unsub$))
    .subscribe((title: string) => this.title = title);
    
    nodeTreeService.getLeader()
    .pipe(takeUntil(this.unsub$))
    .subscribe((leader: string) => this.leader = leader);
  }

  onSelectMVP(mvp?: string) {
    this.nodeTreeService
    .onSelectMVP(mvp);
  }

  onUploadClick(evt: boolean) {
    this.nodeTreeService.openLoadWindow();
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.unsubscribe();
  }
}
