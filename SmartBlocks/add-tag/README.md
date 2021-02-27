# Add a Tag

![2021-02-27 16-23-45 2021-02-27 16_24_37](https://user-images.githubusercontent.com/78351950/109378748-53f9fc00-7918-11eb-8a45-75e414dc6d52.gif)

## Code

```
- #42SmartBlock Add a tag
    - <%NOBLOCKOUTPUT%><%JA:```javascript
let blockUid = await roam42.common.currentActiveBlockUID();
let tag = prompt("Enter a tag.", "#sr");
if (tag === null) return;
window.roamAlphaAPI
  .q(
    "[ :find (pull ?e [* {:block/children [*]}])   :in $ ?blockUid :where [?e :block/uid ?blockUid] ]",
    blockUid
  )[0][0]
  .children.map((c) => ({ uid: c.uid, string: c.string }))
  .forEach((c) =>
    window.roamAlphaAPI.updateBlock({
      block: { uid: c.uid, string: `${c.string} ${tag}` },
    })
  );
``` %>
```

## Screenshot

![](https://user-images.githubusercontent.com/78351950/109378783-928fb680-7918-11eb-92c8-ff654a7c8dbb.png)