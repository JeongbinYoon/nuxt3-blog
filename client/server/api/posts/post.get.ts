import getMySQLConnection from '~/server/db/index';

export default defineEventHandler(async (e) => {
  try {
    // 연결 풀에서 연결 가져오기
    const connection = await getMySQLConnection();
    const sql = 'SELECT * FROM author';

    const [rows, fields] = await connection.execute(sql);
    console.log('Query result:', rows);
    // console.log("Query result:", fields);

    // 연결 반환
    connection.release();

    return {
      result: rows,
      status: 'ok',
    };
  } catch (error) {
    console.error(error);

    return {
      result: [],
      status: 'bad',
    };
  }
});
