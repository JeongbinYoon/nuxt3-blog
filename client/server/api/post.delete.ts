import { RowDataPacket } from 'mysql2';
import getMySQLConnection from '~/server/db/index';

export default defineEventHandler(async (e) => {
  const id = getQuery(e).id;
  try {
    // 연결 풀에서 연결 가져오기
    const connection = await getMySQLConnection();
    const sql = `
        DELETE FROM posts
        WHERE id=${id};
      `;

    await connection.execute(sql);
    // 연결 반환
    connection.release();

    return {
      status: 'ok',
    };
  } catch (error) {
    console.error(error);
    return {
      status: 'bad',
    };
  }
});
