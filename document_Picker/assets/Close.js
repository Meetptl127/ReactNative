import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      width={26}
      height={26}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M14.528 13l4.658-4.648a1.088 1.088 0 00-1.538-1.538L13 11.473 8.353 6.814a1.088 1.088 0 00-1.539 1.538L11.473 13l-4.659 4.648a1.083 1.083 0 000 1.538 1.083 1.083 0 001.539 0L13 14.527l4.648 4.659a1.082 1.082 0 001.538 0 1.084 1.084 0 000-1.538L14.528 13z"
        fill="#000"
      />
    </Svg>
  );
}

export default SvgComponent;
