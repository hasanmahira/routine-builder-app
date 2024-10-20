import * as React from "react";
import { RouteProp } from "@react-navigation/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";
import { signIn } from "../../services/api";
import { validateEmail, validatePassword } from "../../utils/validation";
import { logEvent } from "../../services/analytics";

type SignInScreenProps = {
  route: RouteProp<MainStackParamList, "SignIn">;
  navigation: FrameNavigationProp<MainStackParamList, "SignIn">;
};

export function SignInScreen({ navigation }: SignInScreenProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSignIn = async () => {
    if (!validateEmail(email)) {
      setError("Invalid email address");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters long");
      return;
    }

    try {
      const user = await signIn(email, password);
      logEvent("user_sign_in", { email });
      navigation.navigate("Home");
    } catch (e) {
      setError("Invalid email or password");
    }
  };

  // ... rest of the component remains the same
}