import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'info-icon',
  template: `
    <div class="icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xmlns:xodm="http://www.corel.com/coreldraw/odm/2003"
        xml:space="preserve"
        version="1.1"
        style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
        viewBox="0 0 54769.23 54769.23"
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
            gradientTransform="matrix(0.999999 -0 -0 0.961039 0 1034)"
            cx="26719.26"
            cy="26549.92"
            r="72212.84"
            fx="26719.26"
            fy="26549.92"
          >
            <stop offset="0" style="stop-opacity:1; stop-color:#FFD898" />
            <stop offset="1" style="stop-opacity:1; stop-color:#FAC269" />
          </radialGradient>
        </defs>
        <g id="Layer_x0020_1">
          <metadata id="CorelCorpID_0Corel-Layer" />
          <circle class="fil0" cx="27384.58" cy="27384.62" r="27384.61" />
          <ellipse
            class="fil1"
            cx="26719.24"
            cy="26549.92"
            rx="25891.59"
            ry="25459.61"
          />
          <ellipse
            class="fil2"
            cx="26719.32"
            cy="14646.6"
            rx="3383.87"
            ry="3383.88"
          />
          <path
            class="fil2"
            d="M23268.11 25667.86l0 12070.96c0,5464.37 6902.3,5464.37 6902.3,0l0 -12070.96c0,-5279.34 -6902.3,-5279.34 -6902.3,0z"
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
export class InfoIconComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
