import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default defineEventHandler(async (e) => {
  const formData = await readMultipartFormData(e);

  let fileData = null;
  if (formData?.length) fileData = formData[0];

  const result = await new Promise((resolve) => {
    cloudinary.uploader
      .upload_stream(
        {
          transformation: {
            width: 600,
            crop: 'scale',
          },
        },
        (error, uploadResult) => {
          return resolve(uploadResult);
        }
      )
      .end(fileData.data);
  }).then((uploadResult) => {
    console.log(
      `Buffer upload_stream wth promise success - ${uploadResult.public_id}`
    );

    return uploadResult;
  });
  return {
    url: result.url,
  };
});
