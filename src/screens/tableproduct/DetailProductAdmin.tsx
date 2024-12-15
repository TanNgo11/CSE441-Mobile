import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { ProductResponseType } from "queries/product/types";
import { useGetProductById } from "queries/product/useGetProductById";
import { useGetRatingsProductById } from "queries/product/useGetRatingsProductById";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import * as NavigationService from "react-navigation-helpers";
import RNBounceable from "@freakycoder/react-native-bounceable";
import Text from "@shared-components/text-wrapper/TextWrapper";
import createStyles from "./DetailProductAdmin.style";

interface DetailProductAdminProps {
  route: any;
  data: ProductResponseType;
  ratings: number;
}

const DetailProductAdmin: React.FC<DetailProductAdminProps> = ({ route }) => {
  const { productId } = route.params;
  const { data, isFetching, error } = useGetProductById(productId);
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [quantity, setQuantity] = useState(1);
  const [editedProduct, setEditedProduct] = useState(data);

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

  const { name, description, image, salePrice, category, ratings } = data;
  const categoryName = category?.name || "No Category";

  const handleAddToCart = () => {
    console.log(`Added ${quantity} x ${name} to cart`);
  };

  const handleSaveChanges = () => {
    console.log("Changes saved:", editedProduct);
    // Logic to save the edited product details
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.goBack}
        onPress={() => NavigationService.goBack()}
      >
        <Icon name="arrow-back-sharp" type={IconType.Ionicons} color={colors.white} size={35} />
      </TouchableOpacity>

      <Image source={{ uri: image }} style={styles.productImage} resizeMode="cover" />

      <View style={styles.productDetails}>
        {/* <Text style={styles.categoryText}>{categoryName}</Text> */}
        <TextInput
          value={editedProduct?.category?.name || ''} // Tự động điền tên danh mục
          onChangeText={(text) =>
            setEditedProduct((prev) => ({
              ...prev,
              category: { ...prev.category, name: text }, // Cập nhật thuộc tính `name` của category
            }))
          }
          style={styles.categoryText}
          placeholder="Category Name"
        />

        <View>
          <TextInput
            value={editedProduct?.name}
            onChangeText={(text) => setEditedProduct((prev) => ({ ...prev, name: text }))}
            style={styles.productNameInput}
            placeholder="Product Name"
          />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
              value={editedProduct?.ratings?.toString()}
              onChangeText={(text) => setEditedProduct((prev) => ({ ...prev, ratings: parseFloat(text) }))}
              style={styles.priceInput}
              placeholder="Price"
              keyboardType="numeric"
            />
          </View>
          <View>
            <TextInput
              value={editedProduct?.salePrice?.toString()}
              onChangeText={(text) => setEditedProduct((prev) => ({ ...prev, salePrice: parseFloat(text) }))}
              style={styles.priceInput}
              placeholder="Price"
              keyboardType="numeric"
            />
          </View>
        </View>

        <Text style={[styles.descriptionText, { marginTop: 10, fontWeight: "bold" }]}>DESCRIPTIONS</Text>
        <TextInput
          value={editedProduct?.description}
          onChangeText={(text) => setEditedProduct((prev) => ({ ...prev, description: text }))}
          style={styles.descriptionInput}
          placeholder="Product Description"
          multiline
        />

        <RNBounceable style={styles.saveButton} onPress={handleSaveChanges}>
          <Text h3 bold color="white">Save Changes</Text>
        </RNBounceable>
      </View>
    </View>
  );
};

export default DetailProductAdmin;
