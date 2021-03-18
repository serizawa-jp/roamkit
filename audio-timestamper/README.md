# audio-timestamper

![](https://user-images.githubusercontent.com/78351950/106455697-e355f000-64cf-11eb-9e60-82763f9d2ffd.png)


## Speed Control Shortcuts

**This is only available for the audio that is playing. If there are multiple playing audio tags, this short cuts will only work for the first audio tag.**

| Name            | Default Key | Default Value |
|-----------------|-------------|---------------|
| Increase speed  | alt+shift+d | 0.5           |
| Decrease speed  | alt+shift+s | 0.5           |
| Rewind          | alt+shift+z | 10            |
| Advance         | alt+shft+x  | 10            |
| Reset           | alt+shift+r | -             |
| Preferred speed | alt+shift+g | 1.2           |
| Grab a time     | alt+shift+n | -             |

In macOS, you can use 'option' instead of 'alt'.

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
   enableKeyShortCuts: true,

   increaseSpeedKey: 'alt+shift+d',
   decreaseSpeedKey: 'alt+shift+s',
   rewindKey: 'alt+shift+z',
   advanceKey: 'alt+shift+x',
   resetSpeedKey: 'alt+shift+r',
   preferredSpeedKey: 'alt+shift+g',
   grabTimeKey: 'alt+shift+n',

   increaseSpeed: 0.5,
   decreaseSpeed: 0.5,
   rewind: 10,
   advance: 10,
   preferredSpeed: 1.2,
 };

 var s = document.createElement("script");
 s.type = "text/javascript";
 s.src = "https://cdn.jsdelivr.net/gh/serizawa-jp/roamkit@v0.3/audio-timestamper/audio-timestamper.js";
 document.getElementsByTagName("head")[0].appendChild(s);
```

## Acknowledgments

The most of the logic in the script was copied from https://c3founder.github.io/Roam-Enhancement/. Many thanks to c3founder.
