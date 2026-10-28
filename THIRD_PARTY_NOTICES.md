# Third-party source and notices

The browser QR encoder is bundled locally. No CDN or external QR API is used.

| Component | Version | Source | Licence | Included scope |
| --- | --- | --- | --- | --- |
| node-qrcode | 1.5.4 | https://github.com/soldair/node-qrcode | MIT | lib/core modules only |
| dijkstrajs | 1.0.3 | https://github.com/tcort/dijkstrajs | MIT | dijkstra.js used by the QR segment optimiser |

Source was copied from the existing local card dependencies on 28 October 2026. Runtime scope was checked from the bundle source. pngjs, yargs and the original hosted app's framework dependencies are not bundled or required.

The readable source is in `vendor-src/`. The one adaptation is `qrcode/segments.js`: its dijkstra import points to the included adjacent source. `qr-entry.mjs` exposes the encoder's create function. Licence headers are retained in source; the generated `vendor/qr.mjs` omits comments for size, with notices preserved here and in the source folders.

## Optional maintainer rebuild

Normal users do not need this. If you intentionally update the source or QR dependency, rebuild with an explicitly selected esbuild version:

```sh
npx --yes esbuild@0.28.0 vendor-src/qr-entry.mjs --bundle --platform=browser --format=esm --minify --legal-comments=none --outfile=vendor/qr.mjs
npm test
npm run build
```

This optional command downloads/runs the named build tool from npm if it is not installed. The shipped bundle was built with esbuild 0.28.0. esbuild is build tooling, not a runtime component in the distribution. Recheck upstream versions, licence text and bundle inputs before dependency updates. Version and local licence checks are not a vulnerability audit.

## node-qrcode notice

The MIT License (MIT)

Copyright (c) 2012 Ryan Day

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


## dijkstrajs notice

```
Dijkstra path-finding functions. Adapted from the Dijkstar Python project.

Copyright (C) 2008
  Wyatt Baldwin <self@wyattbaldwin.com>
  All rights reserved

Licensed under the MIT license.

  http://www.opensource.org/licenses/mit-license.php

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

## Additional copyright and trademark notice from the QR source

```text
/**
 * QRCode for JavaScript
 *
 * modified by Ryan Day for nodejs support
 * Copyright (c) 2011 Ryan Day
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
//---------------------------------------------------------------------
// QRCode for JavaScript
//
// Copyright (c) 2009 Kazuhiko Arase
//
// URL: http://www.d-project.com/
//
// Licensed under the MIT license:
//   http://www.opensource.org/licenses/mit-license.php
//
// The word "QR Code" is registered trademark of
// DENSO WAVE INCORPORATED
//   http://www.denso-wave.com/qrcode/faqpatent-e.html
//
//---------------------------------------------------------------------
*/
```
