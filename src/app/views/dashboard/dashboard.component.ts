import { Component, OnInit } from '@angular/core';
import { IProject } from 'src/app/interfaces/nodes.inteface';
import { ProjectService } from 'src/app/services/project-loader/project.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  project!: IProject;

  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.project = this.projectService.project;
  }

}
