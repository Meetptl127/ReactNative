import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_1_215)">
        <Path
          d="M2.849 23.55a2.954 2.954 0 003.266-.644L12 17.053l5.885 5.853a2.955 2.955 0 003.27.644A2.953 2.953 0 0023 20.779V5a5.006 5.006 0 00-5-5H6a5.006 5.006 0 00-5 5v15.779a2.953 2.953 0 001.849 2.771z"
          fill="#0F0F0F"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1_215">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
