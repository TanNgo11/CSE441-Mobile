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
import { useTheme } from "@react-navigation/native";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import * as NavigationService from "react-navigation-helpers";
import RNBounceable from "@freakycoder/react-native-bounceable";
import createStyles from "./CartScreen.style";

/**
 * Mocked cart data - replace this with real data from your state or API.
 */
const mockCartItems = [
  {
    id: 1,
    name: "Watermelon",
    price: 10.0,
    quantity: 2,
    image: "https://askbootstrap.com/preview/groseri/img/1.jpeg",
  },
  {
    id: 2,
    name: "Orange",
    price: 5.0,
    quantity: 3,
    image: "https://askbootstrap.com/preview/groseri/img/2.jpeg",
  },
  {
    id: 3,
    name: "Noodle",
    price: 13.0,
    quantity: 1,
    image: "https://askbootstrap.com/preview/groseri/img/1.jpeg",
  },
];

const CartScreen: React.FC = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [quantity, setQuantity] = useState(1);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const handleRemoveItem = (itemId: number) => {
    console.log(`Remove item with id: ${itemId}`);
  };

  const totalAmount = mockCartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleApplyCoupon = () => {
    if (coupon.toLowerCase() === "discount10") {
      setDiscount(totalAmount * 0.1);
    } else {
      setDiscount(0);
    }
  };
  const handleCheckout = () => {
    console.log("Proceed to checkout");
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
        data={mockCartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <RNBounceable>
            <View style={styles.cartItem}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                <Text style={styles.itemQuantity}>
                  Quantity: {item.quantity}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveItem(item.id)}
              >
                <Icon
                  name="remove-outline"
                  type={IconType.Ionicons}
                  color="#FF0000"
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
        <Text style={styles.valueText}>${totalAmount.toFixed(2)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.labelText, { color: "#F44C00" }]}>Discount:</Text>
        <Text style={[styles.valueText, { color: "#F44C00" }]}>
          -${discount.toFixed(2)}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.labelText, { fontWeight: "bold" }]}>Total:</Text>
        <Text style={[styles.valueText, { fontWeight: "bold" }]}>
          ${(totalAmount - discount).toFixed(2)}
        </Text>
      </View>
      <RNBounceable>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => console.log("Proceed to checkout")}
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
