import { TaskPersistedData } from "../Types"

const IsLog = false

export const CalcTargetFlex = (firstTask: TaskPersistedData, currentTask: TaskPersistedData): number => {
    return currentTask.uniqueTaskName.length / firstTask.uniqueTaskName.length;
}
