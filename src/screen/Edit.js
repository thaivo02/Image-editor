import React, { Component } from "react";
import { View, Button, Dimensions, ToastAndroid } from "react-native";
import { Surface } from "gl-react-expo";
import { ScrollView } from "react-native-gesture-handler";
import * as MediaLibrary from "expo-media-library";
import Field from "../function/Field.js";
import ImageEffects from "../function/ImageEffects.js";

const percentagePrint = (v) => (v * 100).toFixed(0) + "%";
const radiantPrint = (r) => ((180 * r) / Math.PI).toFixed(0) + "°";

const initialInputs = {
  blur: 0,
  saturation: 1,
  contrast: 1,
  brightness: 1,
  negative: 0,
  hue: 0,
  sepia: 0,
  flyeye: 0,
};

const fields = [
  {
    id: "blur",
    name: "Blur",
    min: 0,
    max: 6,
    step: 0.1,
    prettyPrint: (blur) => blur.toFixed(1),
  },
  {
    id: "contrast",
    name: "Contrast",
    min: 0,
    max: 4,
    step: 0.1,
    prettyPrint: percentagePrint,
  },
  {
    id: "brightness",
    name: "Brightness",
    min: 0,
    max: 4,
    step: 0.1,
    prettyPrint: percentagePrint,
  },
  {
    id: "saturation",
    name: "Saturation",
    min: 0,
    max: 10,
    step: 0.1,
    prettyPrint: percentagePrint,
  },
  {
    id: "hue",
    name: "HueRotate",
    min: 0,
    max: 2 * Math.PI,
    step: 0.1,
    prettyPrint: radiantPrint,
  },
  {
    id: "negative",
    name: "Negative",
    min: 0,
    max: 1,
    step: 0.05,
    prettyPrint: percentagePrint,
  },
  {
    id: "sepia",
    name: "Sepia",
    min: 0,
    max: 1,
    step: 0.05,
    prettyPrint: percentagePrint,
  },
  {
    id: "flyeye",
    name: "FlyEye",
    min: 0,
    max: 1,
    step: 0.05,
    prettyPrint: percentagePrint,
  },
];

export class Edit extends Component {
  constructor(props) {
    // super(props);
    // this.state = {
    //   contrast: 1,
    //   saturation: 1,
    //   brightness: 1,
    //   blur: 0,
    //   hue: 0,
    //   temp: 1,
    //   sepia: 0,
    //   negative: 0,
    //   flyeye: 0,
    // };
    super(props);
    this.state = {
      content: {
        uri: "http://i.imgur.com/wxqlQkh.jpg",
        type: "image/jpg",
        mainType: "image",
        // width: 512,
        // height: 340
      },
      // uploaded: null,
      ...initialInputs,
    };
  }
  onLoadNewContent = (content) => {
    this.setState({ content });
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
    const { content, ...effects } = this.state;
    const URL = "https://i.imgur.com/uTP9Xfr.jpg";
    const { _downloadImage } = this;
    return (
      <>
        <View>
          <Surface
            ref={(ref) => (this.surfaceRef = ref)}
            style={{ width: Dimensions.get("screen").width, height: 500 }}
          >
            <ImageEffects
              {...effects}
              uri={
                this.props.route.params.image
                  ? this.props.route.params.image
                  : URL
              }
            />
          </Surface>
        </View>
        <ScrollView>
          {fields.map(({ id, ...props }) => (
            <Field
              key={id}
              {...props}
              value={effects[id]}
              onChange={(value) => this.setState({ [id]: value })}
              onReset={() => this.setState({ [id]: initialInputs[id] })}
            />
          ))}
          {/* <View>
            <Button onPress={_downloadImage} title="Download" />
          </View> */}
        </ScrollView>
      </>
    );
  }
}

export default Edit;
