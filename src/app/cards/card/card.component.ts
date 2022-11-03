import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IBoxconstraintsPx, IRelativesPos, INode, NodeStatus } from 'src/app/interfaces/nodes.inteface';
import { cardProps } from './card.props';

export interface ISVGCoords {
  x1: number,
  y1: number,
  x2: number,
  y2: number
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, AfterViewInit {
  @ViewChild('card') card!: ElementRef; 
  @Output() selectNode: EventEmitter<string> = new EventEmitter();
  @Output() infoNode: EventEmitter<INode> = new EventEmitter();
  @Input() set node(nodeData: INode) {
    this.nodeData = {...nodeData};
    this.nodeData.paretsPosition?.forEach( parent => this.calculateArrows(parent, cardProps.height));
  };

  nodeStatus = NodeStatus;
  nodeData!:INode;
  arrowContainerStyles: IBoxconstraintsPx[] = [];
  arrowViewBox: string[] = [];
  svgCoords: ISVGCoords[]  = [];
  bezierCoords: {M: number[], c: number[][]}[] = [];
  bezierCoordString!: string[];
  bezier: boolean[] = [];
  childLeft: boolean = false;
  cardHeight = 0;

  constructor() { }

  ngAfterViewInit(): void {
    this.cardHeight = this.card.nativeElement.clientHeight;
  }

  calculateArrows(parent: IRelativesPos, cardHeight: number) {
    let left = parent.x + (cardProps.width/2);
    let top = parent.y + cardHeight - 5;
    let width = Math.abs(this.nodeData.position.x - parent.x);
    let height = Math.abs(this.nodeData.position?.y - parent.y - cardHeight) + 5;

    this.svgCoords.push({
      x1: 0,
      y1: 0,
      x2: 100,
      y2: 100
    });

    this.bezierCoords.push({
      M: [1, 0],
      c: [[1, height/2], [width-1, height/2], [width-1, height]]
    })

    const index = this.svgCoords.length - 1;
    this.bezier[index] = true;

    if (parent.x === this.nodeData.position.x) {
      width = 4;
      this.svgCoords[index].x1 = 0;
      this.svgCoords[index].x2 = 0;
      this.bezier[index] = false;
    }

    if (parent.x > this.nodeData.position.x) {
      left = this.nodeData.position.x + (cardProps.width/2);
      width = Math.abs(parent.x - this.nodeData.position.x);
      this.svgCoords[index] = {
        x1: 100,
        y1: 0,
        x2: 0,
        y2: 100
      }
      this.bezierCoords[index] = {
        M: [1, height],
        c: [[1, -height/2], [width-1, -height/2], [width-1, -height]]
      }
    }

    if (parent.y === this.nodeData.position.y) {
      height = 4;
      this.childLeft = true;
      top = parent.y + cardHeight/2 - 3;
      this.svgCoords[index].x1 = 0;
      this.svgCoords[index].x2 = 100;
      this.svgCoords[index].y1 = 0;
      this.svgCoords[index].y2 = 0;
      this.bezier[index] = false;
    }

    if (parent.y > this.nodeData.position.y) {
      top = this.nodeData.position.y + cardHeight/2 - 3;
      height = parent.y - this.nodeData.position.y;
      left = parent.x + cardProps.width;
      width = this.nodeData.position.x - left;
      this.bezierCoords[index] = {
        M: [0, height],
        c: [[width/2, 0], [width/2, -height], [width, -height]]
      }
      this.bezier[index] = true;
    }

    this.arrowContainerStyles.push({
      left:`${left}px`,
      top:`${top}px`,
      width:`${width + 1}px`,
      height:`${height}px`,
    })

    this.arrowViewBox.push(`0 0 
      ${width} 
      ${height}
    `);

    this.bezierCoordString = this.bezierCoords.map((coord) =>`
      M ${coord.M.toString()} 
      c ${coord.c.map(c=>c.toString()).join(' ')}
    `)
  }

  ngOnInit(): void {
  }

  onNodeClick() {}

  onTreeClick() {
    this.selectNode.next(this.nodeData.code);
  }

  onInfoClick() {
    this.infoNode.next(this.nodeData);
  }
  
}
