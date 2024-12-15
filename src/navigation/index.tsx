import React from "react";
import { useColorScheme } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import { isReadyRef, navigationRef } from "react-navigation-helpers";
import CartScreen from "@screens/cart/CartScreen";
import DetailScreen from "@screens/detail/DetailScreen";
import EditProfile from "@screens/editprofile/EditProfile";
// ? Screens
import HomeScreen from "@screens/home/HomeScreen";
import LoginScreen from "@screens/LoginScreen";
import NotificationScreen from "@screens/notification/NotificationScreen";
import ProfileScreen from "@screens/profile/ProfileScreen";
import AddUser from "adduser/AddUser";

/**
 * ? Local & Shared Imports
 */
import { SCREENS } from "@shared-constants";
import { DarkTheme, LightTheme, palette } from "@theme/themes";

// ? If you want to use stack or tab or both
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Navigation = () => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === "dark";

  React.useEffect((): any => {
    return () => (isReadyRef.current = false);
  }, []);

  const renderTabIcon = (
    route: any,
    focused: boolean,
    color: string,
    size: number,
  ) => {
    let iconName = "home";
    switch (route.name) {
      case SCREENS.HOME:
        iconName = focused ? "home" : "home-outline";
        break;
      case SCREENS.CART:
        iconName = focused ? "cart" : "cart-outline";
        break;
      case SCREENS.ADDUSER:
        iconName = focused ? "notifications" : "notifications-outline";
        break;
      case SCREENS.PROFILE:
        iconName = focused ? "person" : "person-outline";
        break;
      default:
        iconName = focused ? "home" : "home-outline";
        break;
    }
    return (
      <Icon
        name={iconName}
        type={IconType.Ionicons}
        size={size}
        color={color}
      />
    );
  };
  const renderTabNavigation = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) =>
            renderTabIcon(route, focused, color, size),
          tabBarActiveTintColor: palette.primary,
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: isDarkMode ? palette.black : palette.white,
          },
        })}
      >
        <Tab.Screen name={SCREENS.HOME} component={HomeScreen} />
        <Tab.Screen
          name={SCREENS.ADDUSER}
          component={AddUser}
        />
        <Tab.Screen name={SCREENS.CART} component={CartScreen} />
        <Tab.Screen name={SCREENS.PROFILE} component={ProfileScreen} />
        <Tab.Screen name={SCREENS.LOGIN} component={LoginScreen} />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}
      theme={isDarkMode ? DarkTheme : LightTheme}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={SCREENS.ROOT} component={renderTabNavigation} />
        <Stack.Screen name={SCREENS.DETAIL}>
          {(props) => <DetailScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name={SCREENS.EDITPROFILE}>
          {(props) => <EditProfile {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
