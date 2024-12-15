import React, { useMemo } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Checkbox } from "react-native-paper";
import createStyles from "./RegisterScreen.style";
import { useNavigation, useTheme } from "@react-navigation/native";
import { BlurView } from "@react-native-community/blur";
import Icon, { IconType } from "react-native-dynamic-vector-icons";


const RegisterScreen: React.FC = () => {
    const navigation = useNavigation();

    const theme = useTheme();
    const { colors } = theme;
    const styles = useMemo(() => createStyles(theme), [theme]);
    const [values, setValues] = React.useState({
        username: "",
        email: "",
        password: "",
        agreeToPolicy: false,
    });

    const [errors, setErrors] = React.useState({
        username: "",
        email: "",
        password: "",
    });

    const onChange = (name: string, value: string | boolean) => {
        setValues({ ...values, [name]: value });
    };

    const onSubmit = () => {
        if (!values.username || !values.email || !values.password) {
            setErrors({
                username: !values.username ? "Username is required" : "",
                email: !values.email ? "Email is required" : "",
                password: !values.password ? "Password is required" : "",
            });
        } else {
            console.log("Form submitted successfully");
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.goBack}
                onPress={() => navigation.goBack()}
            >
                <Icon
                    name="chevron-back-outline"
                    type={IconType.Ionicons}
                    color={colors.black}
                    size={35}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.backButton}
                onPress={() => console.log("Go Back")}
            >
                <Text style={{ color: "#fff", fontSize: 20 }}>{"<"}</Text>
            </TouchableOpacity>
            <Text style={[styles.title, { marginTop: 30, }]}>Let's</Text>
            <Text style={styles.title}>Start!</Text>

            <View style={styles.formContainer}>

                <TextInput
                    style={styles.input}
                    placeholder="User Name"
                    placeholderTextColor="#aaa"
                    value={values.username}
                    onChangeText={(value) => onChange("username", value)}
                />
                {errors.username && (
                    <Text style={{ color: "red", marginBottom: 10 }}>{errors.username}</Text>
                )}

                <TextInput
                    style={styles.input}
                    placeholder="Enter Email"
                    placeholderTextColor="#aaa"
                    value={values.email}
                    onChangeText={(value) => onChange("email", value)}
                />
                {errors.email && (
                    <Text style={{ color: "red", marginBottom: 10 }}>{errors.email}</Text>
                )}

                <TextInput
                    style={styles.input}
                    placeholder="Enter Password"
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    value={values.password}
                    onChangeText={(value) => onChange("password", value)}
                />
                {errors.password && (
                    <Text style={{ color: "red", marginBottom: 10 }}>{errors.password}</Text>
                )}

                <TouchableOpacity style={styles.signupButton} onPress={onSubmit}>
                    <Text style={styles.signupButtonText}>Sign up</Text>
                </TouchableOpacity>

              
                <Text style={styles.footerText}>
                    Already have an account?{" "}
                    <Text
                        style={styles.linkText}
                        onPress={() => console.log("Navigate to Login")}
                    >
                        Sign in
                    </Text>
                </Text>
            </View>


        </View>
    );
};

export default RegisterScreen;

