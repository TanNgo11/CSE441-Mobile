import {
  StyleSheet,
  type ImageStyle,
  type TextStyle,
  type ViewStyle,
} from "react-native";

interface Style {
  container: ViewStyle;
  goBack: ViewStyle;
  secondaryContainer: ViewStyle;
  productImage: ImageStyle;
  productDetails: ViewStyle;
  categoryText: TextStyle;
  productName: TextStyle;
  priceText: TextStyle;
  ratingBadge: ViewStyle;
  ratingsText: TextStyle;
  descriptionText: TextStyle;
  quantityContainer: ViewStyle;
  quantityButton: ViewStyle;
  quantityButtonText: TextStyle;
  quantityText: TextStyle;
  addToCartButton: ViewStyle;
  addToCartButtonText: TextStyle;
  loadingText: TextStyle;
  errorText: TextStyle;
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
    secondaryContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    categoryText: {
      color: "#000000",
      fontSize: 14,
      fontWeight: "700",
      marginBottom: 4,
    },
    productName: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#000000",
      marginBottom: 8,
    },
    priceText: {
      fontSize: 20,
      fontWeight: "600",
      color: "#000000",
      marginBottom: 4,
    },
    ratingBadge: {
      // left: 8,
      backgroundColor: "#00AE65",
      borderRadius: 10,
      paddingHorizontal: 4,
      paddingVertical: 2,
      width: 110,
      height: 30,
    },
    ratingsText: {
      fontSize: 12,
      fontWeight: "bold",
    },

    descriptionText: {
      fontSize: 16,
      color: "#000000",
      marginTop: 10,
      fontWeight: 700,
    },
    quantityContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 16,
      width: 120,
      borderRadius: 30,
      backgroundColor: "#e8e8e8",
      alignSelf: "flex-end",
    },
    quantityButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "#e8e8e8",
      alignItems: "center",
      justifyContent: "center",
    },
    quantityButtonText: {
      color: "#00000",
      fontSize: 24,
      fontWeight: "bold",
    },
    quantityText: {
      fontSize: 18,
      color: "#000000",
      marginHorizontal: 16,
    },
    addToCartButton: {
      position: "absolute",
      bottom: 10,
      // left: 0,
      // right: 0,
      backgroundColor: "#00AE65",
      paddingVertical: 16,
      alignItems: "center",
      borderRadius: 18,
      zIndex: 10,
      alignSelf: "center",
      width: "100%",
    },
    addToCartButtonText: {
      color: "#FFFFFF",
      fontSize: 18,
      fontWeight: "bold",
    },
    loadingText: {
      marginTop: 16,
      fontSize: 16,
      color: "#000000",
    },
    errorText: {
      marginTop: 16,
      fontSize: 16,
      fontWeight: "bold",
    },
  });
};
