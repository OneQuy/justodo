import { AppState, AppStateStatus } from "react-native"

var inited = false
const arrCallbacks: AppStateCallback[] = []

type AppStateCallback = (state: AppStateStatus) => void

const onChangedState = (state: AppStateStatus) => {
    for (let i = 0; i < arrCallbacks.length; i++)
        arrCallbacks[i](state)
}

const CheckInitAppStateMan = () => {
    if (inited)
        return

    // console.log('[CheckInitAppStateMan] initing...');
    
    inited = true
    AppState.addEventListener('change', onChangedState)
}

export const RegisterOnChangedState = (callback: AppStateCallback) => {
    // throw new Error('Not InitAppStateMan yet')
    CheckInitAppStateMan()

    const idx = arrCallbacks.indexOf(callback)

    if (idx >= 0)
        return

    arrCallbacks.push(callback)
}

export const UnregisterOnChangedState = (callback: AppStateCallback) => {
    // if (!inited)
    //     throw new Error('Not InitAppStateMan yet')

    const idx = arrCallbacks.indexOf(callback)

    if (idx < 0)
        return

    arrCallbacks.splice(idx, 1)
}