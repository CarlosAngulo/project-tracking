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
        "title": "[SPIKE] Groups in report builder Data Structure",
        "code": "AMC-12443",
        "link": "https://projects.mbww.com/browse/AMC-12443",
        "description": "[SPIKE] Groups in report builder Data Structure",
        "status": "DONE",
        "effort": [
          "BE"
        ],
        "parents": [],
        "estimation": 5,
        "mvp": {
          "name": "Setup",
          "id": 1
        },
        "asignee": {
          "name": "Luis Hernandezs",
          "role": [
            "BE"
          ]
        }
      },
      {
        "title": "[DEV] Create a Feature Flag",
        "code": "AMC-12458",
        "link": "https://projects.mbww.com/browse/AMC-12458",
        "description": "[DEV] Create a Feature Flag",
        "status": "DONE",
        "effort": [
          "FE",
          "BE"
        ],
        "parents": [],
        "estimation": 2,
        "mvp": {
          "name": "Setup",
          "id": 1
        },
        "asignee": {
          "name": "Andres Avendaño",
          "role": [
            "FE"
          ]
        }
      },
      {
        "title": "[DEV] Modify chips on the overview Panel",
        "code": "AMC-12446",
        "link": "https://projects.mbww.com/browse/AMC-12446",
        "description": "[DEV] Modify chips on the overview Panel",
        "status": "PROGRESS",
        "effort": [
          "FE"
        ],
        "parents": [
          "AMC-12458",
          "AMC-12443"
        ],
        "estimation": 3,
        "mvp": {
          "name": "Creation",
          "id": 2
        },
        "asignee": {
          "name": "Andres Avendaño",
          "role": [
            "FE"
          ]
        }
      },
      {
        "title": "[POC] Change D3 bar charts to pure HTML/CSS",
        "code": "AMC-12524",
        "link": "https://projects.mbww.com/browse/AMC-12524",
        "description": "[POC] Change D3 bar charts to pure HTML/CSS",
        "status": "DONE",
        "effort": [
          "BE"
        ],
        "parents": [],
        "estimation": 2,
        "mvp": {
          "name": "Setup",
          "id": 1
        },
        "asignee": {
          "name": "Juan Casas",
          "role": [
            "FE"
          ]
        }
      },
      {
        "title": "[DEV] Change D3 bar charts on Profile Report",
        "code": "AMC-12530",
        "link": "https://projects.mbww.com/browse/AMC-12530",
        "description": "[DEV] Change D3 bar charts on Profile Report",
        "status": "NEW",
        "effort": [
          "FE"
        ],
        "parents": [
          "AMC-12524",
        ],
        "estimation": 5,
        "mvp": {
          "name": "Summary - Export",
          "id": 3
        },
        "asignee": {
          "name": "Juan Casas",
          "role": [
            "FE"
          ]
        }
      },
      {
        "title": "[DEV] Change D3 bar charts on Composition Report",
        "code": "AMC-12598",
        "link": "https://projects.mbww.com/browse/AMC-12598",
        "description": "[DEV] Change D3 bar charts on Profile Report",
        "status": "NEW",
        "effort": [
          "FE"
        ],
        "parents": [
          "AMC-12524"
        ],
        "estimation": 0,
        "mvp": {
          "name": "Summary - Export",
          "id": 3
        },
        "asignee": {
          "name": "--",
          "role": [
            "FE"
          ]
        }
      },
      {
        "title": "[DEV] Modify Profile Report Data Structure",
        "code": "AMC-12509",
        "link": "https://projects.mbww.com/browse/AMC-12509",
        "description": "[DEV] Modify Profile Report Data Structure",
        "status": "NEW",
        "effort": [
          "BE"
        ],
        "parents": [
          "AMC-12443"
        ],
        "estimation": 5,
        "mvp": {
          "name": "Setup",
          "id": 1
        },
        "asignee": {
          "name": "--",
          "role": [
            "BE"
          ]
        }
      },
      {
        "title": "[DEV] Modify Audience Composition Report Data Structure",
        "code": "AMC-12649",
        "link": "https://projects.mbww.com/browse/AMC-12649",
        "description": "[DEV] Modify Audience Composition Report Data Structure",
        "status": "NEW",
        "effort": [
          "BE"
        ],
        "parents": [
          "AMC-12443"
        ],
        "estimation": 0,
        "mvp": {
          "name": "Setup",
          "id": 1
        },
        "asignee": {
          "name": "--",
          "role": [
            "BE"
          ]
        }
      },
      {
        "title": "[DEV] Endpoint to calculate Group Size - Report Builder",
        "code": "AMC-12442",
        "link": "https://projects.mbww.com/browse/AMC-12442",
        "description": "[DEV] Endpoint to calculate Group Size - Report Builder",
        "status": "NEW",
        "effort": [
          "BE"
        ],
        "parents": [
          "AMC-12509"
        ],
        "estimation": 5,
        "mvp": {
          "name": "Creation",
          "id": 2
        },
        "asignee": {
          "name": "--",
          "role": [
            "BE"
          ]
        }
      },
      {
        "title": "[DEV] Modify Datasource Panel",
        "code": "AMC-11191",
        "link": "https://projects.mbww.com/browse/AMC-11191",
        "description": "[DEV] Modify Datasource Panel",
        "status": "DONE",
        "effort": [
          "FE"
        ],
        "parents": [
          "AMC-12458"
        ],
        "estimation": 3,
        "mvp": {
          "name": "Creation",
          "id": 2
        },
        "asignee": {
          "name": "Carlos Angulo",
          "role": [
            "FE"
          ]
        }
      },
      {
        "title": "[DEV] Modify Overview Panel",
        "code": "AMC-12450",
        "link": "https://projects.mbww.com/browse/AMC-12450",
        "description": "[DEV] Modify Overview Panel",
        "status": "NEW",
        "effort": [
          "FE"
        ],
        "parents": [
          "AMC-12446",
          "AMC-11191",
          "AMC-12649",
          "AMC-12509",
          "AMC-12442"
        ],
        "estimation": 5,
        "mvp": {
          "name": "Creation",
          "id": 2
        },
        "asignee": {
          "name": "--",
          "role": [
            "FE"
          ]
        }
      },
      {
        "title": "[DEV] Saving groups in reports",
        "code": "AMC-12560",
        "link": "https://projects.mbww.com/browse/AMC-12560",
        "description": "[DEV] Saving groups in reports",
        "status": "NEW",
        "effort": [
          "FE"
        ],
        "parents": [
          "AMC-12450"
        ],
        "estimation": 0,
        "mvp": {
          "name": "Creation",
          "id": 2
        },
        "asignee": {
          "name": "--",
          "role": [
            "FE"
          ]
        }
      },
      {
        "title": "[QA] Creation Certification",
        "code": "AMC-MMMMM",
        "link": "https://projects.mbww.com/browse/AMC-MMMMM",
        "description": "[QA] Creation Certification",
        "status": "NEW",
        "effort": [
          "FE"
        ],
        "parents": [
          "AMC-12560"
        ],
        "estimation": 0,
        "mvp": {
          "name": "Creation",
          "id": 2
        },
        "asignee": {
          "name": "--",
          "role": [
            "FE"
          ]
        }
      },
      {
        "title": "[DEV] Table - Profile Report Summary",
        "code": "AMC-12503",
        "link": "https://projects.mbww.com/browse/AMC-12503",
        "description": "[DEV] Table - Profile Report Summary",
        "status": "NEW",
        "effort": [
          "FE"
        ],
        "parents": [
          "AMC-MMMMM",
          "AMC-12530"
        ],
        "estimation": 0,
        "mvp": {
          "name": "Summary - Export",
          "id": 3
        },
        "asignee": {
          "name": "--",
          "role": [
            "FE"
          ]
        }
      },
      {
        "title": "[DEV] Graph - Profile Report Summary",
        "code": "AMC-12151",
        "link": "https://projects.mbww.com/browse/AMC-12151",
        "description": "[DEV] Graph - Profile Report Summary",
        "status": "NEW",
        "effort": [
          "FE"
        ],
        "parents": [
          "AMC-MMMMM",
          "AMC-12530"
        ],
        "estimation": 0,
        "mvp": {
          "name": "Summary - Export",
          "id": 3
        },
        "asignee": {
          "name": "--",
          "role": [
            "FE"
          ]
        }
      },
      {
        "title": "[DEV] Graph - Composition Report Summary.",
        "code": "AMC-12118",
        "link": "https://projects.mbww.com/browse/AMC-12118",
        "description": "[DEV] Graph - Composition Report Summary.",
        "status": "NEW",
        "effort": [
          "FE"
        ],
        "parents": [
          "AMC-MMMMM",
          "AMC-12598",
        ],
        "estimation": 8,
        "mvp": {
          "name": "Summary - Export",
          "id": 3
        },
        "asignee": {
          "name": "--",
          "role": [
            "FE"
          ]
        }
      },
      {
        "title": "[DEV] Export Composition Report",
        "code": "AMC-AAAAA",
        "link": "https://projects.mbww.com/browse/AMC-AAAAA",
        "description": "[DEV] Export Composition report",
        "status": "NEW",
        "effort": [
          "FE"
        ],
        "parents": [
          "AMC-12118"
        ],
        "estimation": 0,
        "mvp": {
          "name": "Summary - Export",
          "id": 3
        },
        "asignee": {
          "name": "--",
          "role": [
            "FE"
          ]
        }
      },
      {
        "title": "[DEV] Export Profile Report",
        "code": "AMC-BBBBB",
        "link": "https://projects.mbww.com/browse/AMC-BBBBB",
        "description": "[DEV] Export Profile Report",
        "status": "NEW",
        "effort": [
          "FE"
        ],
        "parents": [
          "AMC-12151"
        ],
        "estimation": 0,
        "mvp": {
          "name": "Summary - Export",
          "id": 3
        },
        "asignee": {
          "name": "--",
          "role": [
            "FE"
          ]
        }
      },
      {
        "title": "[QA] Summary Certification",
        "code": "AMC-OOOOO",
        "link": "https://projects.mbww.com/browse/AMC-OOOOO",
        "description": "[QA] Summary Certification",
        "status": "NEW",
        "effort": [
          "FE"
        ],
        "parents": [
          "AMC-BBBBB",
          'AMC-AAAAA',
          'AMC-12503'
        ],
        "estimation": 0,
        "mvp": {
          "name": "Summary - Export",
          "id": 3
        },
        "asignee": {
          "name": "--",
          "role": [
            "FE"
          ]
        }
      }
    ]
  }

  project!: IProject;

  csv = `CODE;ASIGNEE;TITLE;ESTIMATION;STATUS;EFFORT;PARENTS;MVP
AMC-12443;Luis Hernandez,BE;[SPIKE] Groups in report builder Data Structure;5;DONE;BE;;1,Setup
AMC-12458;Andres Avedaño,FE;[DEV] Create a Feature Flag;2;DONE;FE,BE;;1,Setup
AMC-12524;Juan Casas,FE;[POC] Change D3 bar charts to pure HTML/CSS;2;DONE;BE;;1,Setup
AMC-12509;-;[DEV] Modify Report data structure;0;NEW;BE;AMC-12443;1,Setup
AMC-12446;Andres Avedaño,FE;[DEV] Modify chips on the overview Panel;3;PROGRESS;FE;AMC-12458,AMC-12443;2,Creation
AMC-11191;Carlos Angulo-FE;[DEV] Modify Datasource Panel;3;DONE;FE;AMC-12458;2,Creation
AMC-12530;Juan Casas,FE;[DEV] Change D3 bar charts on Profile Report;0;NEW;FE;AMC-12524;3,Export-Summary
AMC-12598;-;[DEV] Change D3 bar charts on Composition Report;0;NEW;FE;AMC-12524;3,Export-Summary
AMC-12442;-;[DEV] Endpoint to calculate Group Size - Report Builder;5;NEW;BE;AMC-12509;2,Creation
AMC-12450;-;[DEV] Modify Overview Panel;5;NEW;FE;AMC-12446,AMC-11191,AMC-12509,AMC-12442;2,Creation
AMC-12560;-;[DEV] Saving groups in reports;3;NEW;FE;AMC-12450;2,Creation
AMC-MMMMM;-;[QA] Creation Certification;3;NEW;FE;AMC-12560;2,Creation
AMC-12503;-;[DEV] Table - Profile Report Summary;3;NEW;FE;AMC-MMMMM,AMC-12530;3,Export Summary
AMC-12151;-;[DEV] Graph - Profile Report Summary;3;NEW;FE;AMC-MMMMM,AMC-12530;3,Export Summary
AMC-12118;-;[DEV] Graph - Composition Report Summary.;3;NEW;FE;AMC-MMMMM,AMC-12598;3,Export Summary
AMC-BBBBB;-;[DEV] Export Profile Report;3;NEW;FE;AMC-12151;3,Export Summary
AMC-AAAAA;-;[DEV] Export Composition Report;3;NEW;FE;AMC-12118;3,Export Summary
AMC-OOOOO;-;[QA] Summary Certification;3;NEW;FE;AMC-BBBBB,AMC-AAAAA,AMC-12503;3,Export Summary`;

  constructor(readonly nodeTreeService: NodeTreeService, readonly CSVParser: CSVParserService) {
    const localStorageProject: any = localStorage.getItem('project');
    if (localStorageProject) {
      this.project = JSON.parse(localStorageProject);
    } else {
      this.project = this.PROJECT;
    }

    const csvPrimitive = CSVParser.csvToArray(this.csv);
    const csvParsed = CSVParser.parseArray(csvPrimitive)
    console.log(this.PROJECT.tickets[1])
    console.log(csvParsed[1]);
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
