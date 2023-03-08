import JSZipUtils from "jszip-utils";

export default function urlToPromise(url) {
    return new Promise((resolve, reject) => {
        JSZipUtils.getBinaryContent(url, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}