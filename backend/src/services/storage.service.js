const { ImageKit } = require("@imagekit/nodejs/client.js");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadFile(file) {
  const result = await imagekit.files.upload({
    file,
    fileName: "food_" + Date.now(),
    folder: "Zomato_MERN_STACK/food_videos",
  });

  return result;
}

module.exports = { uploadFile };
