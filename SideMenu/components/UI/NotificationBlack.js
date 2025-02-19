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
      <G clipPath="url(#clip0_1_213)" fill="#0F0F0F">
        <Path d="M7.424 21a4.99 4.99 0 009.152 0H7.424zM22.392 12.549l-1.736-5.723A9.322 9.322 0 002.58 7.28l-1.348 5.537A5 5 0 006.09 19h11.517a5 5 0 004.785-6.451z" />
      </G>
      <Defs>
        <ClipPath id="clip0_1_213">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
