const RNFS = require('react-native-fs');

export const cacheVideo = (videoUrl) => {
    let filename = videoUrl.substring(videoUrl.lastIndexOf("/") + 1, videoUrl.length);
    let path_name = RNFS.DocumentDirectoryPath + "/" + filename;
    RNFS.exists(path_name).then(exists => {
        if (exists) {
            console.log("Video already cached.")
        } else {
            RNFS.downloadFile({
                fromUrl: videoUrl,
                toFile: path_name.replace(/%20/g, "_"),
                background: true
            })
                .promise.then(res => {
                    console.log("File Downloaded", res);
                })
                .catch(err => {
                    console.log("err downloadFile", err);
                });
        }
    });
}

export const getCachedVideo = (videoURL) => {
    const fileName = videoURL.substring(videoURL.lastIndexOf("/") + 1, videoURL.length);
    return new Promise((resolve, reject) => {
        RNFS.readDir(RNFS.DocumentDirectoryPath)
            .then(result => {
                result.forEach(element => {
                    if (element.name == fileName.replace(/%20/g, "_")) {
                        resolve(element.path);
                    }
                });
            })
            .catch(err => {
                reject(videoURL);
            });
    });
}