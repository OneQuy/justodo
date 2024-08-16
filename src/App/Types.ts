export type TaskPersistedData = {
    name: string,
}

export type TaskRuntimeData = {
    targetFlex: number,
}

export type TaskPersistedAndRuntimeData = {
    persistedData: TaskPersistedData,
    runtimeData?: TaskRuntimeData,
}