import * as Buffer from "Buffer";
import axios from "axios";

const jpegJs = require('jpeg-js');
const libheif = require('libheif-js');

const toJPEG = ({ data, width, height, quality }) => jpegJs.encode({ data, width, height }, quality).data;

const decodeImage = async (image) => {
    const width = image.get_width();
    const height = image.get_height();

    const arrayBuffer = await new Promise((resolve, reject) => {
        image.display({ data: new Uint8ClampedArray(width * height * 4), width, height }, (displayData) => {
            if (!displayData) {
                return reject(new Error('HEIF processing error'));
            }

            // get the ArrayBuffer from the Uint8Array
            resolve(displayData.data.buffer);
        });
    });

    return { width, height, data: arrayBuffer };
};

const decodeBuffer = async ({ buffer }) => {
    const decoder = new libheif.HeifDecoder();
    const data = decoder.decode(buffer);

    if (!data.length) {
        throw new Error('HEIF image not found');
    }

    return await decodeImage(data[0]);
};

const convertImage = async ({ image, quality }) => {
    return await toJPEG({
        width: image.width,
        height: image.height,
        data: Buffer.from(image.data),
        quality: Math.floor(quality * 100)
    });
};

const convert = async ({ buffer, quality }) => {
    const image = await decodeBuffer({ buffer })
    return await convertImage({ image, quality });
};

const debug = (s) => console.log(`[HEIC]: ${s}`);

const activate = async () => {
    const images = Array.from(document.querySelectorAll("img")).filter(i => {
        try {
            const url = new URL(i.src);
            const filename = url.pathname.split('/').reverse()[0]
            const ext = filename.split('.')[1];
            return ext.toUpperCase() === "HEIC";
        } catch (e) {
            return false
        }
    });
    if (images.length === 0) return;

    images.forEach(img => {
        const src = img.src;
        debug(src);
        axios
            .get(src, { responseType: "blob" })
            .then(r => r.data as Blob)
            .then(async b => {
                const buf = await b.arrayBuffer();
                const output = await convert({
                    buffer: buf,
                    quality: 0.9
                });
                img.src = URL.createObjectURL(new Blob([output], { type: "image/jpeg" }));
            });
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
