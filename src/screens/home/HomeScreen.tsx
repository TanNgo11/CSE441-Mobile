import React, { useMemo, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { useGetListProducts } from "queries/Product/useGetListProducts";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import * as NavigationService from "react-navigation-helpers";
import fonts from "@fonts";
import RNBounceable from "@freakycoder/react-native-bounceable";
import { SearchBar } from "@rneui/themed";
import Text from "@shared-components/text-wrapper/TextWrapper";
import { SCREENS } from "@shared-constants";
import CardItem from "./components/card-item/CardItem";
import createStyles from "./HomeScreen.style";
import MockData from "./mock/MockData";

type SearchBarComponentProps = {};

const profileURI =
  // eslint-disable-next-line max-len
  "https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2574&q=80";

const HomeScreen: React.FC = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { data } = useGetListProducts();
  const [search, setSearch] = useState("");

  const topStores = [
    { id: "1", name: "Easy Grocery", icon: "🛍️" },
    { id: "2", name: "Fresh Fruits", icon: "🍅" },
    { id: "3", name: "Fast Food", icon: "🍽️" },
    { id: "4", name: "Beauty Items", icon: "👝" },
    { id: "5", name: "Beverages", icon: "🥤" },
    { id: "6", name: "Backery", icon: "🥯" },
  ];

  const updateSearch = (searchValue: string) => {
    setSearch(searchValue);
  };
  const handleItemPress = (id: number) => {
    NavigationService.push(SCREENS.DETAIL, { productId: id });
  };

  /* -------------------------------------------------------------------------- */
  /*                               Render Methods                               */
  /* -------------------------------------------------------------------------- */

  const renderMenuButton = () => (
    <RNBounceable>
      <Icon
        name="menu-unfold"
        type={IconType.AntDesign}
        color={colors.white}
        size={35}
      />
    </RNBounceable>
  );

  const renderSearchbar = () => (
    <View style={styles.searchbar}>
      <Icon
        name="search"
        type={IconType.FontAwesome}
        color="F44C00"
        size={20}
      />
      <TextInput
        style={styles.searchinput}
        placeholder="Search Items"
        placeholderTextColor="#888"
        value={search}
        onChangeText={updateSearch}
      />
    </View>
  );

  const renderCategorySection = () => (
    <View style={styles.section}>
      <FlatList
        data={topStores}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.storeCard}>
            <Text style={styles.storeIcon}>{item.icon}</Text>
            <Text style={styles.storeName}>{item.name}</Text>
          </View>
        )}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
  const renderHeader = () => (
    <View style={styles.header}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}
      >
        <Icon
          name="location-sharp"
          type={IconType.Ionicons}
          color={colors.white}
          size={30}
        />
        <Text h2 bold color="#FFFFFF">
          Groseri
        </Text>
        <TouchableOpacity style={{ marginLeft: "auto", marginRight: 15 }}>
          <Icon
            name="notifications-outline"
            type={IconType.Ionicons}
            color={colors.white}
            size={35}
          />
        </TouchableOpacity>

        <TouchableOpacity style={{ marginRight: 15 }}>
          {renderMenuButton()}
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 10 }}>{renderSearchbar()}</View>
    </View>
  );

  const renderList = () => (
    <View style={styles.listContainer}>
      <View>
        <Text h2 bold color="#00AE65">
          Top products
        </Text>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <CardItem data={item} onPress={() => handleItemPress(item.id)} />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
    </View>
  );

  const renderFeature = () => (
    <>
      <View style={styles.featurecontainer}>
        <TouchableOpacity style={[styles.box, { backgroundColor: "#ff6f2e" }]}>
          <Text h3 bold color="#FFFFFF">
            Deals of the Day
          </Text>
          <Text h5 bold color="#FBC299">
            50% OFF
            <Icon
              name="arrow-right"
              type={IconType.Feather}
              color="#FBC299"
              size={15}
            />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.box, { backgroundColor: "#FFC516" }]}>
          <Text h3 bold color="#FFFFFF">
            Special Offer
          </Text>
          <Text h5 bold color="#FFDC88">
            BOGO
            <Icon
              name="arrow-right"
              type={IconType.Feather}
              color="#FFDC88"
              size={15}
            />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.box, { backgroundColor: "#10B36E" }]}>
          <Text h3 bold color="#FFFFFF">
            Newest Product
          </Text>
          <Text h5 bold color="#85D39C">
            See more
            <Icon
              name="arrow-right"
              type={IconType.Feather}
              color="#85D39C"
              size={15}
            />
          </Text>
        </TouchableOpacity>
      </View>
      <View>{renderList()}</View>
    </>
  );

  const renderCategory = () => (
    <View style={styles.contentContainer}>
      <View style={styles.category}>
        <Text h2 bold color="#000000">
          Categories
        </Text>
        {renderCategorySection()}
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <SafeAreaView style={styles.container}>
        {renderHeader()}
        {renderCategory()}
        {renderFeature()}
        {/* {renderList()} */}
      </SafeAreaView>
    </ScrollView>
  );
};

export default HomeScreen;
