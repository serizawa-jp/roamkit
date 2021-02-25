# wpm-pacemaker

To start WPM pacemaker, create a `{{wpm}}` button and nest the content of the text as a child.

![2021-02-25 21-26-54 2021-02-25 21_30_02](https://user-images.githubusercontent.com/78351950/109153744-a28c8680-77b0-11eb-96d2-866a586ecfb8.gif)

## Installation

To install, do the same thing you do for any roam/js script.

1. Create page in Roam (if not already present) called [[roam/js]]

1. If you previously installed this script by copying from a GitHub Gist, remove it from [[roam/js]] now.

1. Create a new block on this page and enter: ```

1. Nest under that block a Code Block

1. Make sure the code language is set as JavaScript

1. Paste the following into the new Code Block

```javascript
 window.wpmPacemaker = {
   wpm: 200,
   color: "black",
   backgroundColor: "yellow"
 };

 var s = document.createElement("script");
 s.type = "text/javascript";
 s.src = "https://cdn.jsdelivr.net/gh/serizawa-jp/roamkit@main/wpm-pacemaker/dist/wpm-pacemaker.min.js";
 document.getElementsByTagName("head")[0].appendChild(s);
```
