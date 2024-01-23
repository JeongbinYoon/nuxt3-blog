import { ResultSetHeader } from 'mysql2';
import getMySQLConnection from '~/server/db/index';

export default defineEventHandler(async (e) => {
  try {
    const { type, name, parentId } = await readBody(e);
    // 연결 풀에서 연결 가져오기
    const connection = await getMySQLConnection();

    let sql = '';
    if (type === 'group') {
      sql = `
              INSERT INTO parent_categories
              (name) 
              VALUES ('${name}');
            `;
    } else if (type === 'category') {
      sql = `
              INSERT INTO child_categories
              (name, parent_id) 
              VALUES ('${name}', '${parentId}');
            `;
    }

    if (sql === '') throw Error('sql undefined');

    await connection.execute<ResultSetHeader>(sql);

    // 연결 반환
    connection.release();

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
