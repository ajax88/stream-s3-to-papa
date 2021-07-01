const Papa = require("papaparse");
const AWS = require("aws-sdk");

const S3_KEY = process.env.S3_KEY;
const S3_SECRET = process.env.S3_SECRET;
const S3_REGION = process.env.S3_REGION;
const S3_BUCKET = process.env.S3_BUCKET;

const client = new AWS.S3({
  accessKeyId: S3_KEY,
  secretAccessKey: S3_SECRET,
  region: S3_REGION,
  httpOptions: {
    timeout: 120000,
    agent: undefined,
  },
});

(async () => {
  const readStream = client
    .getObject({
      Key: "LGxEq8LGZchB4rRFW/user-csv-uploads/W55Fsn7e2e4Josq8z.csv",
      Bucket: S3_BUCKET,
    })
    .createReadStream()
    .on("error", (err) => console.log(`Error in csv streaming ${err}`));

  const csvStream = Papa.parse(Papa.NODE_STREAM_INPUT, {
    header: true,
  });

  readStream.pipe(csvStream);

  const sleep = async (ms) =>
    new Promise((resolve) => setTimeout(() => resolve(), ms));

  let numProcessed = 0;

  const now = new Date().getTime();

  for await (const row of csvStream) {
    await sleep(1000);
    console.log(numProcessed);
    numProcessed += 1;
  }

  console.log(
    `Processing CSV finished, ${numProcessed} rows processed in ${
      new Date().getTime() - now
    }ms`
  );
})();
