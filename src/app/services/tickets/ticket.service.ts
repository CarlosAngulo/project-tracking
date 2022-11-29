import { Injectable } from '@angular/core';

export class Ticket {
    children: string[] = [];
    childrenTree: string[][] = [];
    childrenTreeSimple: string[][] = [];
    index: number = 0;
    level: number = 0;
    childrenWidth: number = 0;
    enabled: boolean = true;
    position = {x: 0, y:0, offsetX: 0};
    blockedByParents = false;
    selected = false;
    constructor(
        title: string,
        code: 
    ) {

    }
}

@Injectable({
  providedIn: 'root'
})
export class TicketService {
    
}