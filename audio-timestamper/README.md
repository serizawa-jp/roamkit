# audio-timestamper

![](https://user-images.githubusercontent.com/78351950/106455697-e355f000-64cf-11eb-9e60-82763f9d2ffd.png)

## Installation

To install, do the same thing you do for any roam/js script.

1. Create page in Roam (if not already present) called [[roam/js]]

1. If you previously installed this script by copying from a GitHub Gist, remove it from [[roam/js]] now.

1. Create a new block on this page and enter: ```

1. Nest under that block a Code Block

1. Make sure the code language is set as JavaScript

1. Paste the following into the new Code Block

```javascript
 window.audioTimestamperConfig = {
   enableClickAndPlay: false,

   increaseSpeedKey: 'd',
   decreaseSpeedKey: 's',
   rewindKey: 'z',
   advanceKey: 'x',
   resetSpeedKey: 'r',
   preferredSpeedKey: 'G',

   increaseSpeed: 0.5,
   decreaseSpeed: 0.5,
   rewind: 10,
   advance: 10,
   preferredSpeed: 1.2,
 };

 var s = document.createElement("script");
 s.type = "text/javascript";
 s.src = "https://cdn.jsdelivr.net/gh/serizawa-jp/roamkit@v0.1/audio-timestamper/audio-timestamper.js";
 document.getElementsByTagName("head")[0].appendChild(s);
```

## Acknowledgments

The most of the logic in the script was copied from https://c3founder.github.io/Roam-Enhancement/. Many thanks to c3founder.
