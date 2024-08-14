// NUMBER OF [CHANGE HERE]: 1

import { SplashScreenLoaderResult, SubscribedData } from "./SpecificType";
import { FirebaseInit } from "./Firebase/Firebase";
import { CheckIsDevAsync } from "./IsDev";
import { GetRemoteConfigWithCheckFetchAsync } from "./RemoteConfig";
import { InitUserIDAsync } from "./UserID";
import { FetchUserDataOnNewlyInstall } from "./FetchUserDataOnNewlyInstall";
import { StorageKey_SubscribeData } from "../App/Constants/StorageKey";
import { CheckSetStartUsingAppTickAsync, ClearAllFilesAndStorageAsync } from "./SpecificUtils";
import { GetObjectAsync } from "./AsyncStorageUtils";

export async function SplashScreenLoader(): Promise<SplashScreenLoaderResult> {
    // firebase init (for retrieving remote config, firebase db,...)
    FirebaseInit()

    // cheat clear all files and storage
    await ClearAllFilesAndStorageAsync(true) // ND

    ///////////////////////////
    // CHANGE HERE 1 (ALL BELOW)
    ///////////////////////////

    await Promise.all([
        // remote config & alert
        GetRemoteConfigWithCheckFetchAsync(false, true), // alert_priority_1 (doc)

        // user id (for trackings)
        InitUserIDAsync(), // ND
    ])

    await Promise.all([
        // check is dev (for initting PostHogProvider, trackings)
        CheckIsDevAsync(), // (must after GetRemoteConfigWithCheckFetchAsync, InitUserIDAsync)
    ])

    // app specific: fetch newly user data (premium,...)

    await FetchUserDataOnNewlyInstall.CheckFetchAsync([
        // {
        //     storageKey: StorageKey_PopularityIndex,
        //     firebasePath: GetUserPropertyFirebasePath(UserSelectedPopularityIndexProperty),
        // }
    ]) // ND // alert_priority_fetch_error_user_newly_install (doc)

    const subscribedDataOrUndefined = await GetObjectAsync<SubscribedData>(StorageKey_SubscribeData) // must after: FetchUserDataOnNewlyInstall.CheckFetchAsync

    // app specific: set start using app

    await CheckSetStartUsingAppTickAsync() // alert_priority_set_start_using_app (doc)

    // return

    return {
        subscribedDataOrUndefined
        
        // someVariable: 7,
    } as SplashScreenLoaderResult
}