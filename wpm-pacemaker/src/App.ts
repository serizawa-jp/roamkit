import Countable from 'countable';
import lumin from 'lumin';

const defaultConfig = {
    wpm: 200
};

if (!window.roamkit) {
    window.roamkit = {};
}

const config = { ...defaultConfig, ...window?.roamkit?.wpmPacemaker };

const wpm = config.wpm;

function startPacemaker(button, children, wordsCount, wpm) {
    if (!!button.onclick) {
        return;
    }

    const l = lumin(children);
    const ms = (wordsCount / wpm) * 60000; // min -> milisec

    console.log(`Words: ${wordsCount}`);
    console.log(`WPM: ${wpm}`);
    console.log(`ms: ${ms}`);

    button.onclick = () => {
        l.clear();
        l.start(ms);
    };
}

const addEventListener = (button) => {
    const parent = button.closest(".rm-block-main");
    const children = parent.nextElementSibling;

    Countable.count(children, c => startPacemaker(button, children, c.words, wpm));
};

const scanWPMButtons = () => {
    const buttonName = "wpm";
    const buttons = Array.from(document.querySelectorAll(".roam-article button")).filter(e => e.textContent === buttonName);

    buttons.forEach(b => {
        addEventListener(b);
    });
}

setInterval(scanWPMButtons, 1000);