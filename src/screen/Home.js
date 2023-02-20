import {
  View,
  Image,
  Dimensions,
  Text,
  FlatList,
  TouchableHighlight,
  Alert,
} from "react-native";
import React, { Component } from "react";
import * as ImagePicker from "expo-image-picker";
import styles from "../stylesheet/Styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Firebase, auth } from "../../Firebaseconfig.js";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from '@expo/vector-icons';
export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      images: [],
      refreshing: false,
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
    const imagesRef = Firebase.storage().ref().child(auth.currentUser.email);
    const result = await imagesRef.listAll();
    const images = await Promise.all(result.items.map(async (itemRef) => {
      const url = await itemRef.getDownloadURL();
      const metadata = await itemRef.getMetadata();
      return { url, time: metadata.timeCreated };
    }));
    const sortedImageUrls = images
      .sort((a, b) => a.time - b.time)
      .map(image => image.url);
    this.setState({ imageUrls: sortedImageUrls });
    { console.log(sortedImageUrls) }
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
        <View style={{ flex: 0.4 }}></View>
        <View style={{ flex: 10 }}>
          <View style={{ flexDirection: "row", }}>
            <View style={{ flex: 10 }}>

            </View>
            <View style={{ flex: 10, justifyContent: 'center', alignItems: 'center', }}>
              <Text style={styles.RecentText}>Recent Photos</Text>
            </View>
            <View style={{ flex: 7 }}>

            </View>
            <TouchableOpacity
              style={{ flex: 1, margin: 6, marginRight: 15 }}
              onPress={HandleSignOut}
            >
              <MaterialIcons name="logout" size={24} color="#FF0000" />

            </TouchableOpacity>

          </View>
          <View
            style={{
              flex: 0.5,
              marginTop: 15,
              justifyContent: "center",
            }}
          >
            <FlatList
              data={this.state.imageUrls}
              horizontal
              numColumns={1}
              contentContainerStyle={{
                paddingHorizontal: 10,
                // flexDirection: "row",
                // flexWrap: "wrap",
              }}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableHighlight
                  onPress={() =>
                    this.props.navigation.navigate("ImagePreview", {
                      image: item,
                    })
                  }
                  underlayColor="transparent"
                >
                  <Image
                    source={{ uri: item }}
                    style={{
                      width: Dimensions.get("screen").width / 6,
                      height: Dimensions.get("screen").width / 6,
                      resizeMode: "contain",
                      borderRadius: 100,
                      marginRight: 10,
                      marginTop: 4,
                    }}
                  />
                </TouchableHighlight>
              )}
              refreshing={this.state.refreshing}
              onRefresh={this.getImages}
            />
          </View>
          <View
            style={{
              flex: 4,
              justifyContent: "center",
            }}
          >
            {this.state.image ? (
              this.state.image && (
                <Image
                  source={{ uri: this.state.image }}
                  style={{
                    width: Dimensions.get("screen").width,
                    height: 500,
                    resizeMode: "contain",
                  }}
                />
              )
            ) : (
              <Text style={{ textAlign: "center" }}>
                Select an image from storage or camera
              </Text>
            )}
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            {this.state.image ? (
              <View>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("Edit", {
                      image: this.state.image,
                    })
                  }
                  style={styles.PickImageButton}
                >
                  <Text style={styles.HomeText}>Edit photo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.PickImageButton}
                  onPress={() =>
                    Alert.alert("Take a picture to edit", "Choose an option", [
                      { text: "Cancel" },
                      {
                        text: "Camera",
                        onPress: () => {
                          this.props.navigation.navigate("Camera");
                        },
                      },
                      { text: "Library", onPress: this.pickImage },
                    ])
                  }
                >
                  <Text style={styles.HomeText}>Choose another photo</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <TouchableOpacity
                  style={styles.PickImageButton}
                  onPress={() =>
                    Alert.alert("Take a picture to edit", "Choose an option", [
                      {
                        text: "Camera",
                        onPress: () => {
                          this.props.navigation.navigate("Camera");
                        },
                      },

                      { text: "Library", onPress: this.pickImage },
                      { text: "Cancel" },

                    ])
                  }
                >
                  <Text style={styles.HomeText}>Edit photo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.PickImageButton}
                  disabled={true}
                >
                  <Text style={styles.HomeText}>Choose another photo</Text>
                </TouchableOpacity>
              </View>
            )}
            {/* {this.state.image ? (
              <TouchableOpacity
                style={styles.PickImageButton}
                onPress={() =>
                  Alert.alert("Take a picture to edit", "Choose an option", [
                    { text: "Cancel" },
                    {
                      text: "Camera",
                      onPress: () => {
                        this.props.navigation.navigate("Camera");
                      },
                    },
                    { text: "Library", onPress: this.pickImage },
                  ])
                }
              >
                <Text style={styles.HomeText}>Choose another photo</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.PickImageButton} disabled={true}>
                <Text style={styles.HomeText}>Choose another photo</Text>
              </TouchableOpacity>
            )} */}
            <TouchableOpacity

            >
              <Text style={styles.LoginText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>
        <StatusBar style="auto" />
        <View style={{flex: 0.3}}></View>
      </View>
    );
  }
}

export default Home;
