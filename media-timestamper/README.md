# media-timestamper


This supports timestamps for both audio and video tags. If you want to use the video tag in your Roam, you will need this roam/js.
https://roamjs.com/docs/extensions/video

## Speed Control Shortcuts


**Currently, not supported.**


## Installation

To install, do the same thing you do for any roam/js script.

1. Create page in Roam (if not already present) called [[roam/js]]

1. If you previously installed this script by copying from a GitHub Gist, remove it from [[roam/js]] now.

1. Create a new block on this page and enter: ```

1. Nest under that block a Code Block

1. Make sure the code language is set as JavaScript

1. Paste the following into the new Code Block

```javascript
 window.mediaTimestamperConfig = {
   enableClickAndPlay: false,
 };

 var s = document.createElement("script");
 s.type = "text/javascript";
 s.src = "https://cdn.jsdelivr.net/gh/serizawa-jp/roamkit@media-timestamper/media-timestamper/dist/media-timestamper.min.js";
 document.getElementsByTagName("head")[0].appendChild(s);
```
