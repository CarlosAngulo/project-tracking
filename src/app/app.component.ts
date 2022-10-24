import { Component } from '@angular/core';
import { NodeTreeService } from './services/nodetree.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showLoader = true;

  constructor(private nodeTreeService: NodeTreeService) {
    
  }

  onJSONLoad(project:any) {
    this.onShowLoader(false);
    this.nodeTreeService.loadProject(project)
  }
  
  onShowLoader(event:boolean) {
    this.showLoader = event;
  }
}
