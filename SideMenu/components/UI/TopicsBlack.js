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
      <G clipPath="url(#clip0_1_211)">
        <Path
          d="M14 7V.46c.925.35 1.765.891 2.465 1.59l3.484 3.486A6.956 6.956 0 0121.54 8H15a1 1 0 01-1-1zm8 3.485V19a5.006 5.006 0 01-5 5H7a5.006 5.006 0 01-5-5V5a5.006 5.006 0 015-5h4.515c.163 0 .324.013.485.024V7a3 3 0 003 3h6.976c.011.161.024.322.024.485zM14 19a1 1 0 00-1-1H8a1 1 0 000 2h5a1 1 0 001-1zm3-4a1 1 0 00-1-1H8a1 1 0 000 2h8a1 1 0 001-1z"
          fill="#0F0F0F"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1_211">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
