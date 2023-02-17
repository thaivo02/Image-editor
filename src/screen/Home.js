import { View, Button, Image, Dimensions, Text } from "react-native";
import React, { Component } from "react";
import * as ImagePicker from "expo-image-picker";
import styles from "../stylesheet/Styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth } from "../../Firebaseconfig";
import CameraPreview from "../function/CameraPreview";
import { Camera } from "expo-camera";

import { useNavigation } from "@react-navigation/core";

let camera = Camera;

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      startCamera: false,
      previewVisible: false,
      capturedImage: null,
      cameraType: Camera.Constants.Type.back,
      flashMode: "off",
    };
  }

  __startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    console.log(status);
    if (status === "granted") {
      this.setState({ startCamera: true });
      // setStartCamera(true);
    } else {
      Alert.alert("Access denied");
    }
  };

  __takePicture = async () => {
    const photo = await camera.takePictureAsync();
    console.log(photo);
    this.setState({ setPreviewVisible: true });
    this.setState({ setCapturedImage: photo });
    // setPreviewVisible(true);
    //setStartCamera(false)
    // setCapturedImage(photo);
  };
  __savePhoto = () => {};

  __retakePicture = async () => {
    this.setState({ setCapturedImage: null });
    this.setState({ setPreviewVisible: false });
    // setCapturedImage(null);
    // setPreviewVisible(false);
    __startCamera();
  };

  __handleFlashMode = async () => {
    if (this.state.flashMode === "on") {
      this.setState({ flashMode: "off" });
      // setFlashMode("off");
    } else if (this.state.flashMode === "off") {
      this.setState({ flashMode: "on" });
      // setFlashMode("on");
    } else {
      this.setState({ flashMode: "auto" });
      // setFlashMode("auto");
    }
  };

  __switchCamera = async () => {
    if (this.state.cameraType === "back") {
      this.setState({ cameraType: "front" });
      // setCameraType("front");
    } else {
      this.setState({ cameraType: "back" });
      // setCameraType("back");
    }
  };

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
        <View style={{flex: 0.5}}></View>
        <View style={{flex: 3}}>        
       

        {this.state.startCamera ? (
          <View
            style={{
              flex: 1,
              width: "100%",
            }}
          >
            {this.state.previewVisible && this.state.capturedImage ? (
              <CameraPreview
                photo={capturedImage}
                savePhoto={this.__savePhoto}
                retakePicture={this.__retakePicture}
              />
            ) : (
              <Camera
                type={this.state.cameraType}
                flashMode={this.state.flashMode}
                style={{ flex: 1 }}
                ref={(r) => {
                  camera = r;
                }}
              >
                <View
                  style={{
                    flex: 1,
                    width: "100%",
                    backgroundColor: "transparent",
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      position: "absolute",
                      left: "5%",
                      top: "10%",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <TouchableOpacity
                      onPress={this.__handleFlashMode}
                      style={{
                        backgroundColor:
                          this.state.flashMode === "off" ? "#000" : "#fff",
                        // borderRadius: "50%",
                        height: 25,
                        width: 25,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                        }}
                      >
                        ⚡️
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={this.__switchCamera}
                      style={{
                        marginTop: 20,
                        // borderRadius: "50%",
                        height: 25,
                        width: 25,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                        }}
                      >
                        {this.state.cameraType === "front" ? "🤳" : "📷"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      position: "absolute",
                      bottom: 0,
                      flexDirection: "row",
                      flex: 1,
                      width: "100%",
                      padding: 20,
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        alignSelf: "center",
                        flex: 1,
                        alignItems: "center",
                      }}
                    >
                      <TouchableOpacity
                        onPress={this.__takePicture}
                        style={{
                          width: 70,
                          height: 70,
                          bottom: 0,
                          // borderRadius: 50,
                          backgroundColor: "#fff",
                        }}
                      />
                    </View>
                  </View>
                </View>
              </Camera>
            )}
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              backgroundColor: "#fff",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={this.__startCamera}
              style={{
                width: 130,
                // borderRadius: 4,
                backgroundColor: "#14274e",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Take picture
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {this.state.image && (
          <Image
            source={{ uri: this.state.image }}
            style={{ width: Dimensions.get("screen").width, height: 500 }}
          />
        )}
         <TouchableOpacity
          onPress={this.pickImage}
          style={styles.PickImageButton}
        >
          <Text style={styles.HomeText}> Pick an image from camera roll</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("Edit", { image: this.state.image })
          }
          style={styles.NextStep}
        >
          <Text style={styles.HomeText}>Next Step</Text>
        </TouchableOpacity></View>
      <View style={{flex: 1}}>
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