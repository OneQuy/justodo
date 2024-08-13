// NUMBER OF [CHANGE HERE] 5
//
// Created on 17 may 2024 (Coding Vocaby)

import { Alert, Linking, Platform, Share } from "react-native"
import { AndroidLink, AppName, ShareAppContent, TwitterUrl, iOSLink } from "./SpecificConstants"
import { Event, EventType } from "@notifee/react-native"
import { AppDirName, DelayAsync, IsValuableArrayOrString, RegexUrl, SafeValue, ToCanPrint } from "./UtilsTS"
import { GenerateNotificationTrackDataAsync } from "./Nofitication"
import { ContactType, DeveloperNote, OnSetSubcribeDataAsyncFunc, RemoteConfig, UserProperty_StartUsingAppTick, ExtendNotificationTrackData } from "./SpecificType"
import { AppendArrayAsync, GetArrayAsync_PickAndRemoveFirstOne } from "./AsyncStorageUtils"
import { StorageKey_CacheEventNotification, StorageKey_StartUsingAppTick } from "../App/Constants/StorageKey"
import { HandleError, TrackEventNotificationAsync, TrackPress, TrackSimpleWithParam } from "./Tracking"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { DeleteFileAsync, DeleteTempDirAsync } from "./FileUtils"
import { Cheat } from "./Cheat"
import { CanNotSetupUserData, LocalText, PopupTitleError, RetryText } from "../App/Hooks/useLocalText"
import { GetAlternativeConfig, GetRemoteConfigWithCheckFetchAsync } from "./RemoteConfig"
import { VersionAsNumber } from "./CommonConstants"
import { RevenueCat } from "./RevenueCat/RevenueCat"
import { LocalFirstThenFirebaseValue } from "./Firebase/LocalFirstThenFirebaseValue"
import { GetUserPropertyFirebasePath } from "./UserMan"
import { InternetTime } from "./InternetTime"
import Clipboard from "@react-native-community/clipboard"

// const IsLog = __DEV__
const IsLog = false

export async function OpenStoreAsync() {
    const link = Platform.OS === 'android' ? AndroidLink : iOSLink
    await Linking.openURL(link)
}

export async function OpenStoreForRatingAsync() {
    TrackPress('rating')

    await OpenStoreAsync()
}

export const ShareAppAsync = async () => {
    await Share.share({
        title: AppName,
        message: ShareAppContent,
    })
}

export const PressContactAsync = async (
    texts: LocalText,
    type: ContactType,
) => {
    if (type === 'email') { // email
        Clipboard.setString('onequy@gmail.com')
        Alert.alert(texts.copied)
    }
    else if ( // social links
        type === 'twitter_app' ||
        type === 'twitter_onequy'
    ) {
        let url

        if (type === 'twitter_app')
            url = GetAlternativeConfig('twitterUrl', TwitterUrl)
        else if (type === 'twitter_onequy')
            url = GetAlternativeConfig('twitterOneQuyUrl', 'https://x.com/onequy')
        else
            throw new Error('[ne] onPressContact ' + type)

        if (await Linking.canOpenURL(url))
            await Linking.openURL(url)
        else {
            Clipboard.setString(url)
            Alert.alert(texts.copied)
        }
    }
    else
        throw new Error('[ne] onPressContact ' + type)

    TrackSimpleWithParam('contact', type, true)
}

export async function ClearAllFilesAndStorageAsync(onlyWhenCheatOrForceClear: boolean): Promise<void> {
    if (onlyWhenCheatOrForceClear) {
        if (!Cheat('clear_all_file_and_data'))
            return
    }

    // clear storage

    await AsyncStorage.clear()

    // clear temp dir files

    await DeleteTempDirAsync()

    // clear app dir files

    await DeleteFileAsync(AppDirName, true);

    if (IsLog) {
        console.log('[ClearAllFilesAndStorageAsync] DID CLEAR ALL FILES AND STORAGE!')
    }
}

export const IsReviewingVersion = (remoteConfig: RemoteConfig | undefined): boolean => {
    const reviewingVersion = SafeValue(
        Platform.OS === 'android' ?
            remoteConfig?.reviewingVersion.android :
            remoteConfig?.reviewingVersion.ios,
        0)

    return reviewingVersion > 0 && VersionAsNumber >= reviewingVersion
}

export const IsNewUpdateAvailableAsync = async (): Promise<boolean> => {
    const data = (await GetRemoteConfigWithCheckFetchAsync())?.latestVersion

    if (!data)
        return false

    if (Platform.OS === 'android')
        return VersionAsNumber < data.android.version
    else
        return VersionAsNumber < data.ios.version
}

export const GetCalbackDeveloperNote = (developerNote: DeveloperNote): undefined | (() => void) => {
    if (!developerNote.isPressToOpenStore && !RegexUrl(developerNote.link))
        return undefined

    else {
        return () => {
            if (developerNote.isPressToOpenStore)
                OpenStoreAsync()
            else
                Linking.openURL(developerNote.link)
        }
    }
}

export const GetDeveloperNoteAsync = async (): Promise<undefined | DeveloperNote> => {
    const remoteConfig = await GetRemoteConfigWithCheckFetchAsync()

    const developerNote = Platform.OS === 'android' ?
        remoteConfig?.developerNote?.android :
        remoteConfig?.developerNote?.ios

    if (!developerNote)
        return undefined

    const maxVersion = typeof developerNote.maxVersion === 'number' ? developerNote.maxVersion : 0

    if (VersionAsNumber > maxVersion) {
        return undefined
    }

    if (!IsValuableArrayOrString(developerNote.content)) {
        return undefined
    }

    return developerNote
}

export const OnEventNotification = async (isBackgroundOrForeground: boolean, event: Event): Promise<void> => {
    if (event.type === EventType.TRIGGER_NOTIFICATION_CREATED)
        return

    // setup data (common, not need change)

    const baseData = await GenerateNotificationTrackDataAsync(isBackgroundOrForeground, event)

    // setup data (specific) // CHANGE HERE 1

    let setOrTestMode = 'no_data'
    let word = 'no_data'
    let pushIdx = -1
    let isLast = 0

    if (event.detail.notification) {
        // // pushIdx

        // pushIdx = SafeValue(event.detail.notification.data?.[NotificationExtraDataKey_PushIndex], -1)

        // // is last word push

        // isLast = SafeValue(event.detail.notification.data?.[NotificationExtraDataKey_IsLastPush], 0)

        // // setOrTestMode

        // setOrTestMode = SafeValue(event.detail.notification.data?.[NotificationExtraDataKey_Mode], 'unknown')

        // word

        const fullTitle = SafeValue(event.detail.notification.title, '')
        const titleSplitArr = fullTitle.split(' ')

        word = titleSplitArr.length >= 1 && titleSplitArr[0].length >= 1 ?
            titleSplitArr[0] :
            'unknown'
    }

    const objTrack: ExtendNotificationTrackData = {
        ...baseData,
        // [NotificationExtraDataKey_Mode]: setOrTestMode,
        // [NotificationExtraDataKey_PushIndex]: pushIdx,
        // [NotificationExtraDataKey_IsLastPush]: isLast,
        // word,
    }

    // cache to storage // CHANGE HERE 2

    if (setOrTestMode !== 'test') { // may change this condition
        AppendArrayAsync<ExtendNotificationTrackData>(StorageKey_CacheEventNotification, objTrack) // change type
    }

    // track on-event // CHANGE HERE 4

    await TrackEventNotificationAsync(
        objTrack,
        true,
        setOrTestMode // my change here
    )

    if (IsLog)
        console.log('[OnEventNotification]', 'tracked and cached (on event):', ToCanPrint(objTrack))
}

/**
 * tracked on CheckFireOnActiveOrUseEffectOnceWithGapAsync
 * #### note: this may a lot events so not call with [`await`]
 */
export const CheckTrackCachedNotification = async (): Promise<void> => {
    // cache to storage (not need change)

    const saved = await GetArrayAsync_PickAndRemoveFirstOne<ExtendNotificationTrackData>(StorageKey_CacheEventNotification) // CHANGE HERE 3 (change type)

    if (!saved) {
        // if (IsLog)
        //     console.log('[CheckTrackCachedNotificationAsync] no events to track from cache more')

        return
    }

    // track on event // CHANGE HERE 5

    const firstEvent = saved.firstElement

    await TrackEventNotificationAsync(
        firstEvent,
        false,
        // firstEvent[NotificationExtraDataKey_Mode] // may change here
    )

    if (IsLog)
        console.log('[CheckTrackCachedNotificationAsync] remain cached events', saved.savedArray.length, 'tracked first cached one:', ToCanPrint(firstEvent))

    // continue track next event

    if (saved.savedArray.length >= 1) {
        await DelayAsync(300)

        CheckTrackCachedNotification()
    }
}

/**
 * ### usage:
```tsx
set_isHandling(true)
const purchaseSuccess = await PurchaseAndTrackingAsync(sku, onSetSubcribeDataAsync)
set_isHandling(false)
```
 */
export const PurchaseAndTrackingAsync = async (sku: string, onSetSubcribeDataAsync: OnSetSubcribeDataAsyncFunc): Promise<boolean> => {
    let valueTracking = ''
    let purchaseSuccess = false

    const res = await RevenueCat.PurchaseAsync(sku)

    // success

    console.log('[PurchaseAndTrackingAsync] res', res)

    if (res === undefined) {
        await onSetSubcribeDataAsync({
            id: sku,
            purchasedTick: Date.now()
        })

        valueTracking = 'success_' + sku
        purchaseSuccess = true
    }

    // cancel

    else if (res === null) {
        valueTracking = 'cancel'
    }

    // error

    else {
        HandleError(res, 'BuyLifetime', true)
        valueTracking = 'error'
    }

    TrackSimpleWithParam('purchase', valueTracking, true)

    return purchaseSuccess
}

/**
 * make sure did set in order to enter the app!
 */
export const CheckSetStartUsingAppTickAsync = async (): Promise<void> => {
    const firebasePath = GetUserPropertyFirebasePath(UserProperty_StartUsingAppTick)

    await LocalFirstThenFirebaseValue.MakeSureDidSetOrSetNewAsync(
        StorageKey_StartUsingAppTick,
        firebasePath,
        async () => { return await InternetTime.LoopFetchTillSucessAsync() },
        PopupTitleError,
        CanNotSetupUserData,
        RetryText
    )
}