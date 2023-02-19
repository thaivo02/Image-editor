import {
  View,
  Button,
  Image,
  Dimensions,
  Text,
  useState,
  FlatList,
} from "react-native";
import React, { Component } from "react";
import * as ImagePicker from "expo-image-picker";
import styles from "../stylesheet/Styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Firebase, auth } from "../../Firebaseconfig.js";

import { useNavigation } from "@react-navigation/core";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      imageUrls: [],
    };
  }
  componentDidMount() {
    this.getImages();
  }

  pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      this.setState({ image: result.assets[0].uri });
    }
  };
  getImages = async () => {
    const imageUrls = [];
    const imagesRef = Firebase.storage().ref().child(auth.currentUser.email);
    const result = await imagesRef.listAll();

    result.items.forEach((itemRef) => {
      itemRef.getDownloadURL().then((url) => {
        imageUrls.push(url);
        this.setState({
          imageUrls: imageUrls,
        });
      });
    });
  };


  onImagePress = (item) => {
    this.props.navigation.navigate("Edit", {
      image: item,
    });
  };

  deleteImage = async (imageUri) => {
    try {
      await Firebase.storage().refFromURL(imageUri).delete();
      let imageUrls = this.state.imageUrls.filter((image) => image !== imageUri);
      this.setState({ imageUrls });
      this.getImages();
    } catch (e) {
      console.log(e);
    }
  };



  render() {
    const HandleSignOut = () => {
      auth
        .signOut()
        .then(() => {
          this.props.navigation.replace("Login");
        })
        .catch((error) => alert(error.message));
    };

    return (
      <View style={styles.HomeContainer}>
        <View style={{ flex: 0.5 }}>

        </View>

        <View style={{ flex: 4 }}>
          <Text>Recently Edit</Text>

          <FlatList
            data={this.state.imageUrls}
            numColumns='3'
            horizontal={0}
            contentContainerStyle={{
              // flexDirection: "column",
              // flexWrap: "wrap",
              // justifyContent: "space-between",
            }}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => {
                this.setState({ image: item })
                this.props.navigation.navigate("Edit", {
                  image: this.state.image,
                })
              }}>
                <Image
                  source={{ uri: item }}
                  style={{
                    width: Dimensions.get("screen").width / 3.5,
                    height: Dimensions.get("screen").width / 3.5,
                    borderRadius: 15,
                    margin: 8,
                  }}
                />
              </TouchableOpacity>
            )}
          />

          {/* {this.state.image && (
            <Image
              source={{ uri: this.state.image }}
              style={{ width: Dimensions.get("screen").width, height: 300 }}
            />
          )} */}
          <TouchableOpacity
            onPress={this.pickImage}
            style={styles.PickImageButton}
          >
            <Text style={styles.HomeText}> Pick an image from camera roll</Text>
          </TouchableOpacity>

          <TouchableOpacity
  onPress={() =>
    this.props.navigation.navigate("Edit", {
      image: this.state.image,
    })
  }
  style={styles.PickImageButton}
>
  <Text style={styles.HomeText}>Next Step</Text>
</TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Camera")}
            style={styles.PickImageButton}
          >
            <Text style={styles.HomeText}>Camera</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={[styles.ButtonSignOut]}
            onPress={HandleSignOut}
          >
            <Text style={styles.LoginText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Home;
