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
        d="M19.696 18.217l-4.93-4.95a7.884 7.884 0 001.962-5.192C16.728 3.623 12.976 0 8.364 0 3.752 0 0 3.623 0 8.075c0 4.453 3.752 8.075 8.364 8.075a8.48 8.48 0 004.792-1.461l4.967 4.988c.208.208.487.323.787.323.283 0 .552-.104.756-.294.433-.403.447-1.07.03-1.49zM8.364 2.107c3.409 0 6.182 2.677 6.182 5.968s-2.773 5.969-6.182 5.969c-3.409 0-6.182-2.678-6.182-5.969 0-3.291 2.773-5.968 6.182-5.968z"
        fill="#777"
      />
    </Svg>
  );
}

export default SvgComponent;
