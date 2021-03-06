# read-aloud

To start reading aloud, create a `{{read}}` button and nest the content of the text as a child.

![](https://user-images.githubusercontent.com/78351950/110199986-b023c980-7e9e-11eb-9672-fb57f62b1b23.png)

## Installation

To install, do the same thing you do for any roam/js script.

1. Create page in Roam (if not already present) called [[roam/js]]

1. If you previously installed this script by copying from a GitHub Gist, remove it from [[roam/js]] now.

1. Create a new block on this page and enter: ```

1. Nest under that block a Code Block

1. Make sure the code language is set as JavaScript

1. Paste the following into the new Code Block

```javascript
window.readAloud = {};

if (!document.getElementById("roamkit-read-aloud")) {
  var s = document.createElement("script");
  s.type = "text/javascript";
  s.src = "https://cdn.jsdelivr.net/gh/serizawa-jp/roamkit@9c669f74a52ad1c9ef962727adcee3a6e320c2b1/read-aloud/dist/read-aloud.min.js";
  s.id = "roamkit-read-aloud";
  s.async = true;
  document.getElementsByTagName("head")[0].appendChild(s);
}
```
