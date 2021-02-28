# roamkit - a wrapper of roamAlphaAPI

You can generate a page or blocks easily.

```javascript
const b = roamkit.createBlock;

const blocks = [
    b("first", [
        b("first-first", [
            b("first-first-first")
        ]),
        b("first-second"),
    ]),
    b("second"),
    b("third", [
        b("third-first"),
    ]),
    b("fourth"),
];

const page = roamkit.createPage("serizawa-jp");

roamkit.writePage(page, blocks);
```

<img width="427" alt="スクリーンショット 2021-02-28 23 01 06" src="https://user-images.githubusercontent.com/78351950/109421032-e8e41e80-7a18-11eb-985c-96c5b520e97f.png">
