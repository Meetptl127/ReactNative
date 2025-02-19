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
        fill="#FEFBFB"
        stroke="#019EE0"
      />
      <Path
        d="M12.875 24.813h-1.438V11.874a1.439 1.439 0 011.438-1.438h12.938v1.438H12.874v12.938zm12.219-3.594a2.157 2.157 0 100-4.313 2.157 2.157 0 000 4.313zm0-2.875a.719.719 0 110 1.437.719.719 0 010-1.437z"
        fill="#019EE0"
      />
      <Path
        d="M30.125 14.031H16.469a1.44 1.44 0 00-1.438 1.438v13.656a1.439 1.439 0 001.438 1.438h13.656a1.439 1.439 0 001.438-1.438V15.469a1.44 1.44 0 00-1.438-1.438zm0 15.094H16.469v-4.313l2.875-2.872 4.015 4.015a1.437 1.437 0 002.032 0l1.14-1.14 3.594 3.591v.719zm0-2.751l-2.577-2.578a1.438 1.438 0 00-2.033 0l-1.14 1.14-4.015-4.015a1.438 1.438 0 00-2.033 0L16.47 22.78v-7.311h13.656v10.905z"
        fill="#019EE0"
      />
    </Svg>
  );
}

export default SvgComponent;
