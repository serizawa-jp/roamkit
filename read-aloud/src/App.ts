import { detect } from 'detect-browser';
const Mark = require('mark.js');

// https://stackoverflow.com/a/23808155
const speechUtteranceChunker = (utt, settings, callback?) => {
  settings = settings || {};
  var newUtt;
  var txt = (settings && settings.offset !== undefined ? utt.text.substring(settings.offset) : utt.text);
  if (utt.voice && utt.voice.voiceURI === 'native') { // Not part of the spec
    newUtt = utt;
    newUtt.text = txt;
    newUtt.addEventListener('end', function () {
      if (speechUtteranceChunker.cancel) {
        speechUtteranceChunker.cancel = false;
      }
      if (callback !== undefined) {
        callback();
      }
    });
  }
  else {
    var chunkLength = (settings && settings.chunkLength) || 160;
    var pattRegex = new RegExp('^[\\s\\S]{' + Math.floor(chunkLength / 2) + ',' + chunkLength + '}[.!?,]{1}|^[\\s\\S]{1,' + chunkLength + '}$|^[\\s\\S]{1,' + chunkLength + '} ');
    var chunkArr = txt.match(pattRegex);

    if (chunkArr[0] === undefined || chunkArr[0].length <= 2) {
      //call once all text has been spoken...
      if (callback !== undefined) {
        callback();
      }
      return;
    }
    var chunk = chunkArr[0];
    newUtt = new SpeechSynthesisUtterance(chunk);
    var x;
    for (x in utt) {
      if (utt.hasOwnProperty(x) && x !== 'text') {
        newUtt[x] = utt[x];
      }
    }
    newUtt.addEventListener('end', function () {
      if (speechUtteranceChunker.cancel) {
        speechUtteranceChunker.cancel = false;
        return;
      }
      settings.offset = settings.offset || 0;
      settings.offset += chunk.length - 1;
      speechUtteranceChunker(utt, settings, callback);
    });
  }

  if (settings.modifier) {
    settings.modifier(newUtt);
  }
  console.log(newUtt); //IMPORTANT!! Do not remove: Logging the object out fixes some onend firing issues.
  //placing the speak invocation inside a callback fixes ordering and onend issues.
  setTimeout(function () {
    speechSynthesis.speak(newUtt);
  }, 0);
};

interface config {
  debug: boolean
  voiceSelector(browserName: string, voices: Array<SpeechSynthesisVoice>): SpeechSynthesisVoice
  utterHandler(utter: SpeechSynthesisUtterance): void
}

const defaultConfig: config = {
  debug: false,
  voiceSelector(browserName: string, voices: Array<SpeechSynthesisVoice>): SpeechSynthesisVoice {
    const enUSVoices = voices.filter(v => v.lang === "en-US")
    const betterVoices = enUSVoices.filter(v => v.name.includes("Natural") || v.name.includes("Google"))
    if (betterVoices.length === 0) return enUSVoices[0];
    return betterVoices[0];
  },
  utterHandler(utter: SpeechSynthesisUtterance): void { }
};

const config: config = { ...defaultConfig, ...window ?.readAloud };

const debug = (s) => {
  if (config.debug !== true) return;
  console.log(`read-aloud: ${s}`);
};

const alreadAddedEventListener = (button) => {
  const label = "readAloud";
  if (button.dataset.readAloud === label) {
    return true;
  }
  button.dataset.readAloud = label;
  return false;
}

let alreadyLoadedVoices = false;

window.speechSynthesis.onvoiceschanged = () => {
  alreadyLoadedVoices = true;
}

const startReadAloud = (button, children) => {
  const browser = detect();
  debug(`browser: ${browser.name}`);
  button.addEventListener('click', () => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      return;
    }
    new Promise(resolve => {
      const s = setInterval(() => {
        debug(alreadyLoadedVoices);
        if (alreadyLoadedVoices === true) {
          clearInterval(s);
          resolve();
        };

        debug(`voices-count: ${speechSynthesis.getVoices().length}`)
        if (speechSynthesis.getVoices().length !== 0) {
          alreadyLoadedVoices = true;
          clearInterval(s);
          resolve();
        }
      }, 500)
    })
      .then(() => {
        const voice = config.voiceSelector(browser.name, speechSynthesis.getVoices());
        const uttr = new SpeechSynthesisUtterance(children.textContent);
        uttr.voice = voice;
        const mark = new Mark(children);
        uttr.onboundary = (e: SpeechSynthesisEvent) => {
            mark.unmark();
            mark.markRanges([{start: e.charIndex, length: e.charLength}]);
        }
        uttr.onend = (e) => {
            mark.unmark();
        }

        if (browser.name.includes("edge")) {
          if (config.utterHandler !== undefined) {
            config.utterHandler(uttr)
          }
          speechSynthesis.speak(uttr);
          return;
        }

        // workaround for Chrome
        speechUtteranceChunker(uttr, {
          chunkLength: 120,
          modifier: (u) => {
            u.voice = voice
            if (config.utterHandler !== undefined) {
              config.utterHandler(uttr)
            }
          },
        });
      });
  });
}

const addReadAloudEventListener = (button) => {
  if (alreadAddedEventListener(button)) {
    return;
  }
  const parent = button.closest(".rm-block-main");
  const children = parent.nextElementSibling;
  startReadAloud(button, children);
};

const scanButtons = () => {
  const buttonName = "read";
  const buttons = Array.from(document.querySelectorAll("button"))
    .filter(e => e.textContent === buttonName);
  debug(`found buttons: ${buttons.length}`);

  buttons.forEach(b => {
    addReadAloudEventListener(b);
  });
}

setInterval(scanButtons, 1000);
