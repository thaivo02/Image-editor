import { Text, View, StyleSheet } from "react-native";
import React, { Component } from "react";
import CameraPreview from "../function/CameraPreview";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Camera } from "expo-camera";

let camera = Camera;

export class DeviceCamera extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    } else {
      Alert.alert("Access denied");
    }
  };

  __takePicture = async () => {
    const photo = await camera.takePictureAsync();
    console.log(photo);
    this.setState({ previewVisible: true, capturedImage: photo });
  };

  __retakePicture = async () => {
    this.setState({ previewVisible: false, capturedImage: null });
    this.__startCamera();
  };

  __handleFlashMode = async () => {
    if (this.state.flashMode === "on") {
      this.setState({ flashMode: "off" });
    } else if (this.state.flashMode === "off") {
      this.setState({ flashMode: "on" });
    } else {
      this.setState({ flashMode: "auto" });
    }
  };

  __switchCamera = async () => {
    if (this.state.cameraType === "back") {
      this.setState({ cameraType: "front" });
    } else {
      this.setState({ cameraType: "back" });
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            width: "100%",
          }}
        >
          {this.state.previewVisible && this.state.capturedImage ? (
            <CameraPreview
              photo={this.state.capturedImage}
              editPhoto={() =>
                this.props.navigation.navigate("Edit", {
                  image: this.state.capturedImage.uri,
                })
              }
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
                      borderRadius: 90,
                      height: 25,
                      width: 25,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        textAlign: "center",
                      }}
                    >
                      ⚡️
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={this.__switchCamera}
                    style={{
                      marginTop: 20,
                      borderRadius: 50,
                      height: 25,
                      width: 25,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        textAlign: "center",
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
                        borderRadius: 50,
                        backgroundColor: "#fff",
                      }}
                    />
                  </View>
                </View>
              </View>
            </Camera>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DeviceCamera;
