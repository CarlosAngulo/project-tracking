import { Component, OnDestroy} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IBlockStatus } from 'src/app/interfaces/nodes.inteface';
import { NodeTreeService } from 'src/app/services/nodetree.service';
import { ViewService } from 'src/app/services/view.service';
import { IDropDown } from '../dropdown/dropdown.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {
  
  mvps: IDropDown[] = []
  leader = '';
  progressStatus!: IBlockStatus[];
  title = '';
  private unsub$ = new Subject<void>();

  constructor(
    private nodeTreeService: NodeTreeService,
    private viewService: ViewService
  ) {
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

  onSelectMVP(mvp?: string | number) {
    this.nodeTreeService
    .onSelectMVP(mvp);
  }

  onUploadClick(evt: boolean) {
    this.nodeTreeService.openLoadWindow();
  }

  onZoomClick(evt: number) {
    this.viewService.setZoom(evt)
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.unsubscribe();
  }
}
