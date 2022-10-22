import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, auditTime, map } from 'rxjs';
import { WINDOW } from './window.service';

export interface WindowSize {
    height: number,
    width: number
};

@Injectable({
  providedIn: 'root'
})
export class ResizeService {
    readonly windowSizeChanged = new BehaviorSubject<WindowSize>(<WindowSize>{
        width: this.window.innerWidth,
        height: this.window.innerHeight
    });
    
    constructor(@Inject(WINDOW) public window: Window) {
        fromEvent(window, 'resize')
        .pipe(
            auditTime(100),
            map((event:any) => <WindowSize>{ 
                width: event['currentTarget'].innerWidth, 
                height: event['currentTarget'].innerHeight
            })).subscribe(ws => {
            this.windowSizeChanged.next(ws);
        })

    };
}
