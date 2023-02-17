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

import { auth, Firebase } from "../../Firebaseconfig";
import { useNavigation } from "@react-navigation/core";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Main");
      }
    });
    return unsub;
  }, []);

  const HandleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        // console.log('Dang ky:',user.email)
      })
      .catch((error) => alert("This Email has been register"));
  };
  const HandleLogIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        // console.log('Dang nhap:',user.email)
      })
      .catch((error) =>
        alert("Email or Password is incorrect.Please try again")
      );
  };
  const ForgetPassword = () => {
    Firebase.auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        alert("Password reset email sent");
      })
      .catch((error) => alert("Please type your email!!"));
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
        <TouchableOpacity
          onPress={ForgetPassword}
          style={styles.ForgetPasswordContainer}
        >
          <Text style={styles.ForgetPasswordText}>Forget Password</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
