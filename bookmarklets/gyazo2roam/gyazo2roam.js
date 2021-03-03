(function () {
    const roamfy = (d) => {
        const ord = (n) =>
            n +
            (n > 0
                ? ["th", "st", "nd", "rd"][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
                : "");
        const year = d.getFullYear();
        const month = d.toLocaleString("en-us", { month: "long" });
        const date = ord(d.getDate());
        return `${month} ${date}, ${year}`;
    };

    const capturedInfoDOM = document.querySelector(".captured-info");
    const capturedAtText = capturedInfoDOM
        .querySelector(".created-at-field a")
        .textContent.trim()
        .replace(/[年月]/g, "/")
        .replace("日", "");
    const capturedAt = roamfy(new Date(capturedAtText));

    const app = capturedInfoDOM
        .querySelector(".app a")
        .textContent.split(":")[1]
        .trim();
    let source = capturedInfoDOM
        .querySelector(".source-link a,.source")
        .textContent.split(":")[1]
        .trim();

    const sourceLink = capturedInfoDOM.querySelector(".source-link a");
    if (sourceLink !== null) {
        source = `[${source}](${sourceLink})`;
    }
    const ocrText = document
        .querySelector(".ocr-desc-text")
        .textContent.split("\n")
        .join(" ");
    const imageLink = document.querySelector("picture img").getAttribute("src");

    const metadata = [
        `CapturedAt:: ${capturedAt}`,
        `App:: ${app}`,
        `Source:: ${source}`,
    ]
        .map((m) => `  ${m}`)
        .join("\n");

    let res = [
        `![Image from Gyazo](${imageLink})`,
        `  ${metadata}`,
        "  Text:",
        `    ${ocrText}`
    ].join("\n");
    navigator.clipboard.writeText(res);
})();
