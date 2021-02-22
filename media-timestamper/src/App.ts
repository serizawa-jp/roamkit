import { VideoManager, AudioManager, MediaManager } from './MediaManager';
import { TimestamperConfig } from './Timestamper';

const activate = (manager: MediaManager) => {
    Array.from(document.getElementsByTagName(manager.tagName()))
        .forEach(el => {
            if (el.closest('.rm-zoom-item') !== null) {
                return; //ignore breadcrumbs and page log
            }

            const block = el.closest('.roam-block-container');
            manager.activate(block, el);
        });
};

const defaultConfig = {
    enableClickAndPlay: false,
};

declare global { interface Window { mediaTimestamperConfig: any } }
window.mediaTimestamperConfig = window.mediaTimestamperConfig || {};

const config = { ...defaultConfig, ...window.mediaTimestamperConfig };

const tsConfig: TimestamperConfig = {
    enableClickAndPlay: config.enableClickAndPlay,
}

const ms = [
    new VideoManager(config),
    new AudioManager(config)
];

for (const m of ms) {
    setInterval(() => activate(m), 1000);
}
