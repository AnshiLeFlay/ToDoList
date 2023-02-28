import {
    ADD_NEW_TASK,
    CHANGE_COMPLETE,
    DELETE_TASK,
    TActions,
} from "../actions";

interface ITask {
    caption: string;
    completed: boolean;
}

type TInitialState = {
    tasks: Array<ITask> | [];
    n: number;
};

const initialState: TInitialState = {
    tasks: [],
    n: 15,
};

export const appReducer = (
    state = initialState,
    action: TActions
): TInitialState => {
    switch (action.type) {
        case ADD_NEW_TASK: {
            return {
                ...state,
                tasks: [
                    ...state.tasks,
                    { caption: action.caption, completed: false },
                ],
            };
        }
        case CHANGE_COMPLETE: {
            const tasks = state.tasks;
            if (tasks[action.position].completed)
                tasks[action.position].completed = false;
            else tasks[action.position].completed = true;

            return {
                ...state,
                tasks: tasks,
            };
        }
        case DELETE_TASK: {
            const tasks = state.tasks;
            tasks.splice(action.position, 1);

            return {
                ...state,
                tasks: tasks,
            };
        }
        default: {
            return {
                ...state,
            };
        }
    }
};
