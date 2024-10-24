import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  titleTextStyle: {
    fontSize: 32,
  },
  buttonStyle: {
    height: 45,

    marginTop: 32,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowRadius: 5,
    shadowOpacity: 0.7,

    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  buttonTextStyle: {
    fontWeight: "700",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  contentContainer: {
    flex: 1,
    marginTop: 16,
  },
  listContainer: {
    marginTop: 8,
  },
  profilePicImageStyle: {
    height: 50,
    width: 50,
    borderRadius: 30,
  },
});
