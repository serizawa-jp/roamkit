const zeroPad = (num) => String(num).padStart(2, '0');

const transcripts = Array.from(document.querySelectorAll("app-conversation-transcript-snippet")).map(s => {
  const speakerDOM = s.querySelector(".transcript-snippet__content__head__speaker-name");
  const speaker = speakerDOM === null ? "Unknown" : speakerDOM.textContent.trim();
  const timestampText = s.querySelector(".transcript-snippet__content__head__timestamp-meta").textContent.trim();
  const timestamp = timestampText.split(":").map(zeroPad).join(":");
  const transcript = s.querySelector(".transcript-snippet__content__body__sentance").textContent.trim();
  return { speaker, timestamp, transcript};
});

let res = "";

transcripts.forEach(t => {
  res += [`${t.timestamp} ${t.speaker}`, `  ${t.transcript}\n`].join("\n");
});

navigator.clipboard.writeText(res);
