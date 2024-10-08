import { SafeAreaView, StyleSheet, StatusBar, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Color_BG } from './src/App/Hooks/useTheme'
import useAsyncHandle from './src/Common/Hooks/useAsyncHandle'
import { SplashScreenLoader } from './src/Common/SplashScreenLoader'
import SplashScreen from './src/Common/Components/SplashScreen'
import { PostHogProvider } from 'posthog-react-native'
import { GetAlternativeConfig } from './src/Common/RemoteConfig'
import { GetBooleanAsync, SetBooleanAsync } from './src/Common/AsyncStorageUtils'
import { StorageKey_ShowedWelcomeScreen } from './src/App/Constants/StorageKey'
import WelcomeScreen from './src/App/Screens/WelcomeScreen'
import { PostHogKey_Production } from './Keys'
import HomeScreen from './src/App/Screens/HomeScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const App = () => {
  const { result } = useAsyncHandle(async () => SplashScreenLoader());
  const [showWelcomeScreen, set_showWelcomeScreen] = useState(false)
  const didShowedWelcomeScreenRef = useRef(false)

  const style = useMemo(() => {
    return StyleSheet.create({
      master: { flex: 1 }
    })
  }, [])

  const onPressStartWelcomeScreen = useCallback(() => {
    SetBooleanAsync(StorageKey_ShowedWelcomeScreen, true)
    set_showWelcomeScreen(false)
  }, [])

  // check to show welcome screen

  useEffect(() => {
    (async () => {
      const showedWelcomeScreen = await GetBooleanAsync(StorageKey_ShowedWelcomeScreen)

      if (!showedWelcomeScreen) {
        set_showWelcomeScreen(true)
      }
    })()
  }, [])

  // splash screen

  if (!result)
    return <SplashScreen />

  // welcome screen

  if (showWelcomeScreen && !result.subscribedDataOrUndefined) {
    didShowedWelcomeScreenRef.current = true

    return (
      <SafeAreaView style={style.master}>
        <StatusBar backgroundColor={Color_BG} barStyle={'light-content'} />
        <WelcomeScreen onPressStart={onPressStartWelcomeScreen} />
      </SafeAreaView>
    )
  }

  // main app render

  const postHogAutocapture = GetAlternativeConfig('postHogAutoCapture', false)

  return (
    <PostHogProvider apiKey={PostHogKey_Production} autocapture={postHogAutocapture}>
      <SafeAreaProvider>
        <View style={style.master}>
          {/* <StatusBar translucent backgroundColor="transparent" /> */}
          {/* main UI app */}
          <HomeScreen
            shouldShowPaywallFirstTime={didShowedWelcomeScreenRef.current && !result.subscribedDataOrUndefined}
          />
        </View>
      </SafeAreaProvider>
    </PostHogProvider>
  )
}

export default App