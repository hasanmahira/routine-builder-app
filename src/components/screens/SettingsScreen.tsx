import * as React from "react";
import { RouteProp } from "@react-navigation/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";
import { signOut } from "../../services/auth";
import { purchasePremium, restorePurchases } from "../../services/payment";
import { setTheme, getTheme, Theme } from "../../services/theme";
import { scheduleNotification, cancelAllNotifications } from "../../services/notifications";
import { logEvent } from "../../services/analytics";

type SettingsScreenProps = {
  route: RouteProp<MainStackParamList, "Settings">;
  navigation: FrameNavigationProp<MainStackParamList, "Settings">;
};

export function SettingsScreen({ navigation }: SettingsScreenProps) {
  const [theme, setCurrentTheme] = React.useState<Theme>(getTheme());
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    setCurrentTheme(newTheme);
    logEvent("theme_changed", { theme: newTheme });
  };

  const handleNotificationToggle = async (enabled: boolean) => {
    setNotificationsEnabled(enabled);
    if (enabled) {
      await scheduleNotification("Routine Reminder", "Time to check your routines!", new Date(Date.now() + 24 * 60 * 60 * 1000));
    } else {
      await cancelAllNotifications();
    }
    logEvent("notifications_toggled", { enabled });
  };

  const handleUpgradeSubscription = async () => {
    const success = await purchasePremium();
    if (success) {
      logEvent("subscription_upgraded");
      // Update UI or user state to reflect premium status
    }
  };

  const handleRestorePurchases = async () => {
    const restored = await restorePurchases();
    if (restored) {
      logEvent("purchases_restored");
      // Update UI or user state to reflect restored purchases
    }
  };

  // ... rest of the component remains the same, update UI to include new options
}