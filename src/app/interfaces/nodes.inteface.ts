export interface IProject {
    leader: string;
    name: string;
    tickets: INode[];
}

export interface INode {
    title?: string;
    code: string;
    link?: string;
    description?: string;
    status: INodeStatus;
    estimation?: number;
    effort?: IRoles[];
    parents: string[];
    treeParents?: string[];
    asignee: IDeveloper;
    position: {x: number, y: number};
    level: number;
    index: number;
    paretsPosition?: IRelativesPos[];
    children: string[];
    childrenTree: string[][];
    selected: boolean;
    blockedByParents: boolean;
    test?: any;
    mvp: {
        name: string;
        id: number;
    };
}
  
export interface IRelativesPos {
    code: string;
    x: number;
    y: number;
    arrow?: {
        top: number;
        left: number;
        width: number;
        height: number;
    }
}
  
export interface IBoxConstrainsPx {
    left: string,
    top: string,
    width: string,
    height: string
}
  
type INodeStatus = 'NEW' | 'DONE' | 'BLOCKED' | 'PROGRESS'
  
export const NodeStatus = {
    new: <INodeStatus> 'NEW',
    done: <INodeStatus> 'DONE',
    progress: <INodeStatus> 'PROGRESS',
    blocked: <INodeStatus> 'BLOCKED'
};
  
type IRoles = 'BE' | 'FE' | 'QA';
  
const Roles = {
    backend: <IRoles> 'BE',
    frontend: <IRoles> 'FE',
    quality: <IRoles> 'QA',
}
  
export interface IDeveloper {
    name: string;
    role: IRoles[];
    initial?: string;
}
