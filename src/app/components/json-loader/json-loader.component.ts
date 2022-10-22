import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-json-loader',
  templateUrl: './json-loader.component.html',
  styleUrls: ['./json-loader.component.scss']
})
export class JsonLoaderComponent implements OnInit {
  @Output() onLoad: EventEmitter<any> = new EventEmitter();
  @Output() onCancel: EventEmitter<boolean> = new EventEmitter();

  parseJSONError = false;

  project = {    
    tickets : [
      {
        title: 'Feature Leading Tasks',
        code: 'AMC-12159',
        link: 'https://projects.mbww.com/browse/AMC-12159',
        description: 'Ticket description',
        status: 'DONE',
        effort: ['BE'],
        position: {x: 0, y:0},
        blockedByParents: false,
        selected: false,
        index: 0,
        level: 0,
        children: [],
        childrenTree: [],
        parents: [],
        estimation: 5,
        mvp: {
          name: 'Setup',
          id: 1,
        },
        asignee: {
          name: 'Carlos Angulo',
          role: ['FE'],
        }
      },
      {
        title: 'SPIKE - Create a backward compatible data structure',
        code: 'AMC-12443',
        link: 'https://projects.mbww.com/browse/AMC-12443',
        description: 'Ticket description',
        status: 'DONE',
        effort: ['BE'],
        position: {x: 0, y:0},
        blockedByParents: false,
        selected: false,
        index: 0,
        level: 0,
        children: [],
        childrenTree: [],
        parents: ['AMC-12159'],
        estimation: 5,
        mvp: {
          name: 'Setup',
          id: 1,
        },
        asignee: {
          name: 'Luis Hernandez',
          role: ['BE'],
        }
      },
      {
        title: 'Add Feature Flag',
        code: 'AMC-12458',
        link: 'https://projects.mbww.com/browse/AMC-12458',
        description: 'Ticket description',
        status: 'PROGRESS',
        effort: ['BE'],
        position: {x: 0, y:0},
        blockedByParents: false,
        selected: false,
        index: 0,
        level: 0,
        children: [],
        childrenTree: [],
        parents: ['AMC-12159'],
        estimation: 2,
        mvp: {
          name: 'Setup',
          id: 1,
        },
        asignee: {
          name: 'Carlos Angulo',
          role: ['FE'],
        }
      },
      {
        title: 'Modify Report data structure',
        code: 'AMC-12191',
        link: 'https://projects.mbww.com/browse/AMC-12191',
        description: 'Ticket description',
        status: 'DONE',
        effort: ['BE'],
        position: {x: 0, y:0},
        blockedByParents: false,
        selected: false,
        index: 0,
        level: 0,
        children: [],
        childrenTree: [],
        parents: ['AMC-12159'],
        estimation: 3,
        mvp: {
          name: 'Setup',
          id: 1,
        },
        asignee: {
          name: 'Carlos Angulo',
          role: ['FE'],
        }
      },
      {
        title: 'Create endpoint to calculate group sizes',
        code: 'AMC-12442',
        link: 'https://projects.mbww.com/browse/AMC-12442',
        description: 'Ticket description',
        status: 'BLOCKED',
        effort: ['BE'],
        position: {x: 0, y:0},
        blockedByParents: false,
        selected: false,
        index: 0,
        level: 0,
        children: [],
        childrenTree: [],
        parents: ['AMC-12191'],
        estimation: 5,
        mvp: {
          name: 'Report View',
          id: 3,
        },
        asignee: {
          name: 'Carlos Angulo',
          role: ['FE'],
        }
      },
      {
        title: 'Modify Datasources panel',
        code: 'AMC-11191',
        link: 'https://projects.mbww.com/browse/AMC-11191',
        description: 'Ticket description',
        status: 'NEW',
        effort: ['BE'],
        position: {x: 0, y:0},
        blockedByParents: false,
        selected: false,
        index: 0,
        level: 0,
        children: [],
        childrenTree: [],
        parents: ['AMC-12XXX'],
        estimation: 5,
        mvp: {
          name: 'Export',
          id: 4,
        },
        asignee: {
          name: 'Carlos Angulo',
          role: ['FE'],
        }
      },
      {
        title: 'Modify Overview panel',
        code: 'AMC-12450',
        link: 'https://projects.mbww.com/browse/AMC-12450',
        description: 'Ticket description',
        status: 'PROGRESS',
        effort: ['FE'],
        position: {x: 0, y:0},
        blockedByParents: false,
        selected: false,
        index: 0,
        level: 0,
        children: [],
        childrenTree: [],
        parents: ['AMC-12191'],
        estimation: 1,
        mvp: {
          name: 'Creation',
          id: 2,
        },
        asignee: {
          name: 'Carlos Angulo',
          role: ['FE'],
        }
      },
      {
        title: 'Modify the attribute chips',
        code: 'AMC-12446',
        link: 'https://projects.mbww.com/browse/AMC-12446',
        description: 'Ticket description',
        status: 'PROGRESS',
        effort: ['BE'],
        position: {x: 0, y:0},
        blockedByParents: false,
        selected: false,
        index: 0,
        level: 0,
        children: [],
        childrenTree: [],
        parents: ['AMC-12442'],
        estimation: 1,
        mvp: {
          name: 'Report View',
          id: 3,
        },
        asignee: {
          name: 'Carlos Angulo',
          role: ['FE'],
        }
      },
      {
        title: 'Edit Reports',
        code: 'AMC-12XXX',
        link: 'https://projects.mbww.com/browse/AMC-12XXX',
        description: 'Ticket description',
        status: 'PROGRESS',
        effort: ['BE'],
        position: {x: 0, y:0},
        blockedByParents: false,
        selected: false,
        index: 0,
        level: 0,
        children: [],
        childrenTree: [],
        parents: ['AMC-1XXXX'],
        estimation: 1,
        mvp: {
          name: 'Export',
          id: 4,
        },
        asignee: {
          name: 'Carlos Angulo',
          role: ['FE'],
        }
      },
      {
        title: 'Next ticket',
        code: 'AMC-1XXXX',
        link: 'https://projects.mbww.com/browse/AMC-1XXXX',
        description: 'Ticket description',
        status: 'DONE',
        effort: ['BE'],
        position: {x: 0, y:0},
        blockedByParents: false,
        selected: false,
        index: 0,
        level: 0,
        children: [],
        childrenTree: [],
        parents: [],
        estimation: 1,
        mvp: {
          name: 'Export',
          id: 4,
        },
        asignee: {
          name: 'Carlos Angulo',
          role: ['FE'],
        }
      },
      {
        title: 'Add MORE TST',
        code: 'AMC-AAAA',
        link: 'https://projects.mbww.com/browse/AMC-AAAA',
        description: 'Ticket description',
        status: 'NEW',
        effort: ['BE'],
        position: {x: 0, y:0},
        blockedByParents: false,
        selected: false,
        index: 0,
        level: 0,
        children: [],
        childrenTree: [],
        parents: ['AMC-12191'],
        estimation: 1,
        mvp: {
          name: 'Report View',
          id: 3,
        },
        asignee: {
          name: 'Carlos Angulo',
          role: ['FE'],
        }
      },
      {
        title: 'Add MORE TST',
        code: 'AMC-BBB',
        link: 'https://projects.mbww.com/browse/AMC-BBB',
        description: 'Ticket description',
        status: 'NEW',
        effort: ['BE'],
        position: {x: 0, y:0},
        blockedByParents: false,
        selected: false,   
        index: 0,
        level: 0,
        children: [],
        childrenTree: [],
        parents: ['AMC-12443'],
        estimation: 1,
        mvp: {
          name: 'Creation',
          id: 2,
        },
        asignee: {
          name: 'Carlos Angulo',
          role: ['FE'],
        }
      },
      {
        title: 'Add MORE TST',
        code: 'AMC-CCC',
        link: 'https://projects.mbww.com/browse/AMC-CCC',
        description: 'Ticket description',
        status: 'NEW',
        effort: ['BE'],
        position: {x: 0, y:0},
        blockedByParents: false,
        selected: false,   
        index: 0,
        level: 0,
        children: [],
        childrenTree: [],
        parents: ['AMC-12443'],
        estimation: 1,
        mvp: {
          name: 'Creation',
          id: 2,
        },
        asignee: {
          name: 'Carlos Angulo',
          role: ['FE'],
        }
      },
      {
        title: 'Add MORE TST',
        code: 'AMC-EEE',
        link: 'https://projects.mbww.com/browse/AMC-CCC',
        description: 'Ticket description',
        status: 'NEW',
        effort: ['BE'],
        position: {x: 0, y:0},
        blockedByParents: false,
        selected: false,   
        index: 0,
        level: 0,
        children: [],
        childrenTree: [],
        parents: ['AMC-12442', 'AMC-12450'],
        estimation: 1,
        mvp: {
          name: 'Report View',
          id: 3,
        },
        asignee: {
          name: 'Carlos Angulo',
          role: ['FE'],
        }
      },
      {
        title: 'Add MORE TST',
        code: 'AMC-FFF',
        link: 'https://projects.mbww.com/browse/AMC-FFF',
        description: 'Ticket description',
        status: 'NEW',
        effort: ['BE'],
        position: {x: 0, y:0},
        blockedByParents: false,
        selected: false,   
        index: 0,
        level: 0,
        children: [],
        childrenTree: [],
        parents: ['AMC-EEE'],
        estimation: 1,
        mvp: {
          name: 'Certification',
          id: 5,
        },
        asignee: {
          name: 'Carlos Angulo',
          role: ['FE'],
        }
      },
      {
        title: 'Add MORE TST',
        code: 'AMC-GGG',
        link: 'https://projects.mbww.com/browse/AMC-GGG',
        description: 'Ticket description',
        status: 'NEW',
        effort: ['BE'],
        position: {x: 0, y:0},
        blockedByParents: false,
        selected: false,   
        index: 0,
        level: 0,
        children: [],
        childrenTree: [],
        parents: ['AMC-AAAA', 'AMC-11191'],
        estimation: 1,
        mvp: {
          name: 'Certification',
          id: 5,
        },
        asignee: {
          name: 'Carlos Angulo',
          role: ['FE'],
        }
      },
      {
        title: 'Add MORE TST',
        code: 'AMC-HHH',
        link: 'https://projects.mbww.com/browse/AMC-HHH',
        description: 'Ticket description',
        status: 'NEW',
        effort: ['BE'],
        position: {x: 0, y:0},
        blockedByParents: false,
        selected: false,   
        index: 0,
        level: 0,
        children: [],
        childrenTree: [],
        parents: ['AMC-11191', 'AMC-GGG'],
        estimation: 1,
        mvp: {
          name: 'Certification',
          id: 5,
        },
        asignee: {
          name: 'Carlos Angulo',
          role: ['FE'],
        }
      }
    ]
  }

  constructor() { }

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
    this.onLoad.next(this.project)
  }

  onClose() {
    this.onCancel.next(false)
  }

  ngOnInit(): void {
  }

}
