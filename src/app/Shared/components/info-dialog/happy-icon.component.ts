import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'happy-icon',
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      xmlns:xodm="http://www.corel.com/coreldraw/odm/2003"
      xml:space="preserve"
      version="1.1"
      style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
      viewBox="0 0 260.59 250.44"
    >
      <defs>
        <style type="text/css">
          .fil2 {
            fill: #606062;
          }
          .fil0 {
            fill: #e3cfae;
          }
          .fil1 {
            fill: url(#id0);
          }
        </style>
        <radialGradient
          id="id0"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(0.999999 -0 -0 0.961039 0 5)"
          cx="127.14"
          cy="121.77"
          r="342.43"
          fx="127.14"
          fy="121.77"
        >
          <stop offset="0" style="stop-opacity:1; stop-color:#FFD898" />
          <stop offset="1" style="stop-opacity:1;stop-color: yellow;" />
        </radialGradient>
      </defs>
      <g id="Layer_x0020_1">
        <metadata id="CorelCorpID_0Corel-Layer" />
        <ellipse class="fil0" cx="130.3" cy="125.22" rx="130.3" ry="125.22" />
        <ellipse class="fil1" cx="127.14" cy="121.77" rx="122.78" ry="117.99" />
        <ellipse class="fil2" cx="165.33" cy="85.83" rx="13.64" ry="16.38" />
        <ellipse class="fil2" cx="89.28" cy="85.77" rx="13.64" ry="16.38" />
        <path
          class="fil2"
          d="M126.87 172.85l0 -0.01c-45.27,0.38 -66.96,-56.68 -57.22,-50.29 0.37,2.55 7.41,11.89 9.07,13.87 12.97,15.49 30.14,25.92 48.3,26.04 18.15,-0.12 35.32,-10.55 48.29,-26.04 1.67,-1.98 8.71,-11.32 9.07,-13.87 9.74,-6.39 -11.94,50.67 -57.22,50.29l0 0.01 -0.14 -0.01 -0.15 0.01z"
        />
      </g>
    </svg>
  `,
  styles: [],
})
export class HappyIconComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
