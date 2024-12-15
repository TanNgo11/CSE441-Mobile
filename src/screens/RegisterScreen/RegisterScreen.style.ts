import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { ExtendedTheme } from "@react-navigation/native";
import { ScreenHeight, ScreenWidth } from "@freakycoder/react-native-helpers";

interface Styles {
  container: ViewStyle;
  header: ViewStyle;
  backButton: ViewStyle;
  formContainer: ViewStyle;
  title: TextStyle;
  input: ViewStyle;
  checkboxContainer: ViewStyle;
  checkboxText: TextStyle;
  linkText: TextStyle;
  signupButton: ViewStyle;
  signupButtonText: TextStyle;
  socialLoginText: TextStyle;
  socialIcons: ViewStyle;
  socialIcon: ViewStyle;
  footerText: TextStyle;
  goBack: ViewStyle;

}

const createStyles = (theme: ExtendedTheme) => {
  const { colors } = theme;

  return StyleSheet.create<Styles>({
    container: {
      flex: 1,
      backgroundColor: '#F7F8FC',
    },
    goBack: {
      position: "absolute",
      top: 30,
      left: 18,
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      zIndex: 10,
    },
    header: {
      height: 200,
      backgroundColor: colors.primary, // You can customize with the theme color
    },
    backButton: {
      marginTop: 50,
      marginLeft: 20,
    },
    formContainer: {
      borderRadius: 20,
      paddingHorizontal: 20,
      // marginTop: 20,
      width: ScreenWidth* 0.9,
      height: ScreenHeight* 0.5,
      padding: 10,
      alignSelf: "center",
      overflow: "hidden",
      
    },
    title: {
      fontSize: 42,
      fontWeight: "bold",
      color: '#8091D9',
      textAlign: "auto",
      paddingLeft:40,
      marginBottom: 10,
      
    },
    input: {
      width: "100%",
      height: 50,
      backgroundColor: colors.card,
      borderRadius: 8,
      borderWidth: 0,
      borderColor: colors.border,
      paddingHorizontal: 15,
      fontSize: 16,
      color: colors.text,
      marginBottom: 15,
    },
    checkboxContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
    },
    checkboxText: {
      marginLeft: 10,
      color: colors.text,
    },
    linkText: {
      color: colors.primary,
      textDecorationLine: "underline",
    },
    signupButton: {
      width: "100%",
      height: 50,
      backgroundColor: colors.primary,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
      marginBottom: 20,
    },
    signupButtonText: {
      color: colors.textOnPrimary || "#fff", // Fallback if no color is provided
      fontSize: 16,
      fontWeight: "bold",
    },
    socialLoginText: {
      textAlign: "center",
      color: colors.text,
      marginBottom: 10,
    },
    socialIcons: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      marginBottom: 20,
    },
    socialIcon: {
      width: 40,
      height: 40,
    },
    footerText: {
      textAlign: "center",
      color: colors.text,
    },
  });
};

export default createStyles;
