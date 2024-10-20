import React from "react";
import { Alert } from "react-native";
import { LoginKey } from "queries/auth/keys";
import { useGetUserInfo } from "queries/auth/useGetUserInfo";
import { useLogin } from "queries/auth/useLogin";
import { Controller, useForm } from "react-hook-form";
import { Button, Input, Text, YStack } from "tamagui";
import { useAuthStore } from "zustand/auth/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  initialLoginFormValue,
  loginFormSchema,
  LoginFormType,
} from "./helpers";

const LoginScreen = () => {
  const { setUser, setTokens } = useAuthStore();
  const { data: userinfo, onGetUserInfo } = useGetUserInfo();

  const { onLogin } = useLogin({
    onSuccess: (data) => {
      const { accessToken, refreshToken } = data.result;
      Alert.alert("Login Success", "You have successfully logged in", [
        {
          text: accessToken,
          onPress: () => console.log("OK Pressed"),
        },
      ]);
      AsyncStorage.setItem("accessToken", accessToken).catch((error) => {
        console.error("Failed to save access token:", error);
      });
      setTokens(accessToken, refreshToken);

      if (accessToken) {
        onGetUserInfo().catch((error) => {
          console.error("Failed to get user info:", error);
        });
        console.log("🚀 ~ LoginScreen ~ userinfo:", userinfo);
      }
    },
    onError: (error) => {
      console.error("Login failed:", error);
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
