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
      <G clipPath="url(#clip0_1_207)" fill="#0F0F0F">
        <Path d="M12 14.992a3 3 0 00-3 3v6h6v-6a3 3 0 00-3-3z" />
        <Path d="M17 17.992v6h4a3 3 0 003-3v-9.12a2 2 0 00-.563-1.393l-8.498-9.187a4 4 0 00-5.875 0L.581 10.476A2 2 0 000 11.886v9.106a3 3 0 003 3h4v-6c.019-2.727 2.22-4.953 4.878-5.018 2.748-.066 5.101 2.199 5.122 5.018z" />
        <Path d="M12 14.992a3 3 0 00-3 3v6h6v-6a3 3 0 00-3-3z" />
      </G>
      <Defs>
        <ClipPath id="clip0_1_207">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
