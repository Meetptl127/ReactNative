import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      width={42}
      height={42}
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect
        x={1}
        y={1}
        width={40}
        height={40}
        rx={4}
        fill="#FAFFF8"
        stroke="#55A227"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30.586 12.304h-7.598v-1.79L10.5 12.44v16.895l12.488 2.151v-2.653h7.598a.871.871 0 00.914-.822V13.125a.872.872 0 00-.914-.821zm.12 15.844h-7.743l-.013-1.416h1.865v-1.65h-1.88l-.008-.976h1.888v-1.65h-1.902l-.01-.974h1.912v-1.65h-1.918v-.976h1.918v-1.65h-1.918v-.974h1.918v-1.65h-1.918v-1.5h7.809v15.066z"
        fill="#20744A"
      />
      <Path
        d="M25.865 14.58h3.243v1.65h-3.243v-1.65zm0 2.625h3.243v1.65h-3.243v-1.65zm0 2.626h3.243v1.65h-3.243v-1.65zm0 2.625h3.243v1.65h-3.243v-1.65zm0 2.626h3.243v1.65h-3.243v-1.65z"
        fill="#20744A"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.76 17.005l1.61-.092 1.011 2.781 1.196-2.896 1.61-.092-1.955 3.949 1.954 3.96-1.701-.115-1.15-3.018-1.149 2.903-1.564-.138 1.817-3.497-1.679-3.745z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SvgComponent;
