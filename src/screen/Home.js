import { View, Button, Image, Dimensions,Text } from "react-native";
import React, { Component } from "react";
import * as ImagePicker from "expo-image-picker";
import styles from '../stylesheet/Styles';
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth } from "../../Firebaseconfig";
import { useNavigation } from '@react-navigation/core';
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
    // this.setState({navigation : useNavigation()})
    const HandleSignOut = ()=>{
      auth.signOut()
      .then(() =>{
        this.props.navigation.replace("Login")
      })
      .catch(error =>alert(error.message))
    }
    return (
      <View style={styles.HomeContainer}>
        <TouchableOpacity
          
          onPress={this.pickImage}
          style={styles.PickImageButton}
        >
        <Text style={styles.HomeText}> Pick an image from camera roll</Text>
        </TouchableOpacity>

        {this.state.image && (
          <Image
            source={{ uri: this.state.image }}
            style={{ width: Dimensions.get("screen").width, height: 500 }}
          />
        )}
        <TouchableOpacity
          
          onPress={() =>
            this.props.navigation.navigate("Edit", { image: this.state.image })
          }
          style={styles.PickImageButton}
        >
          <Text style={styles.HomeText}>Next Step</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.ButtonSignOut]} onPress ={HandleSignOut}>
          <Text style={styles.LoginText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Home;
