import { ResultSetHeader } from 'mysql2';
import getMySQLConnection from '~/server/db/index';

export default defineEventHandler(async (e) => {
  let { title = '', contents = '' } = await readBody(e);

  try {
    const connection = await getMySQLConnection();

    const sql = `
            INSERT INTO xss
            (title, contents)
            VALUES ('${title}', '${contents}');
        `;

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
