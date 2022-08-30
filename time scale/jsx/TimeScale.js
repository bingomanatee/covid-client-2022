import * as React from "react";

const SvgTimescale = props => <svg width="652px" height="72px" viewBox="0 0 652.0 72.0"
                                   xmlns="http://www.w3.org/2000/svg"
                                   xmlnsXlink="http://www.w3.org/1999/xlink" {...props}>
  <defs>
    <clipPath id="i0">
      <path d="M652,0 L652,72 L0,72 L0,0 L652,0 Z"/>
    </clipPath>
    <clipPath id="i1">
      <path d="M90,0 L90,16 L0,16 L0,0 L90,0 Z"/>
    </clipPath>
    <clipPath id="i2">
      <path
        d="M4.5,0 C6.98528137,0 9,1.790861 9,4 C9,6.209139 6.98528137,8 4.5,8 C2.01471863,8 0,6.209139 0,4 C0,1.790861 2.01471863,0 4.5,0 Z"/>
    </clipPath>
    <clipPath id="i3">
      <path d="M146,0 L146,19 L0,19 L0,0 L146,0 Z"/>
    </clipPath>
    <clipPath id="i4">
      <path
        d="M23,0 L23,51 L7,51 C3.13400675,51 4.73447626e-16,47.8659932 0,44 L0,7 C-4.73447626e-16,3.13400675 3.13400675,1.59834986e-15 7,0 L23,0 Z M49,0 C52.8659932,1.78006981e-16 56,3.13400675 56,7 L56,44 C56,47.8659932 52.8659932,51 49,51 L34,51 L34,0 L49,0 Z"/>
    </clipPath>
  </defs>
  <g clipPath="url(#i0)">
    <g transform="translate(17.0 31.0)">
      <path d="M0,0 L0,12 L617,12 L617,0" stroke="#969696" strokeWidth={1} fill="none" strokeMiterlimit={10}/>
    </g>
    <g transform="translate(17.0 15.0)">
      <g clipPath="url(#i1)">
        <text transform="translate(0.0 11.0)" fontFamily="HelveticaNeue, Helvetica Neue" fontSize={12}
              fontWeight="normal" fill="#000000">{"January 1 2020"}</text>
      </g>
    </g>
    <g transform="translate(107.0 21.0)">
      <g clipPath="url(#i1)">
        <text transform="translate(14.880000000000003 11.0)" fontFamily="HelveticaNeue, Helvetica Neue" fontSize={12}
              fontWeight="normal" fill="#000000" textAnchor="center">{"Febuary 22"}</text>
      </g>
      <g transform="translate(43.0 18.0)">
        <g clipPath="url(#i2)">
          <polygon points="0,0 9,0 9,8 0,8 0,0" stroke="none" fill="#FFFFFF"/>
          <path
            d="M4.5,8 C6.98528137,8 9,6.209139 9,4 C9,1.790861 6.98528137,0 4.5,0 C2.01471863,0 0,1.790861 0,4 C0,6.209139 2.01471863,8 4.5,8 Z"
            stroke="#969696" strokeWidth={2} fill="none" strokeMiterlimit={5}/>
        </g>
      </g>
    </g>
    <g transform="translate(488.0 15.0)">
      <g clipPath="url(#i3)">
        <text transform="translate(25.964 11.0)" fontFamily="HelveticaNeue, Helvetica Neue" fontSize={12}
              fontWeight="normal" fill="#000000" textAnchor="right">{"(now) August 27, 2022"}</text>
      </g>
    </g>
    <g transform="translate(315.0 18.0)">
      <path
        d="M23,0 L23,51 L7,51 C3.13400675,51 4.73447626e-16,47.8659932 0,44 L0,7 C-4.73447626e-16,3.13400675 3.13400675,1.59834986e-15 7,0 L23,0 Z M49,0 C52.8659932,1.78006981e-16 56,3.13400675 56,7 L56,44 C56,47.8659932 52.8659932,51 49,51 L34,51 L34,0 L49,0 Z"
        stroke="#E02020" strokeWidth={2} fill="none" strokeMiterlimit={5}/>
      <g clipPath="url(#i4)">
        <polygon points="0,0 56,0 56,51 0,51 0,0" stroke="none" fill="#FFE8E8"/>
      </g>
    </g>
  </g>
</svg>;

export default SvgTimescale;
