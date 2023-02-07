import { Node, Shaders } from "gl-react";
import React from "react";

const shaders = Shaders.create({
  Flyeye: {
    frag: `
precision highp float;
varying vec2 uv;
uniform sampler2D t;
uniform float flyeye;
void main () {
  gl_FragColor = texture2D(
    t,
    uv + vec2(
      0.01 * sin(uv.x * flyeye * 200.0),
      0.01 * sin(uv.y * flyeye * 200.0)
    )
  );
}
    `,
  },
});

const Flyeye = ({ flyeye, children: t }) => {
  return <Node shader={shaders.Flyeye} uniforms={{ flyeye, t }} />;
};

export default Flyeye;
