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
      <G clipPath="url(#clip0_1_195)">
        <Path
          d="M22.555 13.662l-1.9-6.836a9.321 9.321 0 00-18.08.474l-1.47 6.615A5 5 0 005.985 20H7.1a5 5 0 009.8 0h.838a5 5 0 004.818-6.338h-.001zM12 22a2.999 2.999 0 01-2.816-2h5.632A3 3 0 0112 22zm8.126-5.185A2.977 2.977 0 0117.736 18H5.987a2.999 2.999 0 01-2.928-3.651l1.47-6.616a7.321 7.321 0 0114.2-.372l1.9 6.836a2.978 2.978 0 01-.502 2.618z"
          fill="#6C7072"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1_195">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
