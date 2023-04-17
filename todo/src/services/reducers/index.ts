import {
    ADD_NEW_TASK,
    CHANGE_COMPLETE,
    CHANGE_CURRENT_TASK,
    DELETE_TASK,
    TActions,
} from "../actions";

interface ITask {
    caption: string;
    completed: boolean;
}

type TInitialState = {
    projects: any;
    tasks: Array<ITask> | [];
    n: number;
    currentTask: number | null;
};

//структура таски

const initialState: TInitialState = {
    projects: [
        [
            {
                key: '1',
                title: 'first task',
                children: [
                    {
                        key: '1-1',
                        title: 'first first task',
                        children: []
                    },
                ]
            },
            {
                key: '2',
                title: 'asdasd task',
                children: []
            },
            {
                key: '3',
                title: 'fikkkkkkkkkrst task',
                children: []
            },
            {
                key: '4',
                title: 'first sdkalsdkals kdlasdklasdtask',
                children: []
            },
        ],
    ],
    tasks: [],
    n: 15,
    currentTask: null,
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
            if (state.tasks[action.position]?.completed) payload = false;

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
                tasks: [...state.tasks.filter((v, i) => i !== action.position)],
            };
        }
        case CHANGE_CURRENT_TASK: {
            return {
                ...state,
                currentTask: action.position,
            };
        }
        default: {
            return {
                ...state,
            };
        }
    }
};
