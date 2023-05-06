import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.VUE_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.VUE_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.VUE_APP_AWS_REGION,
});

export async function uploadFileToS3(file, folder) {
  const fileName = `${folder}/${Date.now()}-${file.name}`;
  const params = {
    Bucket: process.env.VUE_APP_AWS_S3_BUCKET,
    Key: fileName,
    Body: file,
    ContentType: file.type,
    ACL: "public-read",
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}
