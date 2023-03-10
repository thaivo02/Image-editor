import { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import styles from "../stylesheet/Styles";
import { TextInput } from "react-native-gesture-handler";
import { auth, Firebase } from "../../Firebaseconfig";
import { useNavigation } from "@react-navigation/core";
import { Ionicons, Feather } from '@expo/vector-icons';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);


  const navigation = useNavigation();
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home");
      }
    });
    return unsub;
  }, []);


  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

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
        <View style={{flexDirection: "column", alignContent: 'center', alignItems:'center'}}>
          <Image
            style={styles.logo}
            source={require('./asset/logo.png')} />
            {/* <Text>Login to Sync your Data to Cloud</Text> */}
        </View>
        <View style={styles.InputContainer}>
          
          <Ionicons name="person-outline" size={24} color="black" style={styles.iconContainer}/>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.Input} 
            placeholderTextColor = 'gray'
            />
        </View>
        <View style={styles.InputContainer}>
          <Feather name="lock" size={24} color="black" style={styles.iconContainer}/>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.Input}
            placeholderTextColor = 'gray'
            secureTextEntry={hidePassword} />
          <TouchableOpacity
            onPress={toggleHidePassword}
            >
            <Ionicons
              name={hidePassword ? 'eye-off' : 'eye'}
              size={22}
              color="black"
              style={{
                padding: 10,
              }} />
          </TouchableOpacity>
        </View>
        <View> 
         
        <TouchableOpacity
            onPress={ForgetPassword}
            style={styles.ForgetPasswordContainer}
          >
            <Text style={styles.ForgetPasswordText}>Forget Password</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.ButtonContainer}>
          <TouchableOpacity onPress={HandleLogIn} style={styles.ButtonLogin}>
            <Text style={styles.LoginText}>Login</Text>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection:"column", top: 30, marginTop: 40,}}>
          <Text style={styles.dontaccText}>  
              Don't have account?
            </Text>
          <TouchableOpacity
            onPress={HandleSignUp}
            style={styles.RegisterContainer}
          >

            <Text style={styles.RegisterText}>SIGN UP</Text>
          </TouchableOpacity>

          </View>
          

      </KeyboardAvoidingView>
  );
};

export default Login;
