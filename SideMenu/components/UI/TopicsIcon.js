import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

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
      <G clipPath="url(#clip0_1_199)">
        <Path
          d="M17 14a1 1 0 01-1 1H8a1 1 0 010-2h8a1 1 0 011 1zm-4 3H8a1 1 0 100 2h5a1 1 0 000-2zm9-6.515V19a5.006 5.006 0 01-5 5H7a5.006 5.006 0 01-5-5V5a5.006 5.006 0 015-5h4.515a6.958 6.958 0 014.95 2.05l3.484 3.486A6.952 6.952 0 0122 10.485zm-6.949-7.021a5.013 5.013 0 00-1.05-.78V7a1 1 0 001 1h4.315a4.987 4.987 0 00-.78-1.05L15.05 3.464zm4.95 7.021c0-.165-.033-.323-.048-.485H15a3 3 0 01-3-3V2.047c-.162-.015-.32-.047-.485-.047H7a3 3 0 00-3 3v14a3 3 0 003 3h10a3 3 0 003-3v-8.515z"
          fill="#6C7072"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1_199">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
