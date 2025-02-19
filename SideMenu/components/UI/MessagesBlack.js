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
      <G clipPath="url(#clip0_1_209)">
        <Path
          d="M8.7 18H3c-1.493 0-3-1.134-3-3.666v-5.04A9.418 9.418 0 018.349.023a9 9 0 019.628 9.628A9.419 9.419 0 018.7 18zM20 9.08h-.012c0 .237 0 .474-.012.712-.386 5.408-5.329 9.986-10.892 10.189v.015A8 8 0 0016 24h5a3 3 0 003-3v-5a8 8 0 00-4-6.92z"
          fill="#0F0F0F"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1_209">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
