import React from "react";
import Saturate from "../function/effects/Saturate.js";
import { BlurXY } from "../function/effects/Blur.js";
import HueRotate from "../function/effects/Hue.js";
import Sepia from "../function/effects/Sepia.js";
import Negative from "../function/effects/Negative.js";
import Flyeye from "../function/effects/Flyeye.js";

const ImageEffects = (props) => {
  return (
    <Saturate
      contrast={props.contrast}
      saturation={props.saturation}
      brightness={props.brightness}
    >
      <HueRotate hue={props.hue}>
        <Sepia sepia={props.sepia}>
          <Negative factor={props.negative}>
            <Flyeye flyeye={props.flyeye}>
              <BlurXY factor={props.blur}>{{ uri: props.uri }}</BlurXY>
            </Flyeye>
          </Negative>
        </Sepia>
      </HueRotate>
    </Saturate>
  );
};

export default ImageEffects;
