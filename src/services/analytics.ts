import { Analytics } from '@nativescript/firebase/analytics';

export const logEvent = async (eventName: string, params?: { [key: string]: any }) => {
  await Analytics.logEvent({
    key: eventName,
    parameters: params,
  });
};

export const setUserProperty = async (name: string, value: string) => {
  await Analytics.setUserProperty(name, value);
};