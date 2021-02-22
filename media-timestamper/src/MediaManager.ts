import { TimestamperConfig, Timestamper } from './Timestamper';

export interface MediaManager {
    tagName(): string
    activate(block: Element, player: Element): void
}

export class VideoManager implements MediaManager {
    allPlayers: Array<HTMLVideoElement>;

    constructor(private config: TimestamperConfig) {
        this.allPlayers = [];
    }

    tagName = (): string => "VIDEO"

    activate(block: Element, player: Element): void {
        const p = player as HTMLVideoElement;
        this.allPlayers.push(p);
        const ts = new Timestamper(this.config, block, (ts: number) => () => {
            p.currentTime = ts;
            if (this.config.enableClickAndPlay) {
                p.play();
            }
        });
        ts.activate();
    }
}

export class AudioManager implements MediaManager {
    allPlayers: Array<HTMLAudioElement>;

    constructor(private config: TimestamperConfig) {
        this.allPlayers = [];
    }

    tagName = (): string => "AUDIO"

    activate(block: Element, player: Element): void {
        const p = player as HTMLAudioElement;
        this.allPlayers.push(p);
        const ts = new Timestamper(this.config, block, (ts: number) => () => {
            p.currentTime = ts;
            if (this.config.enableClickAndPlay) {
                p.play();
            }
        });
        ts.activate();
    }
}
