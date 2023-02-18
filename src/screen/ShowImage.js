import { Text, View, Image, Dimensions } from "react-native";
import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";

const win = Dimensions.get("window");

const ratio = win.width / 541; //541 is actual image width

export class ShowImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
    };
  }
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
        </View>
        <StatusBar style="auto" />
      </View>
    );
  }
}

export default ShowImage;
