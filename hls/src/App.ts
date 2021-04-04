const loadLibrary = () => {
    const id = "roamkit-hls"
    if (document.getElementById(id)) return

    const extension = document.createElement("script");
    extension.type = "text/javascript";
    extension.src = "https://cdn.jsdelivr.net/npm/hls.js@latest";
    extension.async = true;
    extension.id = id;
    document.getElementsByTagName("head")[0].appendChild(extension);
};

const get_url_extension = (url) => {
    return url.split(/[#?]/)[0].split('.').pop().trim();
}

const debug = (s) => console.log(`[HLS]: ${s}`);

const activate = async () => {
    if (window.Hls === undefined) {
        debug("window.Hls is undefined");
        loadLibrary();
        return;
    }
    const hlsElems = Array.from(document.querySelectorAll(".roam-article img")).filter(e => get_url_extension(e.src) === "m3u8");

    hlsElems.forEach(e => {
        const src = e.src;
        const video = document.createElement("video");
        video.controls = true;
        video.src = src;
        video.width = 580;
        e.parentElement.insertBefore(video, e);
        e.remove();

        if (Hls.isSupported()) {
            var hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(video);
        }
    });
};

const timeout = () => {
    setTimeout(function () {
        debug("activating...");
        activate();
        timeout();
    }, 1000);
}

timeout();
