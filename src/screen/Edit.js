import { Canvas, CanvasRef } from '@benjeau/react-native-draw';
import React, { Component, useRef } from "react";
import styles from "../stylesheet/Styles";
import {
  View,
  Button,
  Dimensions,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { Surface } from "gl-react-expo";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import * as MediaLibrary from "expo-media-library";
import Field from "../function/Field.js";
import ImageEffects from "../function/ImageEffects.js";
import { Firebase, auth } from "../../Firebaseconfig.js";
import { AntDesign, Feather } from "@expo/vector-icons";

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
    super(props);
    this.state = {
      content: {
        uri: "http://i.imgur.com/wxqlQkh.jpg",
        type: "image/jpg",
        mainType: "image",
        canvasRef: useRef < CanvasRef > (null),

      },
      // uploaded: null,
      ...initialInputs,
    };
  }
  onLoadNewContent = (content) => {
    this.setState({ content });
  };

  _upload = async () => {
    try {
      const result = await this.surfaceRef.glView.capture();

      const response = await fetch(result.uri);
      const blob = await response.blob();

      const storageRef = Firebase.storage()
        .ref()
        .child(auth.currentUser.email + "/" + Date.now())
        .put(blob);
      await storageRef;
    } catch (error) {
      console.log(error);
    }
  };

  _downloadImage = async () => {
    try {
      let { status: existingStatus } =
        await MediaLibrary.requestPermissionsAsync();
      if (existingStatus !== "granted") {
        const status = await MediaLibrary.requestPermissionsAsync();
        existingStatus = status.status;
      }

      const result = await this.surfaceRef.glView.capture();
      const asset = await MediaLibrary.createAssetAsync(result.uri);

      alert("Image saved successfully to the media library.");
    } catch (error) {
      console.log(error);
    }
  };



  render() {
    const { content, ...effects } = this.state;
    const URL = "https://i.imgur.com/uTP9Xfr.jpg";
    const { _downloadImage } = this;


    return (
      <>
        <SafeAreaView style={{  alignSelf: "center" }}>
          <SafeAreaView style={{ flex: 0.12, flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Home")}
              style={{ padding: 15, flex: 1 }}
            >
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
            <SafeAreaView style={{ flex: 10 }}></SafeAreaView>
            <TouchableOpacity
              onPress={this._downloadImage}
              style={{ padding: 15, flex: 1 }}
            >
              <Feather name="download" size={24} color="black" />
            </TouchableOpacity>
          </SafeAreaView>
          <SafeAreaView
            style={{
              flex: 1,
              alignItems: "center",
              alignContent: "center",
              alignSelf: "center",
            }}
          >
            
            <Surface
              ref={(ref) => (this.surfaceRef = ref)}
              style={{
                width: Dimensions.get("screen").width,
                height: 425,
                zIndex : 1
              }}
            >
              <ImageEffects
                {...effects}
                uri={
                  this.props.route.params.image
                    ? this.props.route.params.image
                    : URL
                }
              />
              <Text style={{ position: "absolute", top: 0, left: 0, color: "black", fontSize: 24 }}>Hello </Text>
            </Surface>
          </SafeAreaView>
          <SafeAreaView>
            <TouchableHighlight
            onPress={() => this.setState({blur : 2, sepia:0.3  } )}
            style={{ padding: 10 }}>
                <Text>Blur</Text>
            </TouchableHighlight>
            <TouchableHighlight
            onPress={() => this.setState({saturation:0  } )}
            style={{ padding: 10 }}>
                <Text>GrayScale</Text>
            </TouchableHighlight>
          </SafeAreaView>
          <SafeAreaView style={{ flex: 0.5, justifyContent: 'center', alignItems: "center" }}>
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
            </ScrollView>
          </SafeAreaView>
        </SafeAreaView>
      </>
    );
  }
}

export default Edit;
