import { ResultSetHeader } from 'mysql2';
import getMySQLConnection from '~/server/db/index';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default defineEventHandler(async (e) => {
  try {
    const file = await readBody(e);
    // 연결 풀에서 연결 가져오기
    // const connection = await getMySQLConnection();

    // await connection.execute<ResultSetHeader>(sql);

    // Use the uploaded file's name as the asset's public ID and
    // allow overwriting the asset with new versions
    // const imagePath =
    //   'https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg';
    // const options = {
    //   use_filename: true,
    //   unique_filename: false,
    //   overwrite: true,
    // };

    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(file);
      //   const result = await cloudinary.uploader.upload(imagePath, options);
      console.log(result);
      return result.public_id;
    } catch (error) {
      console.error(error);
    }

    // cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
    // { public_id: "olympic_flag" },
    // function(error, result) {console.log(result); });

    // 연결 반환
    // connection.release();

    return {
      res: {
        msg: '카테고리를 추가하였습니다.',
      },
      status: 'ok',
    };
  } catch (error) {
    console.error(error);
    return {
      msg: '카테고리를 추가하지 못했습니다.',
      status: 'bad',
    };
  }
});
