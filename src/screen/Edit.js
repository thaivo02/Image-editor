import React, { Component } from "react";
import { View, Image, Dimensions, ToastAndroid } from "react-native";
import { Surface } from "gl-react-expo";
import { ScrollView } from "react-native-gesture-handler";
import * as MediaLibrary from "expo-media-library";
import Saturate from "../function/Saturate.js";
import { BlurXY } from "../function/Blur.js";
import Sliders from "../function/Sliders.js";

export class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contrast: 1,
      saturation: 1,
      brightness: 1,
      blur: 1,
      image: props.image,
    };
  }
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
    const { saturation, brightness, contrast, blur } = this.state;
    const URL = "https://i.imgur.com/uTP9Xfr.jpg";
    const {
      setBrightness,
      setContrast,
      setSaturation,
      setBlur,
      // _downloadImage,
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
                    uri: this.state.image ? this.state.image : URL,
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

export default Edit;
