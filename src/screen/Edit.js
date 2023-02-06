import React, { Component } from "react";
import { View, Image, Button, Dimensions, ToastAndroid } from "react-native";
import { Surface } from "gl-react-expo";
import { ScrollView } from "react-native-gesture-handler";
import * as MediaLibrary from "expo-media-library";
import Saturate from "../function/Saturate.js";
import { BlurXY } from "../function/Blur.js";
import Sliders from "../function/Sliders.js";
import HueRotate from "../function/Hue.js";
import Sepia from "../function/Sepia.js";
import Negative from "../function/Negative.js";
import Flyeye from "../function/Flyeye.js";

export class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contrast: 1,
      saturation: 1,
      brightness: 1,
      blur: 0,
      hue: 0,
      temp: 1,
      sepia: 0,
      negative: 0,
      flyeye: 0,
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
  setHue = (value) => {
    this.setState({
      hue: value,
    });
  };
  setTemp = (value) => {
    this.setState({
      temp: value,
    });
  };
  setSepia = (value) => {
    this.setState({
      sepia: value,
    });
  };
  setNegative = (value) => {
    this.setState({
      negative: value,
    });
  };
  setFlyeye = (value) => {
    this.setState({
      flyeye: value,
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
    const {
      saturation,
      brightness,
      contrast,
      blur,
      hue,
      sepia,
      negative,
      flyeye,
    } = this.state;
    const URL = "https://i.imgur.com/uTP9Xfr.jpg";
    const {
      setBrightness,
      setContrast,
      setSaturation,
      setBlur,
      setHue,
      setSepia,
      setNegative,
      setFlyeye,
      _downloadImage,
    } = this;
    return (
      <>
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
              <HueRotate {...{ hue: hue }}>
                <Sepia {...{ sepia: sepia }}>
                  <Negative {...{ factor: negative }}>
                    <Flyeye {...{ flyeye: flyeye }}>
                      <BlurXY factor={blur}>
                        {{
                          uri: this.props.route.params.image
                            ? this.props.route.params.image
                            : URL,
                        }}
                      </BlurXY>
                    </Flyeye>
                  </Negative>
                </Sepia>
              </HueRotate>
            </Saturate>
          </Surface>
        </View>
        <ScrollView>
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
              hue,
              setHue,
              sepia,
              setSepia,
              negative,
              setNegative,
              flyeye,
              setFlyeye,
            }}
          />
          <View>
            <Button onPress={_downloadImage} title="Download" />
          </View>
        </ScrollView>
      </>
    );
  }
}

export default Edit;
