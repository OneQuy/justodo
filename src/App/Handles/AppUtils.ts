import { TaskPersistedData } from "../Types"

const IsLog = false

export const IsTaskPersistedDataEqual = (firstTask: TaskPersistedData, secondTAsk: TaskPersistedData): boolean => {
    return firstTask.uniqueTaskName === secondTAsk.uniqueTaskName
}

export const CalcTargetFlex = (firstTask: TaskPersistedData, currentTask: TaskPersistedData): number => {
    return currentTask.uniqueTaskName.length / firstTask.uniqueTaskName.length;
}
