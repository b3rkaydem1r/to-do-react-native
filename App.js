import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import Home from './src/home/home'
import Profile from './src/profile/profile'
import NewReminder from './src/reminders/newReminder/newReminder'
import EditReminder from './src/reminders/editReminder/editReminder'
import ViewReminder from './src/reminders/viewReminder/viewReminder'
import Login from './src/auth/login/login'
import Register from './src/auth/register/register'
import ChangePassword from './src/profile/password/change-password'
import Gallery from './src/profile/gallery/gallery'
import PushNotification from "react-native-push-notification"
import PushNotificationIOS from "@react-native-community/push-notification-ios"
import AsyncStorage from '@react-native-community/async-storage'


const Stack = createStackNavigator()

function LoggedIn() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home" screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
      }}>
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="profile" component={Profile} />
        <Stack.Screen name="new" component={NewReminder} />
        <Stack.Screen name="edit" component={EditReminder} />
        <Stack.Screen name="view" component={ViewReminder} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="register" component={Register} />
        <Stack.Screen name="change-password" component={ChangePassword} />
        <Stack.Screen name="gallery" component={Gallery} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

function LogInRequire() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login" screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
      }}>
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="profile" component={Profile} />
        <Stack.Screen name="new" component={NewReminder} />
        <Stack.Screen name="edit" component={EditReminder} />
        <Stack.Screen name="view" component={ViewReminder} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="register" component={Register} />
        <Stack.Screen name="change-password" component={ChangePassword} />
        <Stack.Screen name="gallery" component={Gallery} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

function App() {
  // Must be outside of any component LifeCycle (such as `componentDidMount`).
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      console.log("TOKEN:", token);
    },

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);

      // process the notification

      // (required) Called when a remote is received or opened, or local notification is opened
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {
      console.log("ACTION:", notification.action);
      console.log("NOTIFICATION:", notification);

      // process the action
    },

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function (err) {
      console.error(err.message, err);
    },

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: Platform.OS === 'ios',
  })

  const [checkLogin, setLogin] = useState(true)
  useEffect(() => {
    async function loginCheck() {
      const user_token = await AsyncStorage.getItem('@user_token')
      if (user_token) {
        setLogin(true)
      }
      else {
        setLogin(false)
      }
    }
    loginCheck()
  })
  if (checkLogin == true) {
    return (
      <LoggedIn />
    )
  } else {
    return (
      <LogInRequire />
    )
  }
}

export default App
