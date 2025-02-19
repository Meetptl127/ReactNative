import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  const { width = 24, height = 24, fill = "#111", ...rest } = props; // Allow dynamic width, height, and color

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest} // Spread other props for flexibility
    >
      <Path
        d="M10.824 2a4.706 4.706 0 100 9.412 4.706 4.706 0 000-9.412zm-3.53 4.706a3.53 3.53 0 117.06 0 3.53 3.53 0 01-7.06 0zm-2.342 5.883a2.355 2.355 0 00-2.363 2.353c0 1.99.98 3.49 2.511 4.467 1.509.961 3.542 1.415 5.724 1.415.42 0 .835-.016 1.242-.05a2.58 2.58 0 01.006-1.183c-.403.038-.82.057-1.248.057-2.041 0-3.832-.429-5.09-1.232-1.236-.788-1.969-1.933-1.969-3.474 0-.651.527-1.177 1.187-1.177h11.193c-.012-.31.038-.619.148-.908l.1-.268H4.954zM17.727 12.39l-.333.883a1.103 1.103 0 00.26 1.186l1.033 1.01c-.083 1.295-.696 2.299-1.838 3.013l-1.441-.341a1.255 1.255 0 00-1.217.38l-.64.714a1.394 1.394 0 00.24 2.106l.406.276c.497.337 1.121.499 1.7.29 3.203-1.164 5.985-5.724 5.447-8.93-.097-.579-.557-1.01-1.114-1.247l-.456-.196c-.798-.34-1.744.056-2.047.857z"
        fill={fill} // Use dynamic fill color
      />
    </Svg>
  );
}

export default SvgComponent;
