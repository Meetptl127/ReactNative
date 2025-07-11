import * as React from "react";
import Svg, { Rect, G, Path, Defs, ClipPath } from "react-native-svg";

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
        fill="#FEFBFB"
        stroke="#E70707"
      />
      <G clipPath="url(#clip0_60_641)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M31.323 16v15.323a3.226 3.226 0 01-3.226 3.225h-1.613v-1.613h1.613a1.613 1.613 0 001.613-1.612V16h-3.226a2.42 2.42 0 01-2.42-2.42v-3.225h-8.87a1.613 1.613 0 00-1.613 1.613v14.516h-1.613V11.968a3.226 3.226 0 013.226-3.226h8.87L31.323 16zm-20 11.855H8.742v6.45h1.276V32.14h1.295c.463 0 .856-.092 1.18-.279.328-.188.578-.443.747-.764a2.29 2.29 0 00.26-1.092c0-.403-.085-.768-.255-1.092a1.896 1.896 0 00-.742-.77c-.322-.193-.714-.288-1.18-.288zm.879 2.15c.005.212-.042.423-.137.613a.926.926 0 01-.384.389 1.281 1.281 0 01-.605.132h-1.063V28.87h1.064c.352 0 .628.097.826.292.199.197.299.477.299.842zm1.963-2.15v6.45h2.354c.647 0 1.184-.13 1.61-.382.43-.258.767-.648.96-1.112.21-.484.316-1.067.316-1.748 0-.677-.105-1.255-.316-1.734a2.3 2.3 0 00-.95-1.097c-.426-.251-.966-.377-1.621-.377h-2.354zm1.275 1.04h.908c.4 0 .726.08.983.245.266.174.467.432.57.733.128.324.19.729.19 1.214a3.71 3.71 0 01-.109.955 1.839 1.839 0 01-.316.68 1.29 1.29 0 01-.539.407 2.091 2.091 0 01-.779.132h-.908v-4.366zm6.037 2.844v2.566h-1.274v-6.45h4.11v1.053h-2.836v1.802h2.59v1.029h-2.59z"
          fill="#E70707"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_60_641">
          <Path
            fill="#fff"
            transform="translate(8.742 8.742)"
            d="M0 0H25.8065V25.8065H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
