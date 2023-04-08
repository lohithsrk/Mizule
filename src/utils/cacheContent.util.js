const RNFS = require('react-native-fs');

export const cacheContent = (URL, token) => {
    let filename = URL.substring(URL.lastIndexOf("/") + 1, URL.length);
    let path_name = RNFS.DocumentDirectoryPath + "/" + filename;
    RNFS.exists(path_name).then(exists => {
        if (exists) {
            // console.log("Content already cached.")
            return
        } else {
            RNFS.downloadFile({
                fromUrl: URL,
                toFile: path_name.replace(/%20/g, "_"),
                background: true,
                // , headers: { 'Authorization': `Bearer ${token}` }
            })
                .promise.then(res => {
                    if (res.statusCode != 200) {
                        // console.log("File does not downloaded -", res.statusCode);
                        return RNFS.unlink(path_name.replace(/%20/g, "_"))
                            .then(() => {
                                // console.log('Content unlinked');
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }
                })
                .catch(err => {
                    console.log("err downloadFile", err);
                });
        }
    });
}

export const getCachedContent = (URL) => {
    const fileName = URL.substring(URL.lastIndexOf("/") + 1, URL.length);
    let path_name = RNFS.DocumentDirectoryPath + "/" + fileName;
    return new Promise((resolve, reject) => {
        RNFS.exists(path_name).then(exists => {
            if (exists) {
                // console.log("Content exists")
                resolve(path_name);
            } else {
                // console.log("Content does not exist")
                resolve('')
            }
        });
        // RNFS.readDir(RNFS.DocumentDirectoryPath)
        //     .then(result => {
        //         result.forEach(element => {
        //             if (element.name == fileName.replace(/%20/g, "_")) {
        //                 console.log(element.path, 'asdf');
        //                 resolve(element.path);
        //             }
        //         });
        //     })
        //     .catch(err => {
        //         console.log(err, 'asdf');
        //         reject(URL);
        //     });
    });
}