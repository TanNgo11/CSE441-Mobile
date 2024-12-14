// import React, { useMemo } from "react";
// import { View } from "react-native";
// import { useTheme } from "@react-navigation/native";
// import Text from "@shared-components/text-wrapper/TextWrapper";
// import createStyles from "./CartScreen.style";

// const CartScreen: React.FC = () => {
//   const theme = useTheme();
//   const { colors } = theme;
//   const styles = useMemo(() => createStyles(theme), [theme]);

//   return (
//     <View style={styles.container}>
//       <Text h1 color={colors.text}>
//         Cart
//       </Text>
//     </View>
//   );
// };

// export default CartScreen;

import React, { useMemo, useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { ProductResponseType } from "queries/product/types";
import { useGetListProductsByIds } from "queries/product/useGetListProductsByIds";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import * as NavigationService from "react-navigation-helpers";
import useCurrencyFormatter from "utils/useCurrencyFormatter";
import { useShoppingCartStore } from "zustand/auth/useCartStore";
import RNBounceable from "@freakycoder/react-native-bounceable";
import { SCREENS } from "@shared-constants";
import createStyles from "./CartScreen.style";

const CartScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const currencyFormat = useCurrencyFormatter();
  const { cartItems, increaseItemQuantity, decreaseItemQuantity } =
    useShoppingCartStore();

  const { data: products } = useGetListProductsByIds(
    cartItems.map((item) => item.id),
  );

  const styles = useMemo(() => createStyles(theme), [theme]);

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const totalAmount = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const product = products?.find((p) => p.id === item.id);
      const price = product?.price || 0;
      return acc + price * item.quantity;
    }, 0);
  }, [cartItems, products]);

  const mergedData: ProductResponseType[] = useMemo(() => {
    return cartItems.map((cartItem) => {
      const product = products?.find((p) => p.id === cartItem.id);

      return {
        id: cartItem.id,
        modifiedDate: product?.modifiedDate || "",
        modifiedBy: product?.modifiedBy || "",
        name: product?.name || "Unknown Product",
        description: product?.description || "",
        price: product?.price || 0,
        salePrice: product?.salePrice || 0,
        quantity: cartItem.quantity,
        image: product?.image || "",
        slug: product?.slug || "",
        ratings: product?.ratings || 0,
        productStatus: product?.productStatus || "Unavailable",
        category: product?.category || null,
      } as ProductResponseType;
    });
  }, [cartItems, products]);

  const handleApplyCoupon = () => {
    if (coupon.toLowerCase() === "discount10") {
      if (totalAmount) {
        setDiscount(totalAmount * 0.1);
      }
    } else {
      setDiscount(0);
    }
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.goBack}
        onPress={() => NavigationService.goBack()}
      >
        <Icon
          name="arrow-back-outline"
          type={IconType.Ionicons}
          color="#00AE65"
          size={25}
        />
      </TouchableOpacity>
      <Text style={styles.header}>Cart</Text>
    </View>
  );

  const renderItems = () => (
    <>
      <FlatList
        data={mergedData}
        extraData={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <RNBounceable>
            <View style={styles.cartItem}>
              <Image source={{ uri: item?.image }} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item?.name}</Text>
                <Text style={styles.itemPrice}>
                  {currencyFormat(item?.price)}
                </Text>
                <Text style={styles.itemQuantity}>
                  Quantity: {item.quantity}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => decreaseItemQuantity(item.id)}
              >
                <Icon
                  name="remove-outline"
                  type={IconType.Ionicons}
                  color="#FF0000"
                  size={25}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => increaseItemQuantity(item.id)}>
                <Icon
                  name="add-outline"
                  type={IconType.Ionicons}
                  color="black"
                  size={25}
                />
              </TouchableOpacity>
            </View>
          </RNBounceable>
        )}
      />
    </>
  );
  const renderCouponSection = () => (
    <View style={styles.couponContainer}>
      <TextInput
        style={styles.couponInput}
        placeholder="Enter coupon code"
        value={coupon}
        onChangeText={(text) => setCoupon(text)}
      />
      <TouchableOpacity style={styles.applyButton} onPress={handleApplyCoupon}>
        <Text style={styles.applyButtonText}>Apply</Text>
      </TouchableOpacity>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footer}>
      {renderCouponSection()}
      <View style={styles.row}>
        <Text style={styles.labelText}>Subtotal:</Text>
        <Text style={styles.valueText}>
          {currencyFormat(Number(totalAmount?.toFixed(2)))}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.labelText]}>Discount:</Text>
        <Text style={[styles.valueText]}>-${discount.toFixed(2)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.labelText]}>Total:</Text>
        <Text style={[styles.valueText]}>
          {/* ${(totalAmount?.toFixed(2) - discount).toFixed(2)} */}
        </Text>
      </View>
      <RNBounceable>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => navigation.navigate({ name: SCREENS.CHECKOUT })}
        >
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </RNBounceable>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      <View style={styles.line} />
      {renderItems()}
      {renderFooter()}
    </View>
  );
};

export default CartScreen;
