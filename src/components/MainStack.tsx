import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { SignInScreen } from "./screens/SignInScreen";
import { SignUpScreen } from "./screens/SignUpScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { RoutinesScreen } from "./screens/RoutinesScreen";
import { CreateRoutineScreen } from "./screens/CreateRoutineScreen";
import { RoutineDetailsScreen } from "./screens/RoutineDetailsScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { ProgressScreen } from "./screens/ProgressScreen";
import { SocialScreen } from "./screens/SocialScreen";

const StackNavigator = stackNavigatorFactory();

export const MainStack = () => (
  <BaseNavigationContainer>
    <StackNavigator.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: true,
      }}
    >
      <StackNavigator.Screen name="SignIn" component={SignInScreen} />
      <StackNavigator.Screen name="SignUp" component={SignUpScreen} />
      <StackNavigator.Screen name="Home" component={HomeScreen} />
      <StackNavigator.Screen name="Routines" component={RoutinesScreen} />
      <StackNavigator.Screen name="CreateRoutine" component={CreateRoutineScreen} />
      <StackNavigator.Screen name="RoutineDetails" component={RoutineDetailsScreen} />
      <StackNavigator.Screen name="Settings" component={SettingsScreen} />
      <StackNavigator.Screen name="Progress" component={ProgressScreen} />
      <StackNavigator.Screen name="Social" component={SocialScreen} />
    </StackNavigator.Navigator>
  </BaseNavigationContainer>
);