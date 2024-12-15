import { StyleSheet, type ImageStyle, type TextStyle, type ViewStyle } from "react-native";

interface Style {
  container: ViewStyle;
  goBack: ViewStyle;
  productImage: ImageStyle;
  productDetails: ViewStyle;
  categoryText: TextStyle;
  productName: TextStyle;
  productNameInput: TextStyle;
  priceText: TextStyle;
  priceInput: TextStyle;
  ratingBadge: ViewStyle;
  ratingsText: TextStyle;
  descriptionText: TextStyle;
  descriptionInput: TextStyle;
  saveButton: ViewStyle;
  saveButtonText: TextStyle;
}

export default () => {
  return StyleSheet.create<Style>({
    container: {
      flex: 1,
      backgroundColor: "#FFFFFF",
    },
    goBack: {
      position: "absolute",
      top: 16,
      left: 16,
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      zIndex: 10,
    },

    productImage: {
      width: "100%",
      height: 250,
      resizeMode: "cover",
      borderRadius: 10,
    },

    productDetails: {
      flex: 1,
      padding: 16,
      backgroundColor: "#ffffff",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      marginTop: -16,
      zIndex: 1,
    },

    categoryText: {
      color: "#000000",
      fontSize: 14,
      fontWeight: "700",
      marginBottom: 4,
    },

    productName: {
      fontSize: 30,
      fontWeight: "bold",
      color: "#000000",
      marginBottom: 8,
    },

    productNameInput: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#000000",
      borderBottomWidth: 1,
      borderColor: "#ccc",
      marginBottom: 16,
      paddingVertical: 8,
    },

    priceText: {
      fontSize: 20,
      fontWeight: "600",
      color: "#000000",
      marginBottom: 4,
    },

    priceInput: {
      fontSize: 18,
      color: "#000000",
      borderBottomWidth: 1,
      borderColor: "#ccc",
      marginTop: 8,
      paddingVertical: 8,
    },

    ratingBadge: {
      backgroundColor: "#00AE65",
      borderRadius: 10,
      paddingHorizontal: 4,
      paddingVertical: 2,
      width: 110,
      height: 30,
      justifyContent: "center",
      alignItems: "center",
    },

    ratingsText: {
      fontSize: 12,
      fontWeight: "bold",
      color: "#FFFFFF",
    },

    descriptionText: {
      fontSize: 16,
      color: "#000000",
    },

    descriptionInput: {
      fontSize: 16,
      color: "#000000",
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      padding: 10,
      minHeight: 100,
      marginBottom: 20,
    },

    saveButton: {
      backgroundColor: "#D99E53",
      paddingVertical: 16,
      alignItems: "center",
      borderRadius: 18,
      zIndex: 10,
      width: "100%",
    },

    saveButtonText: {
      color: "#FFFFFF",
      fontSize: 18,
      fontWeight: "bold",
    },
  });
};
