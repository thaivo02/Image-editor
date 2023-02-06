import "react-native-gesture-handler";
import React, { Component } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import styles from "./src/stylesheet/Styles.js";
import Edit from "./src/screen/Edit.js";
import Home from "./src/screen/Home.js";

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home}></Stack.Screen>
          <Stack.Screen name="Edit" component={Edit}></Stack.Screen>
          {/* <Edit image={this.state.image} style={styles.button} /> */}
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    );
  }
}
