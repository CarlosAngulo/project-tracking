import { Injectable } from '@angular/core';
import { INode } from '../interfaces/nodes.inteface';

interface IPrimitiveTicket {
    asignee: string;
    code: string;
    effort: string;
    estimation: string;
    parents: string;
    status: string;
    title: string;
}

@Injectable({
  providedIn: 'root'
})
export class CSVParserService {
    constructor() {
    }

    csvToArray(str: string, delimiter: string = '\t') {
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
            asignee: {
                name: ticket.asignee.split(',')[0],
                role: ticket.asignee.split(',')[1]
            }
        }))
    }
}
