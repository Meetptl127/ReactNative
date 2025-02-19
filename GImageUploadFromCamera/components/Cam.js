import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M2.5 3.334v-2.5h1.666v2.5h2.5V5h-2.5v2.5H2.501V5H0V3.334h2.5zm2.5 5v-2.5h2.5v-2.5h5.833L14.86 5H17.5a1.671 1.671 0 011.667 1.667v10a1.671 1.671 0 01-1.667 1.667H4.166A1.671 1.671 0 012.5 16.667V8.334H5zm5.833 7.5a4.166 4.166 0 10-.003-8.332 4.166 4.166 0 00.004 8.332h-.001zm-2.666-4.166a2.666 2.666 0 105.332-.003 2.666 2.666 0 00-5.332.003z"
        fill="#00AFEE"
        opacity={0.9}
      />
    </Svg>
  );
}

export default SvgComponent;
