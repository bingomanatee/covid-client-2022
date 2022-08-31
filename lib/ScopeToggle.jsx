import * as React from "react";
import styles from '../styles/Scope.module.css';

const PROV_LBL = "By Province";
const STATE_LBL = "By Country";

const SvgScopeToggle = ({ toggle, scope }) => {

  return <svg width="135px" height="41px" viewBox="0 0 135.0 41.0"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink">
    <defs>
      <clipPath id="scope-i0">
        <path d="M135,0 L135,41 L0,41 L0,0 L135,0 Z"/>
      </clipPath>
      <clipPath id="scope-i1">
        <path
          d="M67.5,0 C104.779221,0 135,30.2207794 135,67.5 C135,104.779221 104.779221,135 67.5,135 C30.2207794,135 0,104.779221 0,67.5 C0,30.2207794 30.2207794,0 67.5,0 Z"/>
      </clipPath>
      <radialGradient id="scope-i2" cx="67.5px" cy="63.885335px" r="135px"
                      gradientTransform="translate(131.38533501770723 -3.6146649822928336) rotate(90.0)"
                      gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFFFFF" offset="0%"/>
        <stop stopColor="#FFFFFF" offset="27.9190207%"/>
        <stop stopColor="#E7E6FF" offset="43.5721354%"/>
        <stop stopColor="#C9C7F0" offset="50.400907%"/>
        <stop stopColor="#999696" offset="56.9009658%"/>
        <stop stopColor="#000000" offset="100%"/>
      </radialGradient>
    </defs>
    <g clipPath="url(#scope-i0)">
      <g transform="translate(0.0 -94.0)">
        <g clipPath="url(#scope-i1)">
          <polygon points="0,94 135,94 135,135 0,135 0,94" stroke="none"
                   onClick={() => {
                     console.log('clicked toggle');
                     toggle();
                   }
                   }
                   fill="url(#scope-i2)"/>
          <path
            d="M67.5,135 C104.779221,135 135,104.779221 135,67.5 C135,30.2207794 104.779221,0 67.5,0 C30.2207794,0 0,30.2207794 0,67.5 C0,104.779221 30.2207794,135 67.5,135 Z"
            stroke="#9E9E9E" strokeWidth={2} fill="none" strokeMiterlimit={5}/>
        </g>
      </g>
      <g transform="translate(36.0 3)"
        onClick={() => {
          toggle();
        }}>
        <text transform="translate(30 11.0)"
              textAnchor="middle"
              className={styles['title']}
        >
          {scope === 'state' ? PROV_LBL : STATE_LBL}
        </text>
      </g>
      <g transform="translate(36.0 35) rotate(180.0)"
         onClick={() => {
           console.log('clicked toggle');
           toggle();
         }}>
        <text transform="translate(-30 11.0)"
              textAnchor="middle"
              className={styles['title-flipped']}
        >
          {scope === 'state' ? STATE_LBL : PROV_LBL}
        </text>
      </g>
    </g>
  </svg>;
};

export default SvgScopeToggle;
