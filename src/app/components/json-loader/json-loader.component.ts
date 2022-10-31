import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { INode, IProject } from 'src/app/interfaces/nodes.inteface';
import { NodeTreeService } from 'src/app/services/nodetree.service';

@Component({
  selector: 'app-json-loader',
  templateUrl: './json-loader.component.html',
  styleUrls: ['./json-loader.component.scss']
})
export class JsonLoaderComponent implements OnInit {
  @Output() onLoad: EventEmitter<any> = new EventEmitter();
  @Output() onCancel: EventEmitter<boolean> = new EventEmitter();

  parseJSONError = false;
  projectLoaded = false;

  PROJECT: any = {
    "name": "Q4.0.0 Groups Composition and Profile Reports",
    "leader": "Carlos Angulo",
    "tickets": [
    {
      "title": "[SPIKE] - Groups in report builder Data Structure",
      "code": "AMC-12443",
      "link": "https://projects.mbww.com/browse/AMC-12443",
      "description": "[SPIKE] - Groups in report builder Data Structure",
      "status": "PROGRESS",
      "effort": ["BE"],
      "parents": [],
      "estimation": 5,
      "mvp": {
        "name": "Setup",
        "id": 1
      },
      "asignee": {
        "name": "Luis Hernandezs",
        "role": ["BE"]
      }
    },
    {
      "title": "[BE - FE] Create a Feature Flag",
      "code": "AMC-12458",
      "link": "https://projects.mbww.com/browse/AMC-12458",
      "description": "[BE - FE] Create a Feature Flag",
      "status": "PROGRESS",
      "effort": ["FE", "BE"],
      "parents": [],
      "estimation": 2,
      "mvp": {
        "name": "Setup",
        "id": 1
      },
      "asignee": {
        "name": "Andres Avendaño",
        "role": ["FE"]
      }
    },
    {
      "title": "[POC] Change D3 bar charts to pure HTML/CSS",
      "code": "AMC-12524",
      "link": "https://projects.mbww.com/browse/AMC-12524",
      "description": "[POC] Change D3 bar charts to pure HTML/CSS",
      "status": "PROGRESS",
      "effort": ["BE"],
      "parents": [],
      "estimation": 2,
      "mvp": {
        "name": "Setup",
        "id": 1
      },
      "asignee": {
        "name": "Juan Casas",
        "role": ["FE"]
      }
    },
    {
      "title": "Change D3 bar charts on Profile Report",
      "code": "AMC-12530",
      "link": "https://projects.mbww.com/browse/AMC-12530",
      "description": "Change D3 bar charts on Profile Report",
      "status": "NEW",
      "effort": ["FE"],
      "parents": ["AMC-12524"],
      "estimation": 0,
      "mvp": {
        "name": "Setup",
        "id": 1
      },
      "asignee": {
        "name": "--",
        "role": ["FE"]
      }
    },
    {
      "title": "Change D3 bar charts on Composition Report",
      "code": "AMC-1253X",
      "link": "https://projects.mbww.com/browse/AMC-1253X",
      "description": "Change D3 bar charts on Profile Report",
      "status": "NEW",
      "effort": ["FE"],
      "parents": ["AMC-12524"],
      "estimation": 0,
      "mvp": {
        "name": "Setup",
        "id": 1
      },
      "asignee": {
        "name": "--",
        "role": ["FE"]
      }
    },
    {
      "title": "[BE] - Modify Report data structure",
      "code": "AMC-12509",
      "link": "https://projects.mbww.com/browse/AMC-12509",
      "description": "[BE] - Modify Report data structure",
      "status": "NEW",
      "effort": ["BE"],
      "parents": ["AMC-12443"],
      "estimation": 0,
      "mvp": {
        "name": "Setup",
        "id": 1
      },
      "asignee": {
        "name": "--",
        "role": ["BE"]
      }
    },
    {
      "title": "[BE] - Endpoint to calculate Group Size - Report Builder",
      "code": "AMC-12442",
      "link": "https://projects.mbww.com/browse/AMC-12442",
      "description": "[BE] - Endpoint to calculate Group Size - Report Builder",
      "status": "NEW",
      "effort": ["BE"],
      "parents": ["AMC-12509"],
      "estimation": 5,
      "mvp": {
        "name": "Setup",
        "id": 1
      },
      "asignee": {
        "name": "--",
        "role": ["BE"]
      }
    },
    {
      "title": "Implement charts on pure HTML/CSS to remove D3",
      "code": "AMC-12530",
      "link": "https://projects.mbww.com/browse/AMC-12530",
      "description": "Implement charts on pure HTML/CSS to remove D3",
      "status": "NEW",
      "effort": ["FE"],
      "parents": ["AMC-12524"],
      "estimation": 0,
      "mvp": {
        "name": "Setup",
        "id": 1
      },
      "asignee": {
        "name": "--",
        "role": ["FE"]
      }
    },
    {
      "title": "[FE] Modify Datasource Panel",
      "code": "AMC-11191",
      "link": "https://projects.mbww.com/browse/AMC-11191",
      "description": "[FE] Modify Datasource Panel",
      "status": "PROGRESS",
      "effort": ["FE"],
      "parents": ["AMC-12458"],
      "estimation": 3,
      "mvp": {
        "name": "Setup",
        "id": 1
      },
      "asignee": {
        "name": "Carlos Angulo",
        "role": ["FE"]
      }
    },
    {
      "title": "[FE] - Modify Overview Panel",
      "code": "AMC-12450",
      "link": "https://projects.mbww.com/browse/AMC-12450",
      "description": "[FE] - Modify Overview Panel",
      "status": "NEW",
      "effort": ["FE"],
      "parents": ["AMC-11191", "AMC-12509", "AMC-12442"],
      "estimation": 5,
      "mvp": {
        "name": "Setup",
        "id": 1
      },
      "asignee": {
        "name": "--",
        "role": ["FE"]
      }
    },
    {
      "title": "[FE] - Modify chips on the overview Panel",
      "code": "AMC-12446",
      "link": "https://projects.mbww.com/browse/AMC-12446",
      "description": "[FE] - Modify chips on the overview Panel",
      "status": "PROGRESS",
      "effort": ["FE"],
      "parents": ["AMC-12458"],
      "estimation": 3,
      "mvp": {
        "name": "Setup",
        "id": 1
      },
      "asignee": {
        "name": "Andres Avendaño",
        "role": ["FE"]
      }
    },
    {
      "title": "[FE-BE] Saving groups in reports",
      "code": "AMC-12560",
      "link": "https://projects.mbww.com/browse/AMC-12560",
      "description": "[FE-BE] Saving groups in reports",
      "status": "NEW",
      "effort": ["FE"],
      "parents": ["AMC-12450", "AMC-12509", "AMC-12446"],
      "estimation": 3,
      "mvp": {
        "name": "Setup",
        "id": 1
      },
      "asignee": {
        "name": "--",
        "role": ["FE"]
      }
    },
    {
      "title": "Table - Profile Report Summary",
      "code": "AMC-12503",
      "link": "https://projects.mbww.com/browse/AMC-12503",
      "description": "Table - Profile Report Summary",
      "status": "NEW",
      "effort": ["FE"],
      "parents": ["AMC-12560", "AMC-12530"],
      "estimation": 3,
      "mvp": {
        "name": "Setup",
        "id": 1
      },
      "asignee": {
        "name": "--",
        "role": ["FE"]
      }
    },
    {
      "title": "Graph - Profile Report Summary",
      "code": "AMC-12151",
      "link": "https://projects.mbww.com/browse/AMC-12151",
      "description": "Table - Profile Report Summary",
      "status": "NEW",
      "effort": ["FE"],
      "parents": ["AMC-12560", "AMC-12530"],
      "estimation": 3,
      "mvp": {
        "name": "Setup",
        "id": 1
      },
      "asignee": {
        "name": "--",
        "role": ["FE"]
      }
    },
    {
      "title": "Graph - Composition Report Summary.",
      "code": "AMC-12118",
      "link": "https://projects.mbww.com/browse/AMC-12118",
      "description": "Graph - Composition Report Summary",
      "status": "NEW",
      "effort": ["FE"],
      "parents": ["AMC-12560", "AMC-1253X"],
      "estimation": 3,
      "mvp": {
        "name": "Setup",
        "id": 1
      },
      "asignee": {
        "name": "--",
        "role": ["FE"]
      }
    },
    {
      "title": "[FE-BE] Export Composition report",
      "code": "AMC-AAAAA",
      "link": "https://projects.mbww.com/browse/AMC-AAAAA",
      "description": "Graph - Composition Report Summary",
      "status": "NEW",
      "effort": ["FE"],
      "parents": ["AMC-12118"],
      "estimation": 3,
      "mvp": {
        "name": "Setup",
        "id": 1
      },
      "asignee": {
        "name": "--",
        "role": ["FE"]
      }
    }
  ]
}


  project!: IProject;

  constructor(readonly nodeTreeService: NodeTreeService) {
    const localStorageProject: any = localStorage.getItem('project');
    if (localStorageProject) {
      this.project = JSON.parse(localStorageProject);
    } else {
      this.project = this.PROJECT;
    }
  }

  ngOnInit(): void {
    this.projectLoaded = this.nodeTreeService.isProjectLoaded;
  }

  get projectValue () {
    return JSON.stringify(this.project, null, 2);
  }

  set projectValue (v) {
    try {
      this.project = JSON.parse(v);
      this.parseJSONError = false;
    }
    catch(e) {
      this.parseJSONError = true;
    };
  }

  onInsert() {
    this.onLoad.next(this.project);
    this.projectLoaded = true;
  }

  onClose() {
    this.onCancel.next(false)
  }

}
