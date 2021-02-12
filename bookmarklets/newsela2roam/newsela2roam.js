// DateオブジェクトをRoamの日付の形式に変換する
const roamfy = (d) => {
    const ord = (n) => n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
    const year = d.getFullYear();
    const month = d.toLocaleString('en-us', { month: 'long' });
    const date = ord(d.getDate());
    return `${month} ${date}, ${year}`
   }

   const title = document.querySelector("#article-title").textContent;
   const topic = document.querySelector("h2[data-qa-selector=article_label_text]").textContent;
   const wordCount = document.querySelector("div span[data-qa-selector=word_count]").textContent;
   const lexile = document.querySelector("div[data-qa-selector=lexile_dropdown_menu] div").textContent;
   const imageSrc = document.querySelector("article img").getAttribute("src");
   const publishedDateDOMRes = document.evaluate("//span[text()='Published:']", document, null, XPathResult.ANY_TYPE, null);
   const publishedDateDOM = publishedDateDOMRes.iterateNext();
   const publishedDate = new Date(publishedDateDOM.nextElementSibling.textContent);
   const published = roamfy(publishedDate);

   const articleTexts = document.querySelectorAll("div[data-qa-selector=article_text] p,div[data-qa-selector=article_text] h2");

   let source = location.href;

   try {
     source = document.querySelector("link[rel='canonical']").getAttribute("href") ;
   } catch (e) {
       console.log("canonical url is not found.");
   }

   const attributes = [
    "#Newsela",
    `Lexile:: ${lexile}`,
    `Topic:: #[[${topic}]]`,
    `Published:: [[${published}]]`,
    `Date to Read:: `,
    `Words:: ${wordCount}`,
    `Source: ${source}`,
    `![](${imageSrc})`,
    "{{word-count}}\n"
   ];

   let res = attributes.join("\n");

   let inParagraph = false;

   const putIndent = (inParagraph) => {
    const indent = inParagraph ? 4 : 2;
    return " ".repeat(indent);
   }

   articleTexts.forEach((n) => {
    const isH2 = n.tagName === "H2"
    const hasImage = n.querySelector("img") !== null;

    if (isH2) {
        inParagraph = false;
    }

    let text = isH2 ? `***${n.textContent}**` : n.textContent; // Boldの始まりのアスタリスクが2つだと1つに削られてしまうので3つにした

    if (hasImage) {
      const imageSrc = n.querySelector("img").getAttribute("src");
      text = `![](${imageSrc})${text}`;
    }

    res += `${putIndent(inParagraph)} ${text}\n`;

    if (isH2) {
        inParagraph = true;
    }
   });

   navigator.clipboard.writeText(res);
