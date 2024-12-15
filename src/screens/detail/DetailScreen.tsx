/**
 * ? Local Imports
 */
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  TouchableOpacity,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { ProductResponseType } from "queries/product/types";
import { useGetProductById } from "queries/product/useGetProductById";
import { useGetRatingsProductById } from "queries/product/useGetRatingsProductById";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import RNBounceable from "@freakycoder/react-native-bounceable";
import Text from "@shared-components/text-wrapper/TextWrapper";
import createStyles from "./DetailScreen.style";

interface DetailScreenProps {
  route: any;
  data: ProductResponseType;
  ratings: number;
}
const DetailScreen: React.FC<DetailScreenProps> = ({ route }) => {
  const navigation = useNavigation();

  const { productId } = route.params;
  const { data, isFetching, error } = useGetProductById(productId);
  const { data: ratings, isFetching: isFetchingRatings } =
    useGetRatingsProductById(productId);
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [quantity, setQuantity] = useState(1);

  if (isFetching) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text color={colors.text}>Loading product details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text color="red">Failed to load product: {error.message}</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.container}>
        <Text color={colors.text}>Product not found</Text>
      </View>
    );
  }

  const { name, description, image, salePrice, category } = data;

  const categoryName = category?.name || "No Category";

  const handleAddToCart = () => {
    console.log(`Added ${quantity} x ${name} to cart`);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.goBack}
        onPress={() => navigation.goBack()}
      >
        <Icon
          name="arrow-back-sharp"
          type={IconType.Ionicons}
          color={colors.white}
          size={35}
        />
      </TouchableOpacity>
      <Image
        source={{ uri: image }}
        style={styles.productImage}
        resizeMode="cover"
      />

      <View style={styles.productDetails}>
        <Text style={styles.categoryText}>{categoryName}</Text>
        <View style={styles.secondaryContainer}>
          <Text style={styles.productName}>{name}</Text>
          <Text style={styles.priceText}>${salePrice.toFixed(2)}</Text>
        </View>

        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={[
              styles.ratingBadge,
              // eslint-disable-next-line react-native/no-inline-styles
              { flexDirection: "row", alignItems: "center" },
            ]}
          >
            {isFetchingRatings ? (
              <Text bold color="#FFFFFF">
                Loading...
              </Text>
            ) : (
              <Text bold color="#FFFFFF">{`Ratings:  ${
                ratings ? ratings.toFixed(1) : "No Ratings"
              }  `}</Text>
            )}
            <Icon
              name="star"
              type={IconType.FontAwesome}
              color="#FFFFFF"
              size={15}
            />
          </View>

          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => setQuantity(quantity + 1)}
            >
              <Text style={[styles.quantityButtonText, { color: "#000000" }]}>
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text
          style={[styles.descriptionText, { marginTop: 10, fontWeight: 700 }]}
        >{`DESCRIPTIONS`}</Text>
        <Text style={styles.descriptionText}>{description}</Text>

        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <Text h3 bold color="white">
            Add to Cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailScreen;
