/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { OrderRequest, OrderSchema } from "queries/order/type";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Button,
  Input,
  Label,
  ScrollView,
  Select,
  Text,
  YStack,
} from "tamagui";
import { zodResolver } from "@hookform/resolvers/zod";

const CheckoutScreen = () => {
  const onSubmit = () => {};

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderRequest>({
    mode: "all",
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      customerName: "",
      email: "",
      phoneNumber: "",
      address: "",
      note: "",
      orderItems: [],
      couponCode: "",
    },
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <YStack
          flex={1}
          alignItems="center"
          justifyContent="flex-start"
          padding="$4"
          backgroundColor="white"
        >
          <Text fontSize={24} fontWeight="bold" marginBottom="$4">
            Checkout
          </Text>

          {/* Customer Name */}
          <YStack width={"100%"} marginBottom="$4">
            <Label width={90} htmlFor="name">
              Name
            </Label>
            <Controller
              name={"customerName"}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Customer Name is required",
                },
              }}
              render={({ field }) => (
                <>
                  <Input
                    onChangeText={field.onChange}
                    value={field.value}
                    placeholder="Customer Name"
                    marginBottom={errors.customerName ? "0" : "$4"}
                    padding="$2"
                  />
                  {errors.customerName && (
                    <Text alignSelf="flex-start" color="red">
                      {errors.customerName.message}
                    </Text>
                  )}
                </>
              )}
            />
          </YStack>

          {/* Address */}
          <YStack width={"100%"} marginBottom="$4">
            <Label width={90} htmlFor="address">
              Address
            </Label>
            <Controller
              name={"address"}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Address is required",
                },
              }}
              render={({ field }) => (
                <Input
                  onChangeText={field.onChange}
                  value={field.value}
                  placeholder="Phone Number"
                  marginBottom={errors.phoneNumber ? "0" : "$4"}
                  padding="$2"
                  width={"100%"}
                />
              )}
            />
          </YStack>
          {errors.address && (
            <Text alignSelf="flex-start" color="red">
              {errors.address.message}
            </Text>
          )}

          {/* Phone Number */}
          <YStack width={"100%"} marginBottom="$4">
            <Label width={90} htmlFor="phoneNumber">
              Phone
            </Label>
            <Controller
              name={"phoneNumber"}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Phone number is required",
                },
              }}
              render={({ field }) => (
                <Input
                  onChangeText={field.onChange}
                  value={field.value}
                  placeholder="Phone Number"
                  marginBottom={errors.phoneNumber ? "0" : "$4"}
                  padding="$2"
                  width={"100%"}
                />
              )}
            />
          </YStack>
          {errors.phoneNumber && (
            <Text alignSelf="flex-start" color="red">
              {errors.phoneNumber.message}
            </Text>
          )}

          {/* Email */}
          <YStack width={"100%"} marginBottom="$4">
            <Label width={90} htmlFor="email">
              Email
            </Label>
            <Controller
              name={"email"}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Email is required",
                },
                pattern: {
                  value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <Input
                  onChangeText={field.onChange}
                  value={field.value}
                  placeholder="Email"
                  marginBottom={errors.email ? "0" : "$4"}
                  padding="$2"
                  width={"100%"}
                />
              )}
            />
          </YStack>
          {errors.email && (
            <Text alignSelf="flex-start" color="red">
              {errors.email.message}
            </Text>
          )}

          {/* Notes */}
          <YStack width={"100%"} marginBottom="$4">
            <Label width={90} htmlFor="note">
              Notes
            </Label>
            <Controller
              name={"note"}
              control={control}
              render={({ field }) => (
                <Input
                  onChangeText={field.onChange}
                  value={field.value}
                  placeholder="Notes (Optional)"
                  multiline
                  numberOfLines={4}
                  padding="$2"
                  width={"100%"}
                />
              )}
            />
          </YStack>

          {/* Submit Button */}
          <Button
            onPress={handleSubmit(onSubmit)}
            padding="$2"
            width={"100%"}
            backgroundColor="$primary"
          >
            <Text color="$white" fontWeight="bold">
              Submit
            </Text>
          </Button>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CheckoutScreen;
