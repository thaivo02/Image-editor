import Slider from "@react-native-community/slider";
import { View, Text } from "react-native";
import React from "react";

const Field = ({ name, min, max, step, value, onChange, prettyPrint }) => (
  <View>
    <Text style={{ textAlign: "center" }}>
      {name} {parseFloat(value).toFixed(1)}
    </Text>
    <Slider
      style={{
        width: 300,
        height: 40,
        marginHorizontal: 40,
        marginVertical: 10,
      }}
      step={step || 0.01}
      value={value}
      minimumValue={min}
      maximumValue={max}
      onValueChange={(value) => onChange(parseFloat(value))}
      minimumTrackTintColor="#FFFFFF"
      maximumTrackTintColor="#000000"
    />
  </View>
);

export default Field;
