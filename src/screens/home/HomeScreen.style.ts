import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { ExtendedTheme } from "@react-navigation/native";
import { ScreenHeight, ScreenWidth } from "@freakycoder/react-native-helpers";

interface Style {
  container: ViewStyle;
  titleTextStyle: TextStyle;
  buttonStyle: ViewStyle;
  buttonTextStyle: TextStyle;
  header: ViewStyle;
  contentContainer: ViewStyle;
  listContainer: ViewStyle;
  profilePicImageStyle: ImageStyle;
  category: ViewStyle;
  categoryText: TextStyle;
  searchbar: ViewStyle;
  iconsearch: ViewStyle;
  searchinput: TextStyle;
  featurecontainer: ViewStyle;
  box: ViewStyle;
  section: ViewStyle;
  sectionTitle: TextStyle;
  storeCard: ViewStyle;
  storeIcon: ViewStyle;
  storeName: TextStyle;
  storeDetails: TextStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: colors.background,
    },
    titleTextStyle: {
      fontSize: 32,
    },
    buttonStyle: {
      height: 45,
      width: ScreenWidth * 0.9,
      marginTop: 32,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary,
      shadowRadius: 5,
      shadowOpacity: 0.7,
      shadowColor: colors.shadow,
      shadowOffset: {
        width: 0,
        height: 3,
      },
    },
    buttonTextStyle: {
      color: colors.white,
      fontWeight: "700",
    },
    header: {
      width: ScreenWidth * 1,
      height: ScreenHeight / 5,
      flexDirection: "column",
      paddingTop: 10,
      paddingLeft: 10,
      backgroundColor: "#F44C00",
      // alignItems: "center",
      justifyContent: "flex-start",
    },
    contentContainer: {
      flex: 1,
      marginTop: 16,
    },
    category: {
      top: ScreenHeight * -0.05,
      width: ScreenWidth * 0.9,
      height: "auto",
      backgroundColor: "#FFFFFF",
      borderRadius: 20,
      justifyContent: "space-between",
      alignSelf: "center",
      padding: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 5,
      marginBottom: 1,
    },
    categoryText: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.black,
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
    },
    storeCard: {
      alignItems: "center",
      marginRight: 15,
      padding: 10,
      borderRadius: 10,
      backgroundColor: "#ffffff",
    },
    storeIcon: {
      fontSize: 30,
      marginBottom: 5,
    },
    storeName: {
      fontSize: 14,
      fontWeight: "bold",
    },
    storeDetails: {
      fontSize: 12,
      color: "#666",
    },
    featurecontainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      // marginTop: 3,
    },
    box: {
      width: 110,
      height: 100,
      margin: 2,
      padding: 8,
      marginTop: ScreenHeight * -0.02,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    listContainer: {
      marginTop: ScreenHeight * 0.03,
    },
    profilePicImageStyle: {
      height: 50,
      width: 50,
      borderRadius: 30,
      // marginTop: 60,
    },
    searchbar: {
      marginLeft: ScreenWidth * 0.02,
      alignSelf: "flex-start",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#FFFFFF",
      borderRadius: 20,
      paddingHorizontal: 10,
      width: ScreenWidth * 0.9,
      height: 40,
      margin: 10,
    },
    iconsearch: {
      alignItems: "center",
      marginRight: 8,
    },
    searchinput: {
      flex: 1,
      fontSize: 16,
      color: "#333",
    },
  });
};
