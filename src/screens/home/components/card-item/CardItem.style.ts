import {
  StyleSheet,
  type ImageStyle,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { ScreenHeight, ScreenWidth } from "@freakycoder/react-native-helpers";

interface Style {
  container: ViewStyle;
  descriptionTextStyle: TextStyle;
  contentContainer: ViewStyle;
  languageContainer: ViewStyle;
  languageColorStyle: ViewStyle;
  starContainer: ViewStyle;
  valueTextStyle: TextStyle;
  forkContainer: ViewStyle;
  image: ImageStyle;
  productName: TextStyle;
  productDetails: TextStyle;
  ratingBadge: ViewStyle;
  ratingText: TextStyle;
  line: ViewStyle;
  addProductButtonContainer: ViewStyle;
  addProductButton: ViewStyle;
  buttonText: TextStyle;
  imageItem: ImageStyle;
}

export default () => {
  return StyleSheet.create<Style>({
    container: {
      flexDirection: "column",
      justifyContent: "center",
      padding: 5,
      marginTop: 16,
      margin: 8,
      borderWidth: 1,
      borderRadius: 25,
      paddingVertical: 25,
      paddingHorizontal: 25,
      width: ScreenWidth * 0.43,
      height: ScreenHeight * 0.3,
      borderColor: "#d4d4d4",
      backgroundColor: "#ffffff",
      shadowColor: "#000000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.18,
      shadowRadius: 4.59,
      elevation: 5,
    },
    image: {
      width: 80,
      height: 80,
      marginVertical: 8,
    },
    productName: {
      fontSize: 13,
      fontWeight: "bold",
      color: "#000000",
      textAlign: "left",
    },
    productDetails: {
      fontSize: 13,
      color: "#000000",
      marginTop: 4,
      textAlign: "left",
    },
    line: {
      marginLeft: 0,
      height: 1,
      backgroundColor: "#cccccc",
      marginVertical: 10,
      width: 112,
    },
    ratingBadge: {
      position: "absolute",
      top: ScreenHeight * -0.145,
      left: 8,
      backgroundColor: "#00AE65",
      borderRadius: 10,
      paddingHorizontal: 4,
      paddingVertical: 2,
      width: 50,
      zIndex: 1,
      flexDirection: "row",
      alignItems: "center",
    },
    ratingText: {
      color: "white",
      fontSize: 12,
      fontWeight: "bold",
    },
    descriptionTextStyle: {
      marginTop: 8,
    },
    contentContainer: {
      marginTop: 16,
      flexDirection: "row",
      alignItems: "center",
    },
    languageContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    imageItem: {
      width: 120,
      height: 120,
    },
    languageColorStyle: {
      width: 15,
      height: 15,
      borderWidth: 1,
      borderRadius: 15,
      borderColor: "#d4d4d4",
      backgroundColor: "#e0e0e0",
    },
    starContainer: {
      marginLeft: 16,
      flexDirection: "row",
      alignItems: "center",
    },
    valueTextStyle: {
      marginLeft: 8,
    },
    forkContainer: {
      marginLeft: 16,
      flexDirection: "row",
      alignItems: "center",
    },
    addProductButtonContainer: {
      position: "absolute",
      bottom: 0,
      right: 0,
      width: "42%",
      height: "18%",
      overflow: "hidden",
    },
    addProductButton: {
      backgroundColor: "#00AE65",
      borderRadius: 25,
      paddingVertical: 10,
      paddingHorizontal: 20,
      flexDirection: "row",
      justifyContent: "flex-start",
      width: "180%",
      height: "150%",
    },
    buttonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
      marginRight: 10,
    },
  });
};
