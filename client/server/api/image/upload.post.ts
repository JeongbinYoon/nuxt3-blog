import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default defineEventHandler(async (e) => {
  try {
    const formData = await readMultipartFormData(e);

    let fileData = null;
    if (formData?.length) fileData = formData[0];
    console.log(fileData);

    new Promise((resolve) => {
      cloudinary.uploader
        .upload_stream((error, uploadResult) => {
          return resolve(uploadResult);
        })
        .end(fileData.data);
    }).then((uploadResult) => {
      console.log(
        `Buffer upload_stream wth promise success - ${uploadResult.public_id}`
      );
    });

    return {
      res: {
        msg: '이미지 업로드 완료',
      },
      status: 'ok',
    };
  } catch (error) {
    console.error(error);
    return {
      msg: '이미지 업로드 실패',
      status: 'bad',
    };
  }
});
