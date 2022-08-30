import * as React from "react"
import { useEffect, useState } from "react";

const LockScreen = ({ sequence }) => {

  const paths = [
    ({opacity}) => (
      <g transform="translate(-5.0 58.0)" opacity={opacity}>
        <g clipPath="url(#i1)">
          <polygon
            points="5.15802195,1.85640646 71.841978,1.85640646 71.841978,75.1435935 5.15802195,75.1435935 5.15802195,1.85640646"
            sroke="none" fill="teal"/>
        </g>
      </g>
    ), ({opacity}) => (
    <g transform="translate(29.0 118.0)" opacity={opacity}>
      <g clipPath="url(#i1)">
        <polygon
          points="5.15802195,1.85640646 71.841978,1.85640646 71.841978,75.1435935 5.15802195,75.1435935 5.15802195,1.85640646"
          sroke="none" fill="teal"/>
      </g>
    </g>
    ),({opacity}) =>  (
    <g transform="translate(99.0 118.0)" opacity={opacity}>
      <g clipPath="url(#i1)">
        <polygon
          points="5.15802195,1.85640646 71.841978,1.85640646 71.841978,75.1435935 5.15802195,75.1435935 5.15802195,1.85640646"
          sroke="none" fill="teal"/>
      </g>
    </g>
    ), ({opacity}) => (
    <g transform="translate(133.0 58.0)" opacity={opacity}>
      <g clipPath="url(#i1)">
        <polygon
          points="5.15802195,1.85640646 71.841978,1.85640646 71.841978,75.1435935 5.15802195,75.1435935 5.15802195,1.85640646"
          sroke="none" fill="teal"/>
      </g>
    </g>
    ),({opacity}) =>  (
    <g transform="translate(98.0 -1.0)" opacity={opacity}>
      <g clipPath="url(#i1)">
        <polygon
          points="5.15802195,1.85640646 71.841978,1.85640646 71.841978,75.1435935 5.15802195,75.1435935 5.15802195,1.85640646"
          sroke="none" fill="teal"/>
      </g>
    </g>
    ),({opacity}) =>  (
    <g transform="translate(29.0 -1.0)" opacity={opacity}>
      <g clipPath="url(#i1)">
        <polygon
          points="5.15802195,1.85640646 71.841978,1.85640646 71.841978,75.1435935 5.15802195,75.1435935 5.15802195,1.85640646"
          sroke="none" fill="teal"/>
      </g>
    </g>
    ),({opacity}) =>  (
    <g transform="translate(64.0 58.0)" opacity={0}>
      <g clipPath="url(#i1)">
        <polygon
          points="5.15802195,1.85640646 71.841978,1.85640646 71.841978,75.1435935 5.15802195,75.1435935 5.15802195,1.85640646"
          sroke="none" fill="teal"/>
      </g>
    </g>
    )
  ];

  return (
    <>
      <svg
        width="205px"
        height="194px"
        viewBox="0 0 205.0 194.0"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <clipPath id="i0">
            <path d="M205,0 L205,194 L0,194 L0,0 L205,0 Z"/>
          </clipPath>
          <clipPath id="i1">
            <path
              d="M44.5,3.46410162 L65.841978,15.7858984 C69.554791,17.9294919 71.841978,21.8910162 71.841978,26.1782032 L71.841978,50.8217968 C71.841978,55.1089838 69.554791,59.0705081 65.841978,61.2141016 L44.5,73.5358984 C40.7871871,75.6794919 36.2128129,75.6794919 32.5,73.5358984 L11.158022,61.2141016 C7.44520903,59.0705081 5.15802195,55.1089838 5.15802195,50.8217968 L5.15802195,26.1782032 C5.15802195,21.8910162 7.44520903,17.9294919 11.158022,15.7858984 L32.5,3.46410162 C36.2128129,1.32050808 40.7871871,1.32050808 44.5,3.46410162 Z"/>
          </clipPath>
          <clipPath id="i2">
            <path d="M215,0 L215,77 L0,77 L0,0 L215,0 Z"/>
          </clipPath>
        </defs>
        {paths[sequence ? (sequence - 1) : 6]({opacity: 0.5})}
        {paths[sequence]({opacity: 1})}
            <g>
              <text transform="translate(0 80)" className="value-label">
                <tspan x="100px" y="0px"
                       fill="#000000" textAnchor="middle">{"loading country "}</tspan>
                <tspan x="100px" y="14px"
                       fill="#000000" textAnchor="middle">{"and COVID data"}</tspan>
                <tspan x="100px" y="28px"
                       fill="#000000" textAnchor="middle">{"please wait"}</tspan>
              </text>
            </g>
      </svg>
    </>
  );
}

export default LockScreen
