const { Storage } = require('@google-cloud/storage');
const sharp = require('sharp');

/**
 * Triggered from a change to a Cloud Storage bucket.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */

exports.helloGCS = async (event, context) => {
  // console.log(`event: ${JSON.stringify(event)}`);
  // console.log(`context: ${JSON.stringify(context)}`);
  // console.log(event.name);

  if (event.name.includes('thumb')) {
    return;
  }

  const size = [
    ['s', 320],
    ['m', 640],
    ['l', 1280],
  ];

  const storage = new Storage().bucket('codecamp-1');

  await Promise.all(
    size.map((e) => {
      return new Promise((resolve, reject) => {
        storage
          .file(event.name)
          .createReadStream()
          .pipe(sharp().resize(e[1]))
          .pipe(storage.file(`thumb/${e[0]}/${event.name}`).createWriteStream())
          .on('finish', () => resolve(`codecamp-1/thumb/${e[0]}/${event.name}`))
          .on('error', (error) => reject(error));
      });
    }),
  );
};
