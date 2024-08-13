// CHANGE OPTIONAL TO EACH TYPE
//
// Created on 17 may 2024 (Coding Vocaby)

import { TrackingValuesObject } from "./Tracking"

export type RemoteConfig = { // CHANGE OPTIONAL
    // common

    forceDev: number,

    developerNote?: {
        android?: DeveloperNote,
        ios?: DeveloperNote,
    }

    reviewingVersion: {
        android: number,
        ios: number,
    }

    remoteFiles?: object,

    tracking?: {
        aptabaseProductionKey?: string,
        aptabaseIgnores?: string,
        aptabaseRemoveIgnores?: string,

        firebaseRootOrErrorIgnores?: string,

        enableAptabase?: boolean,
        enableFirebase?: boolean,
        enablePosthog?: boolean,
    },

    latestVersion: {
        android: LatestVersionConfig,
        ios: LatestVersionConfig,
    },

    alternativeValue?: Record<string, string>,

    // ads: {
    //     newDayFree: number,
    //     loop: number,
    // },

    // startupAlert?: {
    //     maxVersion: number,
    //     id: string,
    //     title: string,
    //     content: string,
    //     allowEnterApp: boolean,
    //     buttonLink: string,
    //     buttonLinkTitle: string,
    //     showUpdateButton: boolean,
    //     okTitle: string,
    // },

    // specific

    currentLifetimeId: string,
    saleEndTick?: number,

    // specific app

    redirectService?: string,

    enableGeminiHelper?: number,
}

export type TruelyValueType = number | string | object | boolean

type LatestVersionConfig = { // MAYBE NO CHANGE
    version: number,
    forceUpdate: boolean,
    releaseNote: string,
    dayDiffToAsk: number,
    required: number,
}


export type DeveloperNote = { // MAYBE NO CHANGE
    maxVersion: number,
    isPressToOpenStore: number,
    content: string,
    color: string,
    link: string,
}


export type SplashScreenLoaderResult = { // CHANGE OPTIONAL
    // common

    subscribedDataOrUndefined: SubscribedData | undefined,
}


export type SubscribedData = { // MAYBE NO CHANGE
    id: string,
    purchasedTick: number
}

export const UserForcePremiumDataProperty = 'forcePremiumData' // NO CHANGE
export const UserPremiumDataProperty = 'premiumData' // CHANGE OPTIONAL
export const UserSelectedPopularityIndexProperty = 'popularityIdx' // CHANGE OPTIONAL

export const UserProperty_StartUsingAppTick = 'startUsingAppTick' // CHANGE OPTIONAL


export type User = { // CHANGE OPTIONAL
    // common

    [UserForcePremiumDataProperty]: SubscribedData,

    // specific

    [UserPremiumDataProperty]?: SubscribedData,
    [UserSelectedPopularityIndexProperty]?: number,
    [UserProperty_StartUsingAppTick]?: number,
}

export type ContactType = 'email' | 'twitter_app' | 'twitter_onequy' // MAYBE NO CHANGE

export type OnSetSubcribeDataAsyncFuncParam = string | SubscribedData | undefined // MAYBE NO CHANGE
export type OnSetSubcribeDataAsyncFunc = (subscribedData: OnSetSubcribeDataAsyncFuncParam) => Promise<void> // MAYBE NO CHANGE

export type AppContextType = { // CHANGE OPTIONAL
    // common

    subscribedData: SubscribedData | undefined,
    isReviewMode: boolean,
    onSetSubcribeDataAsync: OnSetSubcribeDataAsyncFunc,
} // REMERBER: add to DefaultAppContext (src/Common/SpecificConstants.ts)


export interface NotificationTrackData extends TrackingValuesObject { // NO CHANGE
    eventType: string;
    status: string,
    background: boolean;
    eventTime: string;

    /**
     * no_data if no notification data
     */
    targetTime: string;

    /**
     * -1 if no notification data
     */
    offsetInSec: number;
}

export interface ExtendNotificationTrackData extends NotificationTrackData { // CHANGE OPTIONAL
    /**
     * 'no_data' if having no notification data
     */
    // [NotificationExtraDataKey_Mode]: string;

    // [NotificationExtraDataKey_PushIndex]: number;

    // [NotificationExtraDataKey_IsLastPush]: number;
}