
class Widget {
    private widget: any
    private _videoID: string
    private _caption: string
    private _currentTimestamp: number

    constructor(private youglishClient: any, private id: string, private query: string) {
        this.widget = new this.youglishClient.Widget(this.id, {
            width: 640,
            events: {
                'onVideoChange': this.onVideoChange,
                'onCaptionChange': this.onCaptionChange
            }
        });
    }

    activate(): void {
        this.widget.fetch(this.query, "english", "us");
    }

    get videoID(): string {
        return this._videoID;
    }

    get caption(): string {
        return this._caption;
    }

    get currentTimestamp(): number {
        return this._currentTimestamp;
    }

    private onVideoChange(event) {
        this._videoID = event.video;
        console.log(`onVideoChange(#${this.id}): ${JSON.stringify(event)}`)
    }

    private onCaptionChange(event) {
        this._caption = event.caption;
        this._currentTimestamp = event.current_time;
        console.log(`onCaptionChange(#${this.id}): ${JSON.stringify(event)}`)
    }
}

class WidgetManager {
    private widgets: Map<string, Widget>

    constructor(private youglishClient: any) {
        this.widgets = new Map<string, Widget>();
    }

    activate(el: Element): void {
        const htmlEl = el as HTMLElement
        const id = htmlEl.id;
        const query = htmlEl.dataset["query"];
        const w = new Widget(this.youglishClient, id, query);
        w.activate();
        this.widgets.set(id, w);
    }

    gc(): void {

    }
}

function loadYouglish() {
    const id = "youglish";
    var existing = document.getElementById(id);
    if (!existing) {
        var extension = document.createElement("script");
        extension.src = "https://youglish.com/public/emb/widget.js";
        extension.id = id;
        extension.type = "text/javascript";
        document.getElementsByTagName("head")[0].appendChild(extension);
    }
}

let wm :WidgetManager = null;

function activate(): void {
    console.log("youglish activator");
    console.log(window.YG);
    console.log(wm);
    if (window.YG === undefined) return;
    if (wm === null) wm = new WidgetManager(window.YG);
    Array.from(document.querySelectorAll(".roam-app a.youglish"))
        .forEach(el => {
            if (el.closest('.rm-zoom-item') !== null) {
                return; //ignore breadcrumbs and page log
            }

            wm.activate(el)
        });
    wm.gc();
};

loadYouglish();
setInterval(activate, 1000);