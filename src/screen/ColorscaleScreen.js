import { Canvas, CanvasRef } from "@benjeau/react-native-draw";
import React, { Component, useRef } from "react";
import {
  View,
  Image,
  Dimensions,
  Text,
  FlatList,
  ScrollView,
  TouchableHighlight,
  Alert,
  SafeAreaView,
} from "react-native";
import { Shaders, Node, GLSL } from "gl-react";
import { Surface } from "gl-react-native";
import colorScales from "./colorScales";export {colorScales};
import { TouchableOpacity } from "react-native";
import { LinearCopy, NearestCopy } from "gl-react";
import { ImageBackground } from "react-native";
 

const shaders = Shaders.create({
  colorify: {
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform sampler2D children, colorScale;
float greyscale (vec3 c) { return 0.2125 * c.r + 0.7154 * c.g + 0.0721 * c.b; }
void main() {
  vec4 original = texture2D(children, uv);
  vec4 newcolor = texture2D(colorScale, vec2(greyscale(original.rgb), 0.5));
  gl_FragColor = vec4(newcolor.rgb, original.a * newcolor.a);
}
` }
});

export const Colorify =
({ children, colorScale, interpolation }) =>
  <Node
    shader={shaders.colorify}
    uniformsOptions={{ colorScale: { interpolation } }}
    uniforms={{ colorScale, children }}
  />;

export default class Example extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uri: "http://i.imgur.com/wxqlQkh.jpg",
            type: "image/jpg",
            mainType: "image",
            canvasRef: useRef < CanvasRef > null,
            colorofcolorscale: "heatmap",
            interpolationofcolorscale: "linear",
            color: [],
        };
      }
      onLoadNewContent = (content) => {
        this.setState({ content });
      };
      changecolorscale(color, inter)
      {
        //console.log(color, inter);
        this.setState({
            uri: "http://i.imgur.com/wxqlQkh.jpg",
            type: "image/jpg",
            mainType: "image",
            canvasRef: useRef < CanvasRef > null,
            colorofcolorscale: color,
            interpolationofcolorscale: inter})
      };
  render() {
    const URL = "https://i.imgur.com/uTP9Xfr.jpg";
    const colorforcolorscales = Object.keys(colorScales);
    const interpolationforcolorscales = ['nearest','linear'];
    return (
      <ScrollView>
        <View style={{flex:1}}>
          <Surface ref={(ref) => (this.surfaceRef = ref)} style={{width:400, height:300}} >
            <Colorify colorScale={colorScales[this.state.colorofcolorscale]} interpolation={this.state.interpolationofcolorscale}>
            {{ uri: URL }}
            </Colorify>
            
          </Surface>
        </View>
        <View style = {{flex:1}}>
          <Text style={{fontSize:24, fontWeight:'bold'}}> Color scale</Text>
          
          <View style={{flexDirection:'row'}}>
          <ScrollView
              horizontal={true}
              style={{ width: "100%" , flex:1}}
              isUserInteractionEnabled={true}
            >
              <FlatList
                style={{width: "100%" }}
                data={colorforcolorscales}
                renderItem={({ item }) => {
                  return(
                      <View>
                        <TouchableOpacity onPress={()=>this.changecolorscale(item, this.state.interpolationofcolorscale)}>
                        <Text style ={{fontSize:20}}> {item}</Text>
                        </TouchableOpacity>
                      </View>
                  )
                }}/>
            </ScrollView>
            <ScrollView
              horizontal={true}
              style={{ width: "100%" , flex:1}}
              isUserInteractionEnabled={true}
            >
              <FlatList
                style={{width: "100%" }}
                data={interpolationforcolorscales}
                renderItem={({ item }) => {
                  return(
                      <View>
                        <TouchableOpacity onPress={()=>this.changecolorscale(this.state.colorofcolorscale,item)}>
                          <Text style ={{fontSize:20}}> {item}</Text>
                        </TouchableOpacity>
                      </View>
                  )
                }}/>
            </ScrollView>
            
            </View>
            <View>
              <Surface style={{ width:400, height:20}}>
                {this.state.interpolationofcolorscale === "linear" ? (
                  <LinearCopy>{colorScales[this.state.colorofcolorscale]}</LinearCopy>
                ) : (
                  <NearestCopy>{colorScales[this.state.colorofcolorscale]}</NearestCopy>
                )}
              </Surface>
            </View>
        </View>
      </ScrollView>
    );
  }
}
