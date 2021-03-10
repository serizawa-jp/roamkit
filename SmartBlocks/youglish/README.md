# Youglish

## Code

```
- #42SmartBlock Youglish
    - <%NOBLOCKOUTPUT%><%JA:```javascript
const currentBlockRef = await roam42.common.currentActiveBlockUID();
document.body.click(); // to focus out

if (window.roamkit === undefined) {
  const tag = document.createElement("script");

  tag.src =
    "https://cdn.jsdelivr.net/gh/serizawa-jp/roamkit@main/roamkit/dist/roam-kit.min.js";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  await roam42.common.sleep(100);
}

const highlight = (s) => s.replaceAll("[[[", "^^").replaceAll("]]]", "^^");

let block = document.activeElement;
let youglishBlocks = block
  .closest(".roam-block-container")
  .parentElement.closest(".roam-block-container")
  .querySelectorAll(".ygContainer");
if (youglishBlocks.length === 0) return;
const widgetID = youglishBlocks[0].id;
const w = window.youglish[widgetID];
console.log(w);
if (w === undefined) return;
const captionEvent = w.captionEvent;
const ts = Math.trunc(captionEvent.current_time);
const tsStr = new Date(ts * 1000).toISOString().substr(11, 8);
const timestamp = `${tsStr} ${highlight(
  decodeURIComponent(captionEvent.caption)
)}`;

const content = `{{iframe: https://www.youtube.com/watch?v=${w.videoID}&t=${ts}s}}`;
const blocks = [roamkit.createBlock(content)];
roamkit.writeBlocks(blocks, currentBlockRef);
roamkit.writeBlocks([roamkit.createBlock(timestamp)], blocks[0].uid);
```%>
    - <%NOBLOCKOUTPUT%><%NOCURSOR%>
```