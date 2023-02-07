import { Node, Shaders } from "gl-react";
import React from "react";

const shaders = Shaders.create({
  Sepia: {
    frag: `
      precision highp float;
      varying vec2 uv;
      uniform sampler2D t;
      uniform mat4 sepia;
      void main () {
        gl_FragColor = sepia * texture2D(t, uv);
      }`,
  },
});

const Sepia = ({ children: t, sepia: s }) => {
  const mixArrays = (arr1, arr2, m) =>
    arr1.map((v, i) => (1 - m) * v + m * arr2[i]);
  const sepia = mixArrays(
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [0.3, 0.3, 0.3, 0, 0.6, 0.6, 0.6, 0, 0.1, 0.1, 0.1, 0, 0.2, 0, -0.2, 1],
    s
  );

  return <Node shader={shaders.Sepia} uniforms={{ t, sepia }} />;
};

export default Sepia;
