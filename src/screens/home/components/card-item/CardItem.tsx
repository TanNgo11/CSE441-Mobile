import React, { useMemo } from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import { useTheme } from "@react-navigation/native";
import { ProductResponseType } from "queries/product/types";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import { Image } from "tamagui";
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

  const { name, description, image } = data;

  const renderHeader = () => (
    <>
      <Text h4 bold color={colors.text}>
        {name}
      </Text>
      <Text h5 style={styles.descriptionTextStyle}>
        {description}
      </Text>
    </>
  );

  const renderLanguage = () => (
    <View style={styles.languageContainer}>
      <View style={styles.languageColorStyle} />
      <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
    </View>
  );

  const renderStar = () => (
    <View style={styles.starContainer}>
      <Icon name="star-o" type={IconType.FontAwesome} color={colors.text} />
    </View>
  );

  const renderFork = () => (
    <View style={styles.forkContainer}>
      <Icon name="code-fork" type={IconType.FontAwesome} color={colors.text} />
    </View>
  );

  return (
    <RNBounceable style={[styles.container, style]} onPress={onPress}>
      {renderHeader()}
      <View style={styles.contentContainer}>
        {renderLanguage()}
        {renderStar()}
        {renderFork()}
      </View>
    </RNBounceable>
  );
};

export default CardItem;
