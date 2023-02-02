import React, { useRef, useState, createRef } from "react";
import { View, Text, Dimensions, Button, ToastAndroid } from "react-native";
import { Surface } from "gl-react-expo";
import { ScrollView } from "react-native-gesture-handler";
import * as MediaLibrary from "expo-media-library";
import Saturate from "../function/Saturate.js";
import { BlurXY } from "../function/Blur.js";
import Sliders from "../function/Sliders.js";

class Home extends React.Component {
  state = {
    contrast: 1,
    saturation: 1,
    brightness: 1,
    blur: 1,
  };
  setContrast = (value) => {
    this.setState({
      contrast: value,
    });
  };

  setSaturation = (value) => {
    this.setState({
      saturation: value,
    });
  };
  setBrightness = (value) => {
    this.setState({
      brightness: value,
    });
  };
  setBlur = (value) => {
    this.setState({
      blur: value,
    });
  };

  _downloadImage = async () => {
    const result = await this.surfaceRef.glView.capture();
    const asset = await MediaLibrary.createAssetAsync(result.uri);
    await MediaLibrary.createAlbumAsync("Experiment", asset);
    ToastAndroid.showWithGravity(
      "Image Saved to the storage",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };
  render() {
    const imageURL = "https://i.imgur.com/uTP9Xfr.jpg";
    const { saturation, brightness, contrast, blur } = this.state;
    const {
      setBrightness,
      setContrast,
      setSaturation,
      setBlur,
      _downloadImage,
    } = this;
    return (
      <>
        <ScrollView>
          <View>
            <Surface
              ref={(ref) => (this.surfaceRef = ref)}
              style={{ width: Dimensions.get("screen").width, height: 500 }}
            >
              <Saturate
                {...{
                  contrast: contrast,
                  saturation: saturation,
                  brightness: brightness,
                }}
              >
                <BlurXY factor={blur}>
                  {{
                    uri: imageURL,
                  }}
                </BlurXY>
              </Saturate>
            </Surface>
          </View>
          <Sliders
            {...{
              saturation,
              setSaturation,
              contrast,
              setContrast,
              brightness,
              setBrightness,
              blur,
              setBlur,
            }}
          />
          {/* <View>
            <Button onPress={_downloadImage} title="Download" />
          </View> */}
        </ScrollView>
      </>
    );
  }
}

export default Home;
