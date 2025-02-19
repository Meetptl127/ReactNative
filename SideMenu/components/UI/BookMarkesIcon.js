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
      <G clipPath="url(#clip0_1_193)">
        <Path
          d="M20.137 24a2.798 2.798 0 01-1.987-.835L12 17.051l-6.15 6.118a2.8 2.8 0 01-3.095.609A2.8 2.8 0 011 21.154V5a5 5 0 015-5h12a5 5 0 015 5v16.154a2.8 2.8 0 01-1.75 2.624c-.353.147-.731.223-1.113.222zM6 2a3 3 0 00-3 3v16.154a.843.843 0 001.437.6l6.863-6.821a1 1 0 011.41 0l6.855 6.819a.843.843 0 001.437-.6V5a3 3 0 00-3-3H6z"
          fill="#6C7072"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1_193">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
