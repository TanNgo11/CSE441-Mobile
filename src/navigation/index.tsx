import React from "react";
import { useColorScheme } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import { isReadyRef, navigationRef } from "react-navigation-helpers";
import CartScreen from "@screens/cart/CartScreen";
import DetailScreen from "@screens/detail/DetailScreen";
// ? Screens
import HomeScreen from "@screens/home/HomeScreen";
import LoginScreen from "@screens/LoginScreen";
import NotificationScreen from "@screens/notification/NotificationScreen";
/**
 * ? Local & Shared Imports
 */
import { SCREENS } from "@shared-constants";
import { DarkTheme, LightTheme, palette } from "@theme/themes";
import LineChartExample from "@screens/chart/LineChartExample";
import TableProductScreen from "@screens/tableproduct/TableProductScreen";
import DetailProductAdmin from "@screens/tableproduct/DetailProductAdmin";
import TableUserScreen from "@screens/tableuser/TableUserScreen";
import EditProfile from "@screens/editprofile/EditProfile";
import EditUser from "@screens/tableuser/EditUser";
import RegisterScreen from "@screens/RegisterScreen/RegisterScreen";

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
      // case SCREENS.NOTIFICATION:
      //   iconName = focused ? "notifications" : "notifications-outline";
      //   break;
      case SCREENS.LINECHARTEXAMPLE:
        iconName = focused ? "cellular" : "cellular-outline";
        break;
      case SCREENS.TABLEPRODUCT:
        iconName = focused ? "browsers" : "browsers-outline";
        break;
      case SCREENS.TABLEUSERSCREEN:
        iconName = focused ? "browsers" : "browsers-outline";
        break;
      case SCREENS.PROFILE:
        iconName = focused ? "person" : "person-outline";
        break;
      case SCREENS.REGISTERSCREEN:
        iconName = focused ? "person" : "person";
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
          name={SCREENS.LINECHARTEXAMPLE}
          component={LineChartExample}
        />
        <Tab.Screen
          name={SCREENS.TABLEPRODUCT}
          component={TableProductScreen}
        />
        <Tab.Screen name={SCREENS.CART} component={CartScreen} />
        <Tab.Screen name={SCREENS.REGISTERSCREEN} component={RegisterScreen} />
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
        <Stack.Screen name={SCREENS.DETAILPRODUCTADMIN}>
          {(props) => <DetailProductAdmin {...props} />}
        </Stack.Screen>
        <Stack.Screen name={SCREENS.EDITPROFILE}>
          {(props) => <EditProfile {...props} />}
        </Stack.Screen>
        <Stack.Screen name={SCREENS.EDITUSER}>
          {(props) => <EditUser {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
