import { DocumentReference } from "@angular/fire/compat/firestore";

type TImportType = 'JSON' | 'CSV';

export const ImportType = {
    json: <TImportType> 'JSON',
    csv: <TImportType> 'CSV'
};

export interface IPerson {
    id: string;
    name: string;
    active?: boolean;
    companies?: string[];
    projects?: string[];
    roles?: string[];
}

export interface IRawProject {
    docId: string;
    leader: string;
    name: string;
    tickets: DocumentReference[];
}
export interface IProject {
    docId: string;
    leader: string;
    name: string;
    tickets: INode[];
}

export interface INode {
    id: string;
    title?: string;
    code?: string;
    link?: string;
    description?: string;
    status: INodeStatus;
    estimation: number;
    effort?: IRoles[];
    parents: string[];
    treeParents?: string[];
    assigned?: any;
    position: {x: number, y: number};
    level: number;
    index: number;
    paretsPosition?: IRelativesPos[];
    children: string[];
    childrenTree: string[][];
    childrenTreeSimple: string[][];
    childrenWidth: number;
    selected: boolean;
    blockedByParents: boolean;
    test?: any;
    type?: INodeType;
    order: number;
    enabled: boolean;
    mvp: {
        name: string;
        id: number;
    };
}
  
export interface IRelativesPos {
    id: string;
    x: number;
    y: number;
    arrow?: {
        top: number;
        left: number;
        width: number;
        height: number;
    }
}
  
export interface IBoxconstraintsPx {
    left: string,
    top: string,
    width: string,
    height: string
}
  
export type INodeStatus = 'NEW' | 'DONE' | 'BLOCKED' | 'PROGRESS' | 'UNDEFINED' | 'REVIEW'
  
export const NodeStatus = {
    undefined: <INodeStatus> 'UNDEFINED',
    new: <INodeStatus> 'NEW',
    done: <INodeStatus> 'DONE',
    progress: <INodeStatus> 'PROGRESS',
    review: <INodeStatus> 'REVIEW',
    blocked: <INodeStatus> 'BLOCKED'
};

type INodeType = 'DEVELOPMENT' | 'E2E' | 'DONE' | 'POC'
  
export const NodeType = {
    development: <INodeType> 'DEVELOPMENT',
    e2e: <INodeType> 'E2E',
    spike: <INodeType> 'DONE',
    poc: <INodeType> 'POC',
};

export interface IBlockStatus {
    name: string,
    count: number,
    points: number
}
  
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

export interface Iconstraints {
    top: number;
    left: number;
    bottom: number;
    right: number;
}