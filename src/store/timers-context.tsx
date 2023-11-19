import { ReactNode, createContext, useContext, useReducer } from "react";

type Timer = {
    name: string;
    duration: number;
}

type TimersState = {
    isRunning: boolean;
    timers: Timer[];
}

const initialState: TimersState = {
    isRunning: true,
    timers: []
}

type TimersContextValue = TimersState & {
    addTimer: (timerData: Timer) => void,
    startTimers: () => void,
    stopTimers: () => void
}

const TimersContext = createContext<TimersContextValue | null>(null);

// We create this custom hook to access TimersContext in a type-safe way!
// This way we can tell Typescript that our variable should not be null at the
// point it's getting used.
export function useTimersContext() {
    const timersCtx = useContext(TimersContext)

    if (timersCtx === null) {
        throw new Error('TemerContext is null - that should not happen!!')
    }

    return timersCtx
}

type TimersContextProviderProps = {
    children: ReactNode
}

type Action = {
    type: 'ADD_TIMER' | 'START_TIMERS' | 'STOP_TIMERS';
}

function timersReducer(state: TimerState, action: Action): TimerState {
    if (action.type === 'START_TIMERS') {
        return {
            ...state,
            isRunning: true
        }
    }
    if (action.type === 'STOP_TIMERS') {
			return {
				...state,
				isRunning: false,
			};
		}
    if (action.type === 'ADD_TIMER') {
			return {
				...state,
				timers: [
                    ...state.timers,
                    {
                        name,
                        duration
                    }
                ]
			};
		}
}

export function TimersContextProvider({children}: TimersContextProviderProps ) {

    const [timersState, dispatch] = useReducer(timersReducer, initialState)

    const ctx: TimersContextValue = {
        timers: [],
        isRunning: false,
        addTimer(timerData) {
            dispatch({ type: 'ADD_TIMER' });
        },
        startTimers() {
            dispatch({ type: 'START_TIMERS' });
        },
        stopTimers() {
            dispatch({ type: 'STOP_TIMERS' });
        }
    }

    return <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
}