import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { red100 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./ProfilePage.style";

const ProfileScreen = () => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Gradient Header */}
        <LinearGradient
          colors={["#FF7E5F", "#FEB47B", "#cc66ff"]}
          style={styles.header}
        >
          <Text style={styles.name}>Jane Mile</Text>
          <Text style={styles.role}>UserName</Text>
          <Text style={styles.location}>
            <Icon name="map-marker" size={14} /> San Francisco
          </Text>

          <Image
            style={styles.profileImage}
            source={{
              uri: "https://i.pinimg.com/originals/09/3e/ba/093eba58f1420c9a6475f619f93eac89.jpg",
            }}
          />
          <View style={styles.statsRow}>
            <View>
              <Text style={styles.iconButton}>
                <Icon name="phone" size={20} color="#FF7E5F" />
                <Text> {"\t"} 0999999999</Text>
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* About Me Section */}
        <View style={styles.aboutSection}>
          <Text style={styles.aboutTitle}>About Me</Text>
          <Text style={styles.description}>This is all about my profile</Text>
        </View>

        {/* Additional Info */}
        <View style={styles.infoSection}>
          <Text style={styles.infoItem}>
            <Icon name="envelope" size={14} /> jane_mile@gmail.com
          </Text>
          <Text style={styles.infoItem}>
            <Icon name="birthday-cake" size={14} /> March 15, 1993
          </Text>
          <Text style={styles.infoItem}>
            <Icon name="female" size={14} /> Female
          </Text>
        </View>

        {/* Follow Button */}
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>Follow</Text>
        </TouchableOpacity>

        {/* Social Links */}
        <View style={styles.socialRow}>
          <Text style={styles.socialText}>Follow me on </Text>
          <Icon name="behance" size={20} style={styles.socialIcon} />
          <Icon name="instagram" size={20} style={styles.socialIcon} />
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
