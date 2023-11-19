import { ReactNode, createContext } from "react";

type Timer = {
    name: string;
    duration: number;
}

type TimersState = {
    isRunning: boolean;
    timers: Timer[];
}

type TimersContextValue = TimersState & {
    addTimer: (timerData: Timer) => void,
    startTimers: () => void,
    stopTimers: () => void
}

const TimersContext = createContext<TimersContextValue | null>(null);

type TimersContextProviderProps = {
    children: ReactNode
}

export function TimersContextProvider({children}: TimersContextProviderProps ) {

    const ctx: TimersContextValue = {
        timers: [],
        isRunning: false,
        addTimer(timerData) {
            // ...
        },
        startTimers() {
            // ...
        },
        stopTimers() {
            // ..
        }
    }

    return <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
}