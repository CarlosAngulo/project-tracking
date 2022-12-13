export const PROJECT: any = {
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
        "status": "DONE",
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
        "status": "DONE",
        "effort": [
          "FE"
        ],
        "parents": [
          "AMC-12524"
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
        "title": "[DEV] Modify Profile Report Data Structure",
        "code": "AMC-12509",
        "link": "https://projects.mbww.com/browse/AMC-12509",
        "description": "[DEV] Modify Profile Report Data Structure",
        "status": "DONE",
        "effort": [
          "BE"
        ],
        "parents": [
          "AMC-12443"
        ],
        "estimation": 8,
        "mvp": {
          "name": "Creation",
          "id": 2
        },
        "asignee": {
          "name": "Harold Meriño",
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
        "status": "DONE",
        "effort": [
          "BE"
        ],
        "parents": [
          "AMC-12443"
        ],
        "estimation": 8,
        "mvp": {
          "name": "Creation",
          "id": 2
        },
        "asignee": {
          "name": "Jose Castiblanco",
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
        "status": "DONE",
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
          "name": "Luis Hernandez",
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
        "status": "DONE",
        "effort": [
          "FE"
        ],
        "parents": [
          "AMC-12446",
          "AMC-11191"
        ],
        "estimation": 5,
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
        "title": "[DEV] Saving groups in reports",
        "code": "AMC-12560",
        "link": "https://projects.mbww.com/browse/AMC-12560",
        "description": "[DEV] Saving groups in reports",
        "status": "DONE",
        "effort": [
          "FE"
        ],
        "parents": [
          "AMC-12450",
          "AMC-12649",
          "AMC-12509"
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
        "title": "[DEV] Modify data structure for Templates",
        "code": "AMC-12808",
        "link": "https://projects.mbww.com/browse/AMC-12808",
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
          "name": "Templates",
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
        "code": "AMC-12811",
        "link": "https://projects.mbww.com/browse/AMC-12811",
        "description": "[DEV] Save as Template",
        "status": "NEW",
        "effort": [
          "FE",
          "BE"
        ],
        "parents": [
          "AMC-12808"
        ],
        "estimation": 0,
        "mvp": {
          "name": "Templates",
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
        "title": "[DEV] Refresh Reports",
        "code": "AMC-12809",
        "link": "https://projects.mbww.com/browse/AMC-12809",
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
          "name": "Templates",
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
        "title": "Certification MVP Creation",
        "code": "AMC-12191",
        "link": "https://projects.mbww.com/browse/AMC-12191",
        "description": "Certifcation MVP Creation",
        "status": "PROGRESS",
        "effort": [
          "QA"
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
          "name": "Mariana Alzate",
          "role": [
            "QA"
          ]
        },
        "type": "e2e"
      },
      {
        "title": "[DEV] Edit Profile Reports",
        "code": "AMC-12810",
        "link": "https://projects.mbww.com/browse/AMC-12810",
        "description": "BE: Incluir grupos en el endpoint que se consume para editar el reporte",
        "status": "NEW",
        "effort": [
          "FE",
          "BE"
        ],
        "parents": [
          "AMC-12191"
        ],
        "estimation": 0,
        "mvp": {
          "name": "Summary - Export",
          "id": 3
        },
        "asignee": {
          "name": "David Quintero",
          "role": [
            "FE"
          ]
        }
      },
      {
        "title": "[DEV] Edit Composition Reports",
        "code": "AMC-12812",
        "link": "https://projects.mbww.com/browse/AMC-12812",
        "description": "BE: Incluir grupos en el endpoint que se consume para editar el reporte",
        "status": "NEW",
        "effort": [
          "FE",
          "BE"
        ],
        "parents": [
          "AMC-12191"
        ],
        "estimation": 0,
        "mvp": {
          "name": "Summary - Export",
          "id": 3
        },
        "asignee": {
          "name": "David Quintero",
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
        "status": "PROGRESS",
        "effort": [
          "FE"
        ],
        "parents": [
          "AMC-12191",
        ],
        "estimation": 8,
        "mvp": {
          "name": "Summary - Export",
          "id": 3
        },
        "asignee": {
          "name": "Jenny Zapata",
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
        "status": "PROGRESS",
        "effort": [
          "FE"
        ],
        "parents": [
          "AMC-12191",
          "AMC-12530"
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
        "title": "[DEV] Graph - Composition Report Summary.",
        "code": "AMC-12118",
        "link": "https://projects.mbww.com/browse/AMC-12118",
        "description": "[DEV] Graph - Composition Report Summary.",
        "status": "PROGRESS",
        "effort": [
          "FE"
        ],
        "parents": [
          "AMC-12191",
        ],
        "estimation": 8,
        "mvp": {
          "name": "Summary - Export",
          "id": 3
        },
        "asignee": {
          "name": "Andres Avendaño",
          "role": [
            "FE"
          ]
        }
      },
      {
        "title": "[DEV] Export Composition Report",
        "code": "AMC-12779",
        "link": "https://projects.mbww.com/browse/AMC-12779",
        "description": "[DEV] Export Composition report",
        "status": "NEW",
        "effort": [
          "BE",
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
          "name": "Fabian Herrera",
          "role": [
            "BE"
          ]
        }
      },
      {
        "title": "[DEV] Export Profile Report",
        "code": "AMC-12778",
        "link": "https://projects.mbww.com/browse/AMC-12778",
        "description": "[DEV] Export Profile Report",
        "status": "NEW",
        "effort": [
          "BE"
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
          "name": "Fabian Herrera",
          "role": [
            "BE"
          ]
        }
      },
      {
        "title": "[QA] Certification - Summary",
        "code": "AMC-12828",
        "link": "https://projects.mbww.com/browse/AMC-12828",
        "description": "[QA] Certification - Summary",
        "status": "NEW",
        "effort": [
          "QA"
        ],
        "parents": [
          "AMC-12778",
          "AMC-12779",
          "AMC-12503",
          "AMC-12810",
          "AMC-12812"
        ],
        "estimation": 0,
        "mvp": {
          "name": "Summary - Export",
          "id": 3
        },
        "asignee": {
          "name": "--",
          "role": [
            "QA"
          ]
        },
        "type": "e2e"
      },
      {
        "title": "[DEV] Edit Template",
        "code": "AMC-12816",
        "link": "https://projects.mbww.com/browse/AMC-12816",
        "description": "[BE] Modificar endpoint para editar el template",
        "status": "NEW",
        "effort": [
          "FE",
          "DE"
        ],
        "parents": [
          "AMC-12811"
        ],
        "estimation": 0,
        "mvp": {
          "name": "Templates",
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
        "code": "AMC-12814",
        "link": "https://projects.mbww.com/browse/AMC-12814",
        "description": "[DEV] Create Report from Template",
        "status": "NEW",
        "effort": [
          "FE"
        ],
        "parents": [
          "AMC-12811"
        ],
        "estimation": 0,
        "mvp": {
          "name": "Templates",
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
        "code": "AMC-12815",
        "link": "https://projects.mbww.com/browse/AMC-12815",
        "description": "[QA] Template Certification",
        "status": "NEW",
        "effort": [
          "QA"
        ],
        "parents": [
          "AMC-12814",
          "AMC-12816",
          "AMC-12809"
        ],
        "estimation": 0,
        "mvp": {
          "name": "Templates",
          "id": 4
        },
        "asignee": {
          "name": "--",
          "role": [
            "FE"
          ]
        },
        "type": "e2e"
      },
      {
        "title": "[QA] End to End Review",
        "code": "AMC-12817",
        "link": "https://projects.mbww.com/browse/AMC-12817",
        "description": "[QA] End to End Review",
        "status": "NEW",
        "effort": [
          "QA"
        ],
        "parents": [
          "AMC-12815",
          "AMC-12828",
        ],
        "estimation": 0,
        "mvp": {
          "name": "Templates",
          "id": 4
        },
        "asignee": {
          "name": "--",
          "role": [
            "FE"
          ]
        },
        "type": "e2e"
      }
    ]
  }