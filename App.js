import "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect } from "react";
import { Button, Image, View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import styles from "./src/stylesheet/Styles.js";
import Home from "./src/screen/Home.js";
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <NavigationContainer style={styles.container}>
      <View style={styles.button}>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
      </View>
      <Home style={styles.button} />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
