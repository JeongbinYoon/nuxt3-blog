import { ResultSetHeader } from 'mysql2';
import getMySQLConnection from '~/server/db/index';

export default defineEventHandler(async (e) => {
  try {
    const { name } = getQuery(e);
    // 연결 풀에서 연결 가져오기
    const connection = await getMySQLConnection();

    const sql = `
            INSERT INTO parent_categories 
            (name) 
            VALUES ('${name}');
      `;

    const [data] = await connection.execute<ResultSetHeader>(sql);
    console.log('>>>', data);

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
      res: {
        msg: '카테고리를 추가하지 못했습니다.',
      },
      status: 'bad',
    };
  }
});
