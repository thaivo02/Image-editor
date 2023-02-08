import { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import styles from "../stylesheet/Styles";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "react-native-web";
import { auth } from "../../Firebaseconfig";
import { useNavigation } from "@react-navigation/core";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home");
      }
    });
    return unsub;
  }, []);

  const HandleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Dang ky:", user.email);
      })
      .catch((error) => alert(error.message));
  };
  const HandleLogIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Dang nhap:", user.email);
      })
      .catch((error) => alert(error.message));
  };
  return (
    <KeyboardAvoidingView style={styles.Login} behavior="height">
      <View style={styles.InputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.Input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.Input}
          secureTextEntry
        />
      </View>
      <View style={styles.ButtonContainer}>
        <TouchableOpacity onPress={HandleLogIn} style={styles.ButtonLogin}>
          <Text style={styles.LoginText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={HandleSignUp}
          style={[styles.ButtonLogin, styles.ButtonOutline]}
        >
          <Text style={styles.RegisterText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
