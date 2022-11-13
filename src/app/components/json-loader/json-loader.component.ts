import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { INode, IProject, ImportType } from 'src/app/interfaces/nodes.inteface';
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
        "title": "[DEV] Chips on the overview Panel",
        "code": "AMC-12446",
        "link": "https://projects.mbww.com/browse/AMC-12446",
        "description": "[DEV] Chips on the overview Panel",
        "status": "PROGRESS",
        "effort": [
          "FE"
        ],
        "parents": [
          "AMC-12442"
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
        "title": "[DEV] Endpoint to calculate Group Size - Report Builder",
        "code": "AMC-12442",
        "link": "https://projects.mbww.com/browse/AMC-12442",
        "description": "[DEV] Endpoint to calculate Group Size - Report Builder",
        "status": "NEW",
        "effort": [
          "BE"
        ],
        "parents": [
          "AMC-12443"
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
        "title": "[DEV] Overview Panel",
        "code": "AMC-12450",
        "link": "https://projects.mbww.com/browse/AMC-12450",
        "description": "[DEV] Overview Panel",
        "status": "PROGRESS",
        "effort": [
          "FE"
        ],
        "parents": [
          "AMC-12446",
          "AMC-11191",
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
          "AMC-12450",
          "AMC-12649",
          "AMC-12509"
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
        "title": "[DEV] Modify data structure for Templates",
        "code": "AMC-HHHHHH",
        "link": "https://projects.mbww.com/browse/AMC-HHHHHH",
        "description": "[DEV] Modify structure for Templates",
        "status": "NEW",
        "effort": [
          "BE"
        ],
        "parents": [
          "AMC-12560"
        ],
        "estimation": 0,
        "mvp": {
          "name": "Enhacements",
          "id": 4
        },
        "asignee": {
          "name": "--",
          "role": [
            "FE"
          ]
        }
      },
      {
        "title": "[DEV] Save as Template",
        "code": "AMC-101010",
        "link": "https://projects.mbww.com/browse/AMC-101010",
        "description": "[DEV] Save as Template",
        "status": "NEW",
        "effort": [
          "FE",
          "BE"
        ],
        "parents": [
          "AMC-HHHHHH"
        ],
        "estimation": 0,
        "mvp": {
          "name": "Enhacements",
          "id": 4
        },
        "asignee": {
          "name": "--",
          "role": [
            "FE"
          ]
        }
      },
      {
        "title": "[QA] Certification - Creation",
        "code": "AMC-MMMMM",
        "link": "https://projects.mbww.com/browse/AMC-MMMMM",
        "description": "[QA] Certification - Creation",
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
        "title": "[DEV] Refresh Reports",
        "code": "AMC-333333",
        "link": "https://projects.mbww.com/browse/AMC-333333",
        "description": "[DEV] Refresh Reports",
        "status": "NEW",
        "effort": [
          "FE",
          "BE"
        ],
        "parents": [
          "AMC-12560"
        ],
        "estimation": 0,
        "mvp": {
          "name": "Enhacements",
          "id": 4
        },
        "asignee": {
          "name": "--",
          "role": [
            "FE"
          ]
        }
      },
      {
        "title": "[DEV] Edit Reports",
        "code": "AMC-GGGGGG",
        "link": "https://projects.mbww.com/browse/AMC-GGGGGG",
        "description": "BE: Incluir grupos en el endpoint que se consume para editar el reporte",
        "status": "NEW",
        "effort": [
          "FE",
          "BE"
        ],
        "parents": [
          "AMC-MMMMM"
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
        "title": "[QA] Certification - Summary",
        "code": "AMC-OOOOO",
        "link": "https://projects.mbww.com/browse/AMC-OOOOO",
        "description": "[QA] Certification - Summary",
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
      },
      {
        "title": "[DEV] Edit Template",
        "code": "AMC-XXXXXX",
        "link": "https://projects.mbww.com/browse/AMC-XXXXXX",
        "description": "[BE] Modificar endpoint para editar el template",
        "status": "NEW",
        "effort": [
          "FE",
          "DE"
        ],
        "parents": [
          "AMC-101010"
        ],
        "estimation": 0,
        "mvp": {
          "name": "Enhacements",
          "id": 4
        },
        "asignee": {
          "name": "--",
          "role": [
            "FE"
          ]
        }
      },
      {
        "title": "[DEV] Create Report from Template",
        "code": "AMC-202020",
        "link": "https://projects.mbww.com/browse/AMC-202020",
        "description": "[DEV] Create Report from Template",
        "status": "NEW",
        "effort": [
          "FE"
        ],
        "parents": [
          "AMC-101010"
        ],
        "estimation": 0,
        "mvp": {
          "name": "Enhacements",
          "id": 4
        },
        "asignee": {
          "name": "--",
          "role": [
            "FE"
          ]
        }
      },
      {
        "title": "[QA] Template Certification",
        "code": "AMC-444444",
        "link": "https://projects.mbww.com/browse/AMC-444444",
        "description": "[QA] Template Certification",
        "status": "NEW",
        "effort": [
          "QA"
        ],
        "parents": [
          "AMC-XXXXXX",
          "AMC-202020"
        ],
        "estimation": 0,
        "mvp": {
          "name": "Enhacements",
          "id": 4
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

  PROJECT2: any = {
    "name": "Report Template shared access",
    "leader": "Luis Hernandez",
    "tickets": [
      {
        "title": "Add option to mark report template as public when creating/editing",
        "code": "1.1",
        "link": "",
        "description": "Add option to mark report template as public when creating/editing",
        "status": "NEW",
        "effort": [
          "BE",
          "FE",
          "QA"
        ],
        "parents": [],
        "estimation": 0,
        "mvp": {
          "name": "MAKE PUBLIC",
          "id": 1
        },
        "asignee": {
          "name": "",
          "role": []
        }
      },
      {
        "title": "[DEV] Enable user access to report templates that are marked as public.",
        "code": "1.2",
        "link": "",
        "description": "[DEV] Enable user access to report templates that are marked as public.",
        "status": "NEW",
        "effort": [
          "BE",
          "QA"
        ],
        "parents": ["1.1"],
        "estimation": 0,
        "mvp": {
          "name": "MAKE PUBLIC",
          "id": 1
        },
        "asignee": {
          "name": "",
          "role": []
        }
      },
      {
        "title": "[DEV] Create report template read-only module.",
        "code": "1.3",
        "link": "",
        "description": "[DEV] Create report template read-only module.",
        "status": "NEW",
        "effort": [
          "FE",
          "QA"
        ],
        "parents": [],
        "estimation": 0,
        "mvp": {
          "name": "MAKE PUBLIC",
          "id": 1
        },
        "asignee": {
          "name": "",
          "role": []
        }
      },
      {
        "title": "[SPIKE] Testing the core user information endpoint.",
        "code": "1.4",
        "link": "",
        "description": "[SPIKE] Testing the core user information endpoint.",
        "status": "NEW",
        "effort": [
          "BE",
          "QA"
        ],
        "parents": [],
        "estimation": 0,
        "mvp": {
          "name": "MAKE PUBLIC",
          "id": 1
        },
        "asignee": {
          "name": "",
          "role": []
        }
      },
      {
        "title": "[DEV] Create endpoint to consult/register the users to whom the report template has been shared.",
        "code": "2.1",
        "link": "",
        "description": "[DEV] Create endpoint to consult/register the users to whom the report template has been shared.",
        "status": "NEW",
        "effort": [
          "BE",
          "QA"
        ],
        "parents": [],
        "estimation": 0,
        "mvp": {
          "name": "SPECIFIC USERS",
          "id": 2
        },
        "asignee": {
          "name": "",
          "role": []
        }
      },
      {
        "title": "[DEV] Create to stop sharing the report template process.",
        "code": "2.2",
        "link": "",
        "description": "[DEV] Create to stop sharing the report template process.",
        "status": "NEW",
        "effort": [
          "BE",
          "QA"
        ],
        "parents": [],
        "estimation": 0,
        "mvp": {
          "name": "SPECIFIC USERS",
          "id": 2
        },
        "asignee": {
          "name": "",
          "role": []
        }
      },
      {
        "title": "[DEV] Enable access to report template by specific users.",
        "code": "2.3",
        "link": "",
        "description": "[DEV] Enable access to report template by specific users.",
        "status": "NEW",
        "effort": [
          "BE",
          "QA"
        ],
        "parents": [],
        "estimation": 0,
        "mvp": {
          "name": "Creation",
          "id": 2
        },
        "asignee": {
          "name": "",
          "role": []
        }
      },
      {
        "title": "[DEV] Create modal to share report template.",
        "code": "2.4",
        "link": "",
        "description": "[DEV] Create modal to share report template.",
        "status": "NEW",
        "effort": [
          "BE",
          "QA"
        ],
        "parents": ["1.4", "2.1"],
        "estimation": 0,
        "mvp": {
          "name": "SPECIFIC USERS",
          "id": 2
        },
        "asignee": {
          "name": "",
          "role": []
        }
      },
      {
        "title": "[DEV] Add option to stop sharing report template in modal.",
        "code": "2.5",
        "link": "",
        "description": "[DEV] Add option to stop sharing report template in modal.",
        "status": "NEW",
        "effort": [
          "BE",
          "QA"
        ],
        "parents": ["2.2"],
        "estimation": 0,
        "mvp": {
          "name": "SPECIFIC USERS",
          "id": 2
        },
        "asignee": {
          "name": "",
          "role": []
        }
      },
      {
        "title": "[DEV] Create notification where the comment is included when sharing the report template by specific users.",
        "code": "3.1",
        "link": "",
        "description": "[DEV] Create notification where the comment is included when sharing the report template by specific users.",
        "status": "NEW",
        "effort": [
          "BE",
          "QA"
        ],
        "parents": ["2.4", "1.4"],
        "estimation": 0,
        "mvp": {
          "name": "NOTIFICATION",
          "id": 3
        },
        "asignee": {
          "name": "",
          "role": []
        }
      },
      {
        "title": "[DEV] Create notification when sharing report template by specific users.",
        "code": "3.2",
        "link": "",
        "description": "[DEV] Create notification when sharing report template by specific users.",
        "status": "NEW",
        "effort": [
          "BE",
          "QA"
        ],
        "parents": ["2.1"],
        "estimation": 0,
        "mvp": {
          "name": "NOTIFICATION",
          "id": 3
        },
        "asignee": {
          "name": "",
          "role": []
        }
      },
    ]
  }

  project!: IProject;

  csv = `CODE;ASIGNEE;TITLE;ESTIMATION;STATUS;EFFORT;PARENTS;MVP
AMC-12443;Luis Hernandezs,BE;[SPIKE] Groups in report builder Data Structure;5;DONE;BE;;1,Setup
AMC-12458;Andres Avendaño,FE;[DEV] Create a Feature Flag;2;DONE;FE,BE;;1,Setup
AMC-12446;Andres Avendaño,FE;[DEV] Chips on the overview Panel;3;PROGRESS;FE;AMC-12458,AMC-12443;2,Creation
AMC-12524;Juan Casas,FE;[POC] Change D3 bar charts to pure HTML/CSS;2;DONE;BE;;1,Setup
AMC-12530;Juan Casas,FE;[DEV] Change D3 bar charts on Profile Report;5;NEW;FE;AMC-12524;3,Summary - Export
AMC-12598;--,FE;[DEV] Change D3 bar charts on Composition Report;0;NEW;FE;AMC-12524;3,Summary - Export
AMC-12509;--,BE;[DEV] Modify Profile Report Data Structure;5;NEW;BE;AMC-12443;1,Setup
AMC-12649;--,BE;[DEV] Modify Audience Composition Report Data Structure;0;NEW;BE;AMC-12443;1,Setup
AMC-12442;--,BE;[DEV] Endpoint to calculate Group Size - Report Builder;5;NEW;BE;AMC-12509;2,Creation
AMC-11191;Carlos Angulo,FE;[DEV] Modify Datasource Panel;3;DONE;FE;AMC-12458;2,Creation
AMC-12450;--,FE;[DEV] Overview Panel;5;NEW;FE;AMC-12446,AMC-11191,AMC-12649,AMC-12509,AMC-12442;2,Creation
AMC-12560;--,FE;[DEV] Saving groups in reports;0;NEW;FE;AMC-12450;2,Creation
AMC-MMMMM;--,FE;[QA] Creation Certification;0;NEW;FE;AMC-12560;2,Creation
AMC-12503;--,FE;[DEV] Table - Profile Report Summary;0;NEW;FE;AMC-MMMMM,AMC-12530;3,Summary - Export
AMC-12151;--,FE;[DEV] Graph - Profile Report Summary;0;NEW;FE;AMC-MMMMM,AMC-12530;3,Summary - Export
AMC-12118;--,FE;[DEV] Graph - Composition Report Summary.;8;NEW;FE;AMC-MMMMM,AMC-12598;3,Summary - Export
AMC-AAAAA;--,FE;[DEV] Export Composition Report;0;NEW;FE;AMC-12118;3,Summary - Export
AMC-BBBBB;--,FE;[DEV] Export Profile Report;0;NEW;FE;AMC-12151;3,Summary - Export
AMC-OOOOO;--,FE;[QA] Summary Certification;0;NEW;FE;AMC-BBBBB,AMC-AAAAA,AMC-12503;3,Summary - Export`;

  constructor(readonly nodeTreeService: NodeTreeService, readonly CSVParser: CSVParserService) {
    const localStorageProject: any = localStorage.getItem('project');
    if (localStorageProject) {
      this.project = JSON.parse(localStorageProject);
    } else {
      this.project = this.PROJECT;
    }

    const csvPrimitive = CSVParser.csvToArray(this.csv);
    const csvParsed = CSVParser.parseArray(csvPrimitive)
    // console.log(this.PROJECT.tickets[1])
    // console.log(csvParsed[1]);
    // console.log(this.jsonToCSV(this.PROJECT))
  }

  ngOnInit(): void {
    this.projectLoaded = this.nodeTreeService.isProjectLoaded;
  }

  get projectValue () {
    return JSON.stringify(this.project, null, 2);
  }

  jsonToCSV(project: IProject): string {
    const header = 'CODE;ASIGNEE;TITLE;ESTIMATION;STATUS;EFFORT;PARENTS;MVP';
    const csv = project.tickets.map(ticket => `${ticket.code};${ticket.asignee.name},${ticket.asignee.role.join(',')};${ticket.title};${ticket.estimation};${ticket.status};${ticket.effort?.join(',')};${ticket.parents.join(',')};${ticket.mvp.id},${ticket.mvp.name}`
    );
    return header + '\n' + csv.join('\n');
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
    // this.download(this.jsonToCSV(this.PROJECT), 'proyecto.csv', 'csv')
  }

  onClose() {
    this.onCancel.next(false)
  }

  download(data:string, filename:string, type:string) {
    var file = new Blob([data], {type: type});
    var a = document.createElement("a"),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);  
    }, 0);
  }

}
