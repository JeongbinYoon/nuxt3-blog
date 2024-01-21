import { ResultSetHeader } from 'mysql2';
import getMySQLConnection from '~/server/db/index';

export default defineEventHandler(async (e) => {
  const { id } = getQuery(e);
  const {
    title = '',
    contents = '',
    author = '',
    category = '',
  } = await readBody(e);

  try {
    // 연결 풀에서 연결 가져오기
    const connection = await getMySQLConnection();
    const sql = `
            UPDATE posts 
            SET title='${title}', contents='${contents}', 
            author='${author}', category='${category}', created=NOW()
            WHERE posts.id=${id};
      `;

    await connection.execute<ResultSetHeader>(sql);
    // 연결 반환
    connection.release();

    return {
      res: {
        msg: '수정되었습니다.',
      },
      status: 'ok',
    };
  } catch (error) {
    console.error(error);
    return {
      res: {
        msg: '수정에 실패하였습니다.',
      },
      status: 'bad',
    };
  }
});
