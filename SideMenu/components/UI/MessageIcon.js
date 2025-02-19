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
      <G clipPath="url(#clip0_1_197)">
        <Path
          d="M24 16v5a3 3 0 01-3 3h-5a8 8 0 01-6.92-4 10.968 10.968 0 002.242-.248A5.988 5.988 0 0016 22h5a1 1 0 001-1v-5a5.988 5.988 0 00-2.252-4.678c.16-.737.245-1.488.252-2.242A8 8 0 0124 16zm-6.023-6.35A9 9 0 008.349.024 9.418 9.418 0 000 9.294v5.04C0 16.866 1.507 18 3 18h5.7a9.42 9.42 0 009.277-8.35zm-4.027-5.6a7.017 7.017 0 012.032 5.46A7.364 7.364 0 018.7 16H3c-.928 0-1-1.275-1-1.666v-5.04a7.362 7.362 0 016.49-7.276 7.012 7.012 0 015.46 2.033z"
          fill="#75797B"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1_197">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
