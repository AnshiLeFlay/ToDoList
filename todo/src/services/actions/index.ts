//constants
export const ADD_NEW_TASK = "ADD_NEW_TASK";
export const CHANGE_COMPLETE = "CHANGE_COMPLETE";
export const DELETE_TASK = "DELETE_TASK";
export const CHANGE_CURRENT_TASK = "CHANGE_CURRENT_TASK";
export const UPDATE_DATA_TREE = "UPDATE_DATA_TREE";
export const ADD_TASK_TO_DATA_TREE = "ADD_TASK_TO_DATA_TREE";

//interfaces
export interface IAddNewTask {
    readonly type: typeof ADD_NEW_TASK;
    position?: number;
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

export interface IChangeCurrentTask {
    readonly type: typeof CHANGE_CURRENT_TASK;
    position: number;
}

export interface IUpdateDataTree {
    readonly type: typeof UPDATE_DATA_TREE;
    project: number;
    data: any;
}

export interface IAddTaskToDataTree {
    readonly type: typeof ADD_TASK_TO_DATA_TREE;
    project: number;
    position: number;
    data: string;
}

//types
export type TActions =
    | IAddNewTask
    | IChangeComplete
    | IDeleteTask
    | IChangeCurrentTask
    | IUpdateDataTree
    | IAddTaskToDataTree;

//enhancers
