import Countable from 'countable';
import lumin from 'lumin';

const defaultConfig = {
    wpm: 200,
    color: "black",
    backgroundColor: "yellow"
};

const config = { ...defaultConfig, ...window?.wpmPacemaker };

const wpm = config.wpm;

const debug = (s) => console.log(`wpm-pacemaker: ${s}`);

const alreadAddedEventListener = (button) => {
    if (button.dataset.wpm === "wpm") {
        return true;
    }
    button.dataset.wpm = "wpm";
    return false;
}

const startPacemaker = (button, children, wordsCount, wpm) => {
    const l = lumin(children);
    const ms = (wordsCount / wpm) * 60000; // min -> milisec

    debug(`Words: ${wordsCount}`);
    debug(`WPM: ${wpm}`);
    debug(`ms: ${ms}`);

    button.addEventListener('click', handler(l, ms));
}

const handler = (l, ms) => () => {
    l.clear();
    l.start(ms);
};

const addEventListener = (button) => {
    if (alreadAddedEventListener(button)) {
        return;
    }
    const parent = button.closest(".rm-block-main");
    const children = parent.nextElementSibling;
    children.style.cssText = `--lumin-background-color:${config.backgroundColor}; --lumin-color:${config.color};`

    Countable.count(children, c => startPacemaker(button, children, c.words, wpm));
};

const scanWPMButtons = () => {
    const buttonName = "wpm";
    const buttons = Array.from(document.querySelectorAll("button"))
        .filter(e => e.textContent === buttonName);
    debug(`found buttons: ${buttons.length}`);

    buttons.forEach(b => {
        addEventListener(b);
    });
}

setInterval(scanWPMButtons, 1000);