import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.023 20c-.382 1.333-.023 4 9.904 4 9.926 0 10.29-2.667 9.9-4-1.566-3.56-4.955-5.998-10.005-5.999-4.787 0-8.184 2.424-9.785 5.969l-.014.03zm9.904-4c-3.533 0-6.149 1.587-7.606 4-.44.667.479 2 7.679 2s8.14-1.333 7.71-2c-1.441-2.412-4.067-4-7.783-4zM12 12a6 6 0 100-12 6 6 0 000 12zm0-2a4 4 0 100-8 4 4 0 000 8z"
        fill="#6C7072"
      />
    </Svg>
  );
}

export default SvgComponent;
