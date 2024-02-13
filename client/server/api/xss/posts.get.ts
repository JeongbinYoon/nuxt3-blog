import { ResultSetHeader } from 'mysql2';
import getMySQLConnection from '~/server/db/index';

export default defineEventHandler(async (e) => {
  try {
    const connection = await getMySQLConnection();

    const sql = `SELECT * FROM xss;`;

    const [data] = await connection.execute<ResultSetHeader>(sql);

    connection.release();

    return {
      res: {
        data,
      },
      status: 'ok',
    };
  } catch (error) {
    console.error(error);
    return {
      res: {
        data: null,
      },
      status: 'bad',
    };
  }
});
