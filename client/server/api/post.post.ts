import { ResultSetHeader } from 'mysql2';
import getMySQLConnection from '~/server/db/index';

export default defineEventHandler(async (e) => {
  const {
    title = '',
    content = '',
    author = '',
    category = '',
  } = await readBody(e);
  try {
    // 연결 풀에서 연결 가져오기
    const connection = await getMySQLConnection();
    const sql = `
            INSERT INTO posts 
            (title,content,author,category,created) 
            VALUES ('${title}', '${content}', '${author}', '${category}' ,NOW());
      `;

    const [data] = await connection.execute<ResultSetHeader>(sql);
    console.log(data.insertId);
    // 연결 반환
    connection.release();

    return {
      res: {
        postId: data.insertId,
      },
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
