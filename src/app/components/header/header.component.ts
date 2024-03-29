import { Component, OnDestroy} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/features/users/user.service';
import { IBlockStatus, INode } from 'src/app/interfaces/nodes.inteface';
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
  hasUser = false;
  showProgressBar = false;

  constructor(
    private nodeTreeService: NodeTreeService,
    private viewService: ViewService,
    private userService: UserService
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

    userService.getUser$()
    .subscribe(user => {
      this.hasUser = user === null ? false : true;
    })

    nodeTreeService.getNodeTree()
    .pipe(takeUntil(this.unsub$))
    .subscribe((nodeTree: INode[]) => this.showProgressBar = nodeTree.length > 0);
  }

  onSelectMVP(mvp?: string | number) {
    this.nodeTreeService
    .onSelectMVP(mvp);
  }

  onProjectClick() {
    this.nodeTreeService.openLoadWindow();
  }

  onZoomClick(evt: number) {
    this.viewService.setZoom(evt)
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.unsubscribe();
  }

  statusSelect(event: string) {
    this.nodeTreeService.onSelectStatus(event);
  }

  onProifleClick() {
    this.userService.setProfileOpen(true);
  }
}
