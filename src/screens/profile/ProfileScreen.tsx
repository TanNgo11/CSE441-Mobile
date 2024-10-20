import React, { useMemo } from "react";
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";
import createStyles from "./ProfileScreen.style";

const ProfileScreen: React.FC = () => {
  const theme = useTheme();

  const styles = useMemo(() => createStyles(theme), [theme]);

  return <View style={styles.container}>hhee</View>;
};

export default ProfileScreen;
