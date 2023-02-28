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
            let payload = true;
            if (state.tasks[action.position].completed) payload = false;

            return {
                ...state,
                tasks: state.tasks.map((task, index) =>
                    index === action.position
                        ? { ...task, completed: payload }
                        : task
                ),
            };
        }
        case DELETE_TASK: {
            return {
                ...state,
                tasks: [...state.tasks.slice(0, action.position)],
            };
        }
        default: {
            return {
                ...state,
            };
        }
    }
};
