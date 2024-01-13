import getMySQLConnection from "../db";

export default defineEventHandler(async () => {
  try {
    // 연결 풀에서 연결 가져오기
    const connection = await getMySQLConnection();
    const sql = `
            SELECT child_categories.id as categoryId,child_categories.name, parent_categories.id as parentId, parent_categories.name as parentName 
            FROM child_categories 
            LEFT JOIN parent_categories 
            ON parent_id=parent_categories.id;
          `;

    const [rows, fields] = await connection.execute(sql);

    // 연결 반환
    connection.release();

    return {
      result: rows,
      status: "ok",
    };
  } catch (error) {
    console.error(error);
    return {
      result: [],
      status: "bad",
    };
  }
});
