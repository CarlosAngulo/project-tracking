import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
    private currentZoom = 0;
    private _zoom: BehaviorSubject<number> = new BehaviorSubject(this.currentZoom);
    private zoom$: Observable<number> = this._zoom.asObservable();

    constructor() {}
    
    setZoom(evt:number) {
        this.currentZoom += evt;
        this._zoom.next(this.currentZoom);
    }

    getZoom(): Observable<number> {
        return this.zoom$;
    }
}
