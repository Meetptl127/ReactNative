import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      width={24}
      height={25}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M4 14.078c3-6.77 12-6.77 15 0M11.5 17.724c-.53 0-1.04-.22-1.414-.61A2.128 2.128 0 019.5 15.64c0-.553.21-1.083.586-1.473a1.96 1.96 0 011.414-.61c.53 0 1.04.219 1.414.61.375.39.586.92.586 1.473 0 .552-.21 1.082-.586 1.473a1.96 1.96 0 01-1.414.61z"
        stroke="#014884"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
