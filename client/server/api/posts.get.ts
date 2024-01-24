import getMySQLConnection from '~/server/db/index';

export default defineEventHandler(async (e) => {
  try {
    const categoryId = getQuery(e).categoryId;
    // 연결 풀에서 연결 가져오기
    const connection = await getMySQLConnection();
    const sql_where =
      categoryId && categoryId !== 'all' ? `WHERE category=${categoryId}` : '';

    let sql = `
        SELECT posts.id AS postId, title, preview, category, created, child_categories.name AS categoryName, parent_categories.name AS groupName
        FROM posts
        LEFT JOIN child_categories ON posts.category = child_categories.id
        LEFT JOIN parent_categories ON parent_id = parent_categories.id
        ${sql_where};
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
