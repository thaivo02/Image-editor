import React, { Component } from "react";
import { Node, Shaders } from "gl-react";

const shaders = Shaders.create({
  Negative: {
    frag: `precision highp float;
varying vec2 uv;
uniform sampler2D t;
uniform float factor;
void main () {
  vec4 c = texture2D(t, uv);
  gl_FragColor = vec4(mix(c.rgb, 1.0 - c.rgb, factor), c.a);
}`,
  },
});

const Negative = ({ factor, children }) => (
  <Node
    shader={shaders.Negative}
    uniforms={{
      t: children,
      factor,
    }}
  />
);

export default Negative;
