import getMySQLConnection from '~/server/db/index';

export default defineEventHandler(async (e) => {
  try {
    const categoryId = getQuery(e).categoryId;
    // 연결 풀에서 연결 가져오기
    const connection = await getMySQLConnection();
    let sql_where = '';
    if (categoryId && categoryId !== 'all') {
      sql_where = ` WHERE category=${categoryId};`;
    }
    let sql = `
        SELECT posts.id as post_id, title, preview, account, name, category, created 
        FROM posts 
        LEFT JOIN user 
        ON posts.author=user.id
        ${sql_where ? sql_where : ';'}
      `;

    const [rows] = await connection.execute(sql);
    console.log(rows);

    // 연결 반환
    connection.release();

    return {
      res: rows,
      status: 'ok',
    };
  } catch (error) {
    console.error(error);
    return {
      res: [],
      status: 'bad',
    };
  }
});
