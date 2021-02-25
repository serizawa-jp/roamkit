# wpm-pacemaker

![2021-02-25 19-46-25 2021-02-25 19_47_31](https://user-images.githubusercontent.com/78351950/109142576-60f4df00-77a2-11eb-84e4-df2aff3f2df7.gif)

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
 };

 var s = document.createElement("script");
 s.type = "text/javascript";
 s.src = "https://cdn.jsdelivr.net/gh/serizawa-jp/roamkit@main/wpm-pacemaker/dist/wpm-pacemaker.min.js";
 document.getElementsByTagName("head")[0].appendChild(s);
```
