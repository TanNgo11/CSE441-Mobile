import React, { useMemo } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { ProductResponseType } from "queries/product/types";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import RNBounceable from "@freakycoder/react-native-bounceable";
import type { ICardItem } from "@services/models";
import Text from "@shared-components/text-wrapper/TextWrapper";
import createStyles from "./CardItem.style";

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;

interface ICardItemProps {
  style?: CustomStyleProp;
  data: ProductResponseType;
  onPress: () => void;
}

const CardItem: React.FC<ICardItemProps> = ({ style, data, onPress }) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const { name, description, image, salePrice, ratings } = data;

  const renderProductDetail = () => (
    <>
      <Text style={styles.productName}>{name}</Text>
      <Text style={styles.productDetails}>{`1kg - $${salePrice}`}</Text>
    </>
  );

  const renderLanguage = () => (
    <View style={styles.languageContainer}>
      <Image
        source={{ uri: image }}
        style={styles.imageItem}
        resizeMode="contain"
      />
    </View>
  );

  const renderStar = () => (
    <View
      style={[
        styles.ratingBadge,
        { flexDirection: "row", alignItems: "center" },
      ]}
    >
      <Text style={styles.ratingText}>{`${ratings.toFixed(1)}  `}</Text>
      <Icon name="star" type={IconType.FontAwesome} color="#FFFFFF" size={15} />
    </View>
  );

  const renderFork = () => (
    <View style={styles.forkContainer}>
      <Icon name="code-fork" type={IconType.FontAwesome} color={colors.text} />
    </View>
  );

  const renderAddProductButton = () => (
    <View style={styles.addProductButtonContainer}>
      <TouchableOpacity style={styles.addProductButton}>
        <Icon name="plus" type={IconType.FontAwesome} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <RNBounceable style={[styles.container, style]} onPress={onPress}>
      {renderLanguage()}
      {renderStar()}
      <View style={styles.line} />
      {renderProductDetail()}
      {renderAddProductButton()}
    </RNBounceable>
  );
};

export default CardItem;
