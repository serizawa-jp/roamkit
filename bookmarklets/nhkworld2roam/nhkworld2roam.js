(async () => {
  const roamfy = (d) => {
    const ord = (n) => n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
    const year = d.getFullYear();
    const month = d.toLocaleString('en-us', { month: 'long' });
    const date = ord(d.getDate());
    return `${month} ${date}, ${year}`
  }

  const fetchVideoURL = async () => {
    const videoElem = document.querySelector("#p-news__videoPlayer");
    const videoXMLURL = `${location.protocol}//${location.host}${videoElem.dataset.src}`;

    const resp = await fetch(videoXMLURL);
    const text = await resp.text();
    const parser = new DOMParser();
    const dom = parser.parseFromString(text, "application/xml");
    const path = dom.getElementsByTagName("file.high")[0].textContent.trim();
    const videoID = path.match(/\d{8}_\d+_\d+/)[0];
    return `https://nhkworld-vh.akamaihd.net/i/nhkworld/upld/medias/en/news/${videoID}_,L,H,Q.mp4.csmil/master.m3u8?set-akamai-hls-revision=5`
  };

  const videoURL = await fetchVideoURL();
  const article = document.querySelector("article");
  const title = article.querySelector(".c-title").textContent.trim();
  const tags = Array.from(article.querySelectorAll(".p-article__tags .c-tags li"))
    .map(e => e.textContent.replace("#", ""))
    .map(e => `#[[${e}]]`);
  tags.unshift("#NHKWorld");

  const articleTexts = Array.from(article.querySelectorAll(".p-article__body p"));

  const year = location.href.match(/(?<year>\d{4})\d{4}\_/).groups.year;
  const date = new Date(article.querySelector(".c-item__time").textContent.trim());
  date.setFullYear(year);
  const published = roamfy(date);

  const attributes = [
    `Published:: [[${published}]]`,
    `Date to Read:: {{date}}`,
    `Tags: ${tags.join(" ")}`,
    `Source: [${title}](${location.href})`,
    `Video: \n  ![${title}](${videoURL})`,
    "{{word-count}}\n",
  ];

  let res = attributes.join("\n");
  articleTexts.forEach((n) => {
    res += `  ${n.textContent}\n`
  });

  navigator.clipboard.writeText(res);
})();
