import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      width={22}
      height={22}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_5_1853)">
        <Path
          d="M12.618.907l8.832 19.835-1.025.459-8.832-19.835 1.025-.459zM.55 21.187V.799h1.133v20.388H.55zm6.796 0V.799h1.132v20.388H7.346z"
          fill="#777"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_5_1853">
          <Path fill="#fff" d="M0 0H22V22H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
