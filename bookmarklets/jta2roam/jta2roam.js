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

    const body = document.querySelector(".ly_body_main");
    const imageSrc = body
        .querySelector(".bl_article_eyeCatch img")
        .getAttribute("src");
    const publishedDate = new Date(
        body.querySelector(".bl_articleMeta_date").textContent
    );
    const published = roamfy(publishedDate);
    const category = body
        .querySelector(".bl_articleMeta_category")
        .textContent.trim();
    const level = body.querySelectorAll(".bl_level .bl_levelUnits i").length;
    const articleTexts = body.querySelectorAll(".bl_paywallArticle>p");
    const source = location.href;

    const attributes = [
        "#[[The Japan Times Alpha]]",
        `Level:: ${level}`,
        `Category:: #[[${category}]]`,
        `Published:: [[${published}]]`,
        `Date to Read:: `,
        `Source: ${source}`,
    ];

    try {
        const translationLink = body
            .querySelector(".bl_article_translation a")
            .getAttribute("href");
        attributes.push(`Translation: ${translationLink}`);
    } catch (e) { }

    attributes.push(`![](${imageSrc})`, "{{word-count}}\n");

    let res = attributes.join("\n");

    let inParagraph = false;

    const putIndent = (inParagraph) => {
        const indent = inParagraph ? 4 : 2;
        return " ".repeat(indent);
    };

    articleTexts.forEach((n) => {
        let text = n.textContent.trim();
        const hasImage = n.querySelector("img") !== null;
        if (hasImage) {
            const imageSrc = n.querySelector("img").getAttribute("src");
            text = `![](${imageSrc})${text}`;
        }

        res += `${putIndent(inParagraph)} ${text}\n`;
    });

    navigator.clipboard.writeText(res);

    console.log(res);
})();
