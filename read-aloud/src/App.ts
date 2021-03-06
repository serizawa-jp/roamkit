import { detect } from 'detect-browser';

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

const config: config = { ...defaultConfig, ...window?.readAloud };

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
                if (config.utterHandler !== undefined) {
                    config.utterHandler(uttr)
                }
                speechSynthesis.speak(uttr);
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
