import { Text, View, Image, Dimensions } from "react-native";
import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native-gesture-handler";
import { shareAsync } from "expo-sharing";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import styles from "../stylesheet/Styles";

const win = Dimensions.get("window");

const ratio = win.width / 541; //541 is actual image width

const Download = async (uri) => {
  const downloadInstance = FileSystem.createDownloadResumable(
    uri,
    FileSystem.documentDirectory + "image.jpg"
  );

  const result = await FileSystem.downloadInstance.downloadAsync();

  return result;
};

export class ShowImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
    };
  }

  sharePic = async () => {
    const downloadInstance = FileSystem.createDownloadResumable(
      this.props.route.params.image,
      FileSystem.documentDirectory + "image.jpg"
    );

    const result = await downloadInstance.downloadAsync();

    shareAsync(result.uri);
  };

  savePhoto = async () => {
    const downloadInstance = FileSystem.createDownloadResumable(
      this.props.route.params.image,
      FileSystem.documentDirectory + "image.jpg"
    );

    const result = await downloadInstance.downloadAsync();

    const asset = await MediaLibrary.createAssetAsync(result.uri);

    alert("Image saved successfully to the media library.");
  };
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View>
          {this.props.route.params.image && (
            <Image
              source={{ uri: this.props.route.params.image }}
              style={{
                width: win.width,
                height: 600 * ratio,
              }}
            />
          )}
          <TouchableOpacity
            onPress={this.savePhoto}
            style={styles.SaveImageButton}
          >
            <Text>Download image</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.sharePic}
            style={styles.SaveImageButton}
          >
            <Text>Share image</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </View>
    );
  }
}

export default ShowImage;
