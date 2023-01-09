import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CSVParserService {
    constructor() {
    }

    csvToArray(str: string, delimiter: string = ';') {
        const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
        const rows = str.slice(str.indexOf("\n") + 1).split("\n");
        return rows.map((row) => {
            const values = row.split(delimiter);
            return headers.reduce((object, header, index)  =>({
                ...object,
                [header.toLowerCase()]: values[index]
            }), {});
        })
    }

    parseArray(tickets:any[]): any[]{
        return tickets.map(ticket => ({
            ...ticket,
            effort: ticket.effort.split(','),
            estimation: parseInt(ticket.estimation),
            parents: ticket.parents === '' ? [] : ticket.parents.split(','),
            description: ticket.title,
            mvp: {
                id: ticket.mvp.split(',')[0],
                name: ticket.mvp.split(',')[1],
            },
            assigned: {
                name: ticket.assigned.split(',')[0],
                role: ticket.assigned.split(',').slice(1,ticket.assigned.split(',').length)
            }
        }))
    }
}
