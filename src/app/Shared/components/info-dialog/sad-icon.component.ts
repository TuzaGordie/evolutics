import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sad-icon',
  template: `
    <div class="icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xmlns:xodm="http://www.corel.com/coreldraw/odm/2003"
        xml:space="preserve"
        version="1.1"
        style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
        viewBox="0 0 921.42 885.52"
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
            gradientTransform="matrix(0.999999 -0 -0 0.961039 0 17)"
            cx="449.56"
            cy="430.57"
            r="1210.8"
            fx="449.56"
            fy="430.57"
          >
            <stop offset="0" style="stop-opacity:1; stop-color:#FFD898" />
            <stop offset="1" style="stop-opacity:1; stop-color:#FAC269" />
          </radialGradient>
        </defs>
        <g id="Layer_x0020_1">
          <metadata id="CorelCorpID_0Corel-Layer" />
          <ellipse
            class="fil0"
            cx="460.71"
            cy="442.76"
            rx="460.71"
            ry="442.76"
          />
          <ellipse
            class="fil1"
            cx="449.55"
            cy="430.57"
            rx="434.13"
            ry="417.21"
          />
          <ellipse class="fil2" cx="584.6" cy="303.49" rx="48.23" ry="57.92" />
          <ellipse class="fil2" cx="315.7" cy="303.27" rx="48.23" ry="57.92" />
          <path
            class="fil2"
            d="M448.6 431.54l0 0.01c-160.09,-1.33 -236.76,200.44 -202.33,177.84 1.3,-9.03 26.19,-42.05 32.07,-49.07 45.86,-54.74 106.59,-91.63 170.77,-92.07 64.19,0.44 124.91,37.33 170.78,92.07 5.88,7.02 30.77,40.04 32.06,49.07 34.44,22.6 -42.23,-179.17 -202.33,-177.84l0 -0.01 -0.51 0.01 -0.51 -0.01z"
          />
        </g>
      </svg>
    </div>
  `,
  styles: [
    `
      .icon svg {
        height: 100px;
      }
    `,
  ],
})
export class SadIconComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
