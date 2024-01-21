import { RowDataPacket } from 'mysql2';
import getMySQLConnection from '~/server/db/index';

export default defineEventHandler(async (e) => {
  const { id } = getQuery(e);
  try {
    // 연결 풀에서 연결 가져오기
    const connection = await getMySQLConnection();

    const sql_where = `WHERE posts.id=${id};`;
    const sql = `
        SELECT posts.id as post_id, title, category, contents, account, name, created 
        FROM posts 
        LEFT JOIN user 
        ON posts.author=user.id
        ${sql_where ? sql_where : ';'}
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
