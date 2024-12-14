import React from "react";
import { useNavigation } from "@react-navigation/native";
import { LoginKey } from "queries/auth/keys";
import { useGetUserInfo } from "queries/auth/useGetUserInfo";
import { useLogin } from "queries/auth/useLogin";
import { Controller, useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { Button, Input, Text, YStack } from "tamagui";
import { useAuthStore } from "zustand/auth/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SCREENS } from "@shared-constants";
import {
  initialLoginFormValue,
  loginFormSchema,
  LoginFormType,
} from "./helpers";

const LoginScreen = () => {
  const navigation = useNavigation();
  const { setUser, setTokens } = useAuthStore();
  const { onGetUserInfo } = useGetUserInfo({
    onSuccess: (data) => {
      console.log("User info:", data);
      setUser(data);
      navigation.navigate({ name: SCREENS.ROOT });
    },
    onError: (error) => {
      console.error("Failed to fetch user info:", error);
    },
  });

  const { onLogin } = useLogin({
    onSuccess: (data) => {
      const { accessToken, refreshToken } = data.result;

      // Show toast notification
      Toast.show({
        type: "success",
        text1: "Login Successful",
        text2: "Welcome back to the app!",
      });

      // Save tokens to AsyncStorage
      AsyncStorage.setItem("accessToken", accessToken).catch((error) => {
        console.error("Failed to save access token:", error);
      });

      // Save tokens to state
      setTokens(accessToken, refreshToken);

      // Fetch user info if access token is available
      if (accessToken) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        onGetUserInfo();
      }
    },
    onError: (error) => {
      console.error("Login failed:", error);

      // Show error toast
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: error.message || "Something went wrong. Please try again.",
      });
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    defaultValues: initialLoginFormValue,
    mode: "onChange",
    shouldFocusError: true,
    reValidateMode: "onChange",
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = (data: LoginFormType) => {
    console.log("🚀 ~ onSubmit ~ data:", data);

    onLogin(data);
    // eslint-disable-next-line react-hooks/rules-of-hooks
  };

  return (
    <YStack
      flex={1}
      justifyContent="center"
      alignItems="center"
      padding="$4"
      backgroundColor="$backgroundSoft"
    >
      <Text fontSize={24} fontWeight="bold" marginBottom="$4">
        Login
      </Text>

      <Controller
        name={LoginKey.USERNAME}
        control={control}
        render={({ field }) => (
          <Input
            onChangeText={field.onChange}
            value={field.value}
            placeholder="Email"
            marginBottom="$4"
            padding="$2"
            width="80%"
          />
        )}
      />
      {errors.username && <Text color="red">{errors.username.message}</Text>}
      <Controller
        name={LoginKey.PASSWORD}
        control={control}
        render={({ field }) => (
          <Input
            onChangeText={field.onChange}
            value={field.value}
            placeholder="Password"
            secureTextEntry
            marginBottom="$4"
            padding="$2"
            width="80%"
          />
        )}
      />
      {errors.password && <Text color="red">{errors.password.message}</Text>}

      <Button
        onPress={handleSubmit(onSubmit)}
        padding="$2"
        width="80%"
        backgroundColor="$primary"
      >
        <Text color="$white" fontWeight="bold">
          Login
        </Text>
      </Button>
    </YStack>
  );
};

export default LoginScreen;
