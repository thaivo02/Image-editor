import { View, Text } from "react-native";
import React from "react";
import Slider from "@react-native-community/slider";

const Sliders = ({
  contrast,
  setContrast,
  brightness,
  setBrightness,
  saturation,
  setSaturation,
  blur,
  setBlur,
}) => {
  return (
    <View style={{ marginTop: 10 }}>
      <Text style={{ textAlign: "center" }}>Contrast {contrast}</Text>
      <Slider
        style={{
          width: 300,
          height: 40,
          marginHorizontal: 40,
          marginVertical: 10,
        }}
        minimumValue={-50}
        step={1}
        value={contrast}
        maximumValue={50}
        onValueChange={(value) => setContrast(value)}
        //   onSlidingComplete={(value) => setContrast(value)}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
      <Text style={{ textAlign: "center" }}>Brightness {brightness}</Text>
      <Slider
        style={{
          width: 300,
          height: 40,
          marginHorizontal: 40,
          marginVertical: 10,
        }}
        step={1}
        minimumValue={1}
        value={brightness}
        maximumValue={10}
        onValueChange={(value) => setBrightness(value)}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
      <Text style={{ textAlign: "center" }}>Saturation {saturation}</Text>
      <Slider
        style={{
          width: 300,
          height: 40,
          marginHorizontal: 40,
          marginVertical: 10,
        }}
        minimumValue={-50}
        step={1}
        value={saturation}
        maximumValue={50}
        onValueChange={(value) => setSaturation(value)}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
      <Text style={{ textAlign: "center" }}>Blur {blur}</Text>
      <Slider
        style={{
          width: 300,
          height: 40,
          marginHorizontal: 40,
          marginVertical: 10,
        }}
        minimumValue={1}
        step={1}
        value={blur}
        maximumValue={10}
        onValueChange={(value) => setBlur(value)}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
    </View>
  );
};

export default Sliders;
