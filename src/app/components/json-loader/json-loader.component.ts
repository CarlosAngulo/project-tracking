import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { INode, IProject } from 'src/app/interfaces/nodes.inteface';
import { CSVParserService } from 'src/app/services/csv-parser.service';
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
        "title": "[FE] - Modify chips on the overview Panel",
        "code": "AMC-12446",
        "link": "https://projects.mbww.com/browse/AMC-12446",
        "description": "[FE] - Modify chips on the overview Panel",
        "status": "PROGRESS",
        "effort": ["FE"],
        "parents": ["AMC-12458","AMC-12443"],
        "estimation": 3,
        "mvp": {
          "name": "Creation",
          "id": 2
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
          "name": "Summary",
          "id": 3
        },
        "asignee": {
          "name": "--",
          "role": ["FE"]
        }
      },
      {
        "title": "Change D3 bar charts on Composition Report",
        "code": "AMC-12598",
        "link": "https://projects.mbww.com/browse/AMC-12598",
        "description": "Change D3 bar charts on Profile Report",
        "status": "NEW",
        "effort": ["FE"],
        "parents": ["AMC-12524"],
        "estimation": 0,
        "mvp": {
          "name": "Summary",
          "id": 3
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
          "name": "Creation",
          "id": 2
        },
        "asignee": {
          "name": "--",
          "role": ["BE"]
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
          "name": "Creation",
          "id": 2
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
        "parents": ["AMC-11191", "AMC-12509", "AMC-12442", "AMC-12446"],
        "estimation": 5,
        "mvp": {
          "name": "Creation",
          "id": 2
        },
        "asignee": {
          "name": "--",
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
        "parents": ["AMC-12450", "AMC-12509"],
        "estimation": 3,
        "mvp": {
          "name": "Creation",
          "id": 2
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
          "name": "Summary",
          "id": 3
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
          "name": "Summary",
          "id": 3
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
        "parents": ["AMC-12560", "AMC-12598"],
        "estimation": 3,
        "mvp": {
          "name": "Summary",
          "id": 3
        },
        "asignee": {
          "name": "--",
          "role": ["FE"]
        }
      },
      {
        "title": "[FE-BE] Export Composition Report",
        "code": "AMC-AAAAA",
        "link": "https://projects.mbww.com/browse/AMC-AAAAA",
        "description": "[FE-BE] Export Composition report",
        "status": "NEW",
        "effort": ["FE"],
        "parents": ["AMC-12118"],
        "estimation": 3,
        "mvp": {
          "name": "Export",
          "id": 4
        },
        "asignee": {
          "name": "--",
          "role": ["FE"]
        }
      },
      {
        "title": "[FE-BE] Export Profile Report",
        "code": "AMC-BBBBB",
        "link": "https://projects.mbww.com/browse/AMC-BBBBB",
        "description": "[FE-BE] Export Profile Report",
        "status": "NEW",
        "effort": ["FE"],
        "parents": ["AMC-12151"],
        "estimation": 3,
        "mvp": {
          "name": "Export",
          "id": 4
        },
        "asignee": {
          "name": "--",
          "role": ["FE"]
        }
      }
    ]
  }

  project!: IProject;

  csv = `CODE	ASIGNEE	TITLE	ESTIMATION	STATUS	EFFORT	PARENTS	MVP
AMC-12443	Luis Hernandez,BE	[SPIKE] - Groups in report builder Data Structure	5	PROGRESS	BE		1,Setup
AMC-12458	Andres Avendaño,FE	[BE - FE] Create a Feature Flag	2	PROGRESS	FE,BE		1,Setup
AMC-12524	Juan Casas,FE	[POC] Change D3 bar charts to pure HTML/CSS	2	PROGRESS	BE		1,Setup
AMC-12509	-	[BE] - Modify Report data structure	0	NEW	BE	AMC-12443	1,Setup
AMC-11191	Carlos Angulo,FE	[FE] Modify Datasource Panel	3	PROGRESS	FE	AMC-12458	1,Setup
AMC-12446	Andres Avendaño,FE	[FE] - Modify chips on the overview Panel	3	PROGRESS	FE	AMC-12458	1,Setup
AMC-12530	-	Change D3 bar charts on Profile Report	0	NEW	FE	AMC-12524	1,Setup
AMC-12598	-	Change D3 bar charts on Composition Report	0	NEW	FE	AMC-12524	1,Setup
AMC-12442	-	[BE] - Endpoint to calculate Group Size - Report Builder	5	NEW	BE	AMC-12509	1,Setup
AMC-12450	-	[FE] - Modify Overview Panel	5	NEW	FE	AMC-11191,AMC-12509,AMC-12442	1,Setup
AMC-12560	-	[FE-BE] Saving groups in reports	3	NEW	FE	AMC-12450,AMC-12509,AMC-12446	1,Setup
AMC-12503	-	Table - Profile Report Summary	3	NEW	FE	AMC-12560,AMC-12530	1,Setup
AMC-12151	-	Graph - Profile Report Summary	3	NEW	FE	AMC-12560,AMC-12530	1,Setup
AMC-12118	-	Graph - Composition Report Summary.	3	NEW	FE	AMC-12560,AMC-12598	1,Setup
AMC-BBBBB	-	[FE-BE] Export Profile Report	3	NEW	FE	AMC-12151	1,Setup
AMC-AAAAA	-	[FE-BE] Export Composition Report	3	NEW	FE	AMC-12118	1,Setup`;

  constructor(readonly nodeTreeService: NodeTreeService, readonly CSVParser: CSVParserService) {
    const localStorageProject: any = localStorage.getItem('project');
    if (localStorageProject) {
      this.project = JSON.parse(localStorageProject);
    } else {
      this.project = this.PROJECT;
    }

    const csvPrimitive = CSVParser.csvToArray(this.csv);
    const csvParsed = CSVParser.parseArray(csvPrimitive)
    console.log(this.PROJECT.tickets[0])
    console.log(csvParsed[0]);
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
