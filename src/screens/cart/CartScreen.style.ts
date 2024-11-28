// import { StyleSheet, type ViewStyle } from "react-native";
// import type { ExtendedTheme } from "@react-navigation/native";

// interface Style {
//   container: ViewStyle;
// }

// export default (theme: ExtendedTheme) => {
//   const { colors } = theme;
//   return StyleSheet.create<Style>({
//     container: {
//       flex: 1,
//       backgroundColor: colors.background,
//       alignItems: "center",
//       justifyContent: "center",
//     },
//   });
// };

import {
  StyleSheet,
  type ImageStyle,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { DefaultTheme } from "@react-navigation/native";
import { View } from "react-native-reanimated/lib/typescript/Animated";
import { ScreenHeight, ScreenWidth } from "@freakycoder/react-native-helpers";

interface Style {
  container: ViewStyle;
  goBack: ViewStyle;
  header: TextStyle;
  cartItem: ViewStyle;
  itemImage: ImageStyle;
  itemDetails: ViewStyle;
  itemName: TextStyle;
  itemPrice: TextStyle;
  itemQuantity: TextStyle;
  removeButton: ViewStyle;
  footer: ViewStyle;
  totalText: TextStyle;
  checkoutButton: ViewStyle;
  checkoutText: TextStyle;
  headerContainer: ViewStyle;
  line: ViewStyle;
  couponContainer: ViewStyle;
  couponInput: ViewStyle;
  applyButton: ViewStyle;
  applyButtonText: TextStyle;
  discountText: TextStyle;
  finalTotalText: TextStyle;
  row: ViewStyle;
  labelText: TextStyle;
  valueText: TextStyle;
}

const createStyles = (theme: typeof DefaultTheme) =>
  StyleSheet.create<Style>({
    container: {
      flex: 1,
      backgroundColor: "#FFFFFF",
      paddingHorizontal: 20,
    },

    headerContainer: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      marginTop: ScreenHeight * 0.05,
      width: "100%",
      marginBottom: 0,
    },
    goBack: {
      // marginVertical: 10,
      width: 40,
      height: 35,
    },
    header: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.colors.text,
      marginBottom: 13,
      marginLeft: 0,
    },
    line: {
      marginLeft: 0,
      height: 1,
      backgroundColor: "#cccccc",
      marginBottom: 20,
      width: "100%",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,

      elevation: 0,
    },
    cartItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
      padding: 10,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 8,
      backgroundColor: "#fcfcfc",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,

      elevation: 2,
    },
    itemImage: {
      width: 60,
      height: 60,
      borderRadius: 8,
      marginRight: 10,
    },
    itemDetails: {
      flex: 1,
    },
    itemName: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme.colors.text,
    },
    itemPrice: {
      fontSize: 14,
      color: theme.colors.text,
    },
    itemQuantity: {
      fontSize: 14,
      color: theme.colors.text,
    },
    removeButton: {
      marginLeft: 10,
    },
    footer: {
      marginTop: 20,
    },
    totalText: {
      textAlign: "right",
      right: 0,
      fontSize: 18,
      fontWeight: "bold",
      color: theme.colors.text,
    },
    checkoutButton: {
      marginTop: 10,
      marginBottom: 10,
      paddingVertical: 10,
      paddingHorizontal: 30,
      backgroundColor: "#00AE65",
      borderRadius: 8,
      width: "100%",
    },
    checkoutText: {
      color: "white",
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
    },
    couponContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
      marginTop: 10,
    },
    couponInput: {
      flex: 1,
      height: 40,
      borderWidth: 1,
      borderColor: "#cccccc",
      borderRadius: 8,
      paddingHorizontal: 10,
      marginRight: 10,
    },
    applyButton: {
      height: 40,
      backgroundColor: "#00AE65",
      paddingHorizontal: 15,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
    },
    applyButtonText: {
      color: "#ffffff",
      fontWeight: "bold",
    },
    discountText: {
      fontSize: 13,
      color: "#F44C00",
      marginTop: 5,
      textAlign: "right",
    },
    finalTotalText: {
      fontSize: 17,
      fontWeight: "bold",
      color: "#000",
      marginTop: 10,
      textAlign: "right",
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
    },
    labelText: {
      fontSize: 16,
      color: "#000",
    },
    valueText: {
      fontSize: 16,
      color: "#000",
    },
  });

export default createStyles;
