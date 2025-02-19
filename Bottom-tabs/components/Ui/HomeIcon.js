// HomeIcon.js
import React from "react";
import Svg, { Path } from "react-native-svg";

const HomeIcon = ({ width, height, fill }) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M10.2762 20.1386V14.5851H14.7189V20.1386C14.7189 20.7494 15.2187 21.2493 15.8296 21.2493H19.1617C19.7726 21.2493 20.2724 20.7494 20.2724 20.1386V12.3638H22.1605C22.6714 12.3638 22.9158 11.7307 22.5271 11.3975L13.2417 3.03402C12.8197 2.65639 12.1755 2.65639 11.7534 3.03402L2.46809 11.3975C2.09045 11.7307 2.3237 12.3638 2.83461 12.3638H4.72278V20.1386C4.72278 20.7494 5.22258 21.2493 5.83346 21.2493H9.16551C9.77639 21.2493 10.2762 20.7494 10.2762 20.1386Z"
      fill={fill} // Fill the icon with the color passed in the props
    />
  </Svg>
);

export default HomeIcon;
