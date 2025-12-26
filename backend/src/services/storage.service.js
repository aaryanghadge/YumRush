const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(file, fileName) {
    const uploadResponse = await imagekit.upload({
        file: file, //required
        fileName: fileName, //required
    })

    return uploadResponse; // Return the URL of the uploaded file

}

module.exports = {
    uploadFile,
}