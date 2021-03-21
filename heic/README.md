# HEIC

Converts HEIC to JPEG for display.

## Installation

To install, do the same thing you do for any roam/js script.

1. Create page in Roam (if not already present) called [[roam/js]]

1. If you previously installed this script by copying from a GitHub Gist, remove it from [[roam/js]] now.

1. Create a new block on this page and enter: ```

1. Nest under that block a Code Block

1. Make sure the code language is set as JavaScript

1. Paste the following into the new Code Block

```javascript
(() => {
  const s = document.createElement("script");
  s.type = "text/javascript";
  s.src =
    "https://cdn.jsdelivr.net/gh/serizawa-jp/roamkit@main/heic/dist/heic.min.js";
  document.getElementsByTagName("head")[0].appendChild(s);
})();
```
