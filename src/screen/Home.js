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
export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      imageUrls: [],
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
    const imageUrls = [];
    const imagesRef = Firebase.storage().ref().child(auth.currentUser.email);
    const result = await imagesRef.listAll();

    result.items.forEach((itemRef) => {
      itemRef.getDownloadURL().then((url) => {
        imageUrls.push(url);
        this.setState({
          images: imageUrls,
        });
      });
    });
    this.setState({ imageUrls });
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
        <View>
          <View
            style={{
              flex: 0.5,
              marginTop: 40,
              justifyContent: "center",
            }}
          >
            <FlatList
              data={this.state.imageUrls}
              horizontal
              // numColumns={4}
              contentContainerStyle={{
                paddingHorizontal: 10,
                // flexDirection: "row",
                // flexWrap: "wrap",
              }}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item}
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
                    height: 800,
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
              style={[styles.ButtonSignOut]}
              onPress={HandleSignOut}
            >
              <Text style={styles.LoginText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>
        <StatusBar style="auto" />
      </View>
    );
  }
}

export default Home;
