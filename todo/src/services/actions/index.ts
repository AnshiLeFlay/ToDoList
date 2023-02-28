//constants
export const ADD_NEW_TASK = 'ADD_NEW_TASK';
export const CHANGE_COMPLETE = 'CHANGE_COMPLETE';
export const DELETE_TASK = 'DELETE_TASK';

//interfaces
export interface IAddNewTask {
    readonly type: typeof ADD_NEW_TASK;
    caption: string;
}

export interface IChangeComplete {
    readonly type: typeof CHANGE_COMPLETE;
    position: number;
}

export interface IDeleteTask { 
    readonly type: typeof DELETE_TASK;
    position: number;
}

//types
export type TActions = IAddNewTask | IChangeComplete | IDeleteTask;

//enhancers