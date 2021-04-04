(() => {
  // DateオブジェクトをRoamの日付の形式に変換する
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

  const title = document.querySelector("h1").textContent.trim();
  const publishedAt = new Date(
    document.querySelector("time").textContent.trim()
  );
  const published = roamfy(publishedAt);

  const audioElem = document.querySelector(".wsw__embed audio");
  const audioSrc = audioElem.getAttribute("src");

  const attributes = [
    "#VOA",
    `Published:: [[${published}]]`,
    `Date to Read:: `,
    `Source: [${title}](${location.href})`,
    `Audio: \n  {{audio: ${audioSrc}}}`,
    "{{word-count}}\n",
  ];

  let res = attributes.join("\n");

  const articleTexts = Array.from(
    document.querySelectorAll("#article-content .wsw p,h2,figure")
  )
    .filter((p) => {
      const t = p.textContent.trim()
      const separator = "______________________________________________________________"
      return t !== "Accessibility links" && t !== "No media source currently available" && t !== "" && t !== separator
    })
    .filter((p) => !p.classList.contains("section-head"));

  let inParagraph = false;

  const putIndent = (inParagraph) => {
    const indent = inParagraph ? 4 : 2;
    return " ".repeat(indent);
  }

  articleTexts.forEach((n) => {
    const isHeader = (n.querySelector("em") === null && n.querySelector("br") !== null && n.querySelector("strong") !== null) || n.tagName === "H2";
    const hasImage = n.querySelector("img") !== null;


    if (isHeader) {
      inParagraph = false;
    }

    let text = isHeader ? `***${n.textContent.trim()}**` : n.textContent.trim(); // Boldの始まりのアスタリスクが2つだと1つに削られてしまうので3つにした

    if (hasImage) {
      const imageSrc = n.querySelector("img").getAttribute("src");
      text = `![](${imageSrc})${text}`;
    }

    res += `${putIndent(inParagraph)} ${text}\n`;

    if (isHeader) {
      inParagraph = true;
    }
  });

  navigator.clipboard.writeText(res);
})();
