import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      width={18}
      height={20}
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M9 1.162L.947 6.082v12.922H6.05v-6.97h5.946v6.97h5.058V6.046L9 1.162zM9 0l9 5.284V20h-6.952v-6.97H6.997V20H0V5.331L9 0z"
        fill="#B3B3B3"
      />
    </Svg>
  );
}

export default SvgComponent;
