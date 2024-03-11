import { RowDataPacket } from 'mysql2';
import getMySQLConnection from '~/server/db/index';

export default defineEventHandler(async (e) => {
  try {
    const { id } = getQuery(e);
    console.log(id);

    // 연결 풀에서 연결 가져오기
    const connection = await getMySQLConnection();

    const sql = `
        SELECT * FROM xss WHERE id=${id};
      `;

    const [rows] = await connection.execute(sql);
    const postData = (rows as RowDataPacket[])[0];
    // 연결 반환
    connection.release();

    return {
      res: postData,
      status: 'ok',
    };
  } catch (error) {
    console.error(error);
    return {
      res: {},
      status: 'bad',
    };
  }
});
