import { ReactNode, createContext, useContext } from "react";

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