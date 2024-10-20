import * as React from "react";
import { RouteProp } from "@react-navigation/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";
import { signUp } from "../../services/auth";

type SignUpScreenProps = {
  route: RouteProp<MainStackParamList, "SignUp">;
  navigation: FrameNavigationProp<MainStackParamList, "SignUp">;
};

export function SignUpScreen({ navigation }: SignUpScreenProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
      navigation.navigate("Home");
    } catch (e) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <scrollView className="p-4">
      <label className="text-2xl font-bold mb-4">Sign Up</label>
      <textField
        className="border-b-2 border-gray-300 p-2 mb-4"
        hint="Email"
        keyboardType="email"
        value={email}
        onTextChange={(args) => setEmail(args.value)}
      />
      <textField
        className="border-b-2 border-gray-300 p-2 mb-4"
        hint="Password"
        secure={true}
        value={password}
        onTextChange={(args) => setPassword(args.value)}
      />
      {error ? <label className="text-red-500 mb-4">{error}</label> : null}
      <button
        className="bg-blue-500 text-white p-4 rounded-lg mb-4"
        onTap={handleSignUp}
      >
        Sign Up
      </button>
      <button
        className="text-blue-500 p-4"
        onTap={() => navigation.navigate("SignIn")}
      >
        Already have an account? Sign In
      </button>
    </scrollView>
  );
}