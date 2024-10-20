import { LocalNotifications } from '@nativescript/local-notifications';

export const scheduleNotification = async (title: string, body: string, at: Date) => {
  await LocalNotifications.schedule([{
    id: Math.round(Math.random() * 10000),
    title,
    body,
    at,
  }]);
};

export const cancelAllNotifications = async () => {
  await LocalNotifications.cancelAll();
};