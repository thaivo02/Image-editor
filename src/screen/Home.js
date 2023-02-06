import { View, Button, Image, Dimensions } from "react-native";
import React, { Component } from "react";
import * as ImagePicker from "expo-image-picker";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
    };
  }

  pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      this.setState({ image: result.assets[0].uri });
    }
  };

  render() {
    return (
      <View>
        <Button
          title="Pick an image from camera roll"
          onPress={this.pickImage}
        />
        {this.state.image && (
          <Image
            source={{ uri: this.state.image }}
            style={{ width: Dimensions.get("screen").width, height: 500 }}
          />
        )}
        <Button
          title="Next step"
          onPress={() =>
            this.props.navigation.navigate("Edit", { image: this.state.image })
          }
        />
      </View>
    );
  }
}

export default Home;
