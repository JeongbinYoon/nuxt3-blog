import { RowDataPacket } from 'mysql2';
import getMySQLConnection from '../db';

export default defineEventHandler(async () => {
  interface Category extends RowDataPacket {
    categoryId: number;
    name: string;
    parentId?: number;
  }
  interface parentCategory extends Category {
    list: Category[];
  }

  try {
    // 연결 풀에서 연결 가져오기
    const connection = await getMySQLConnection();

    // 카테고리
    const sql = `
            SELECT child_categories.id as categoryId,child_categories.name, post_count as postCount, parent_categories.id as parentId
            FROM child_categories
            LEFT JOIN parent_categories
            ON parent_id=parent_categories.id;
          `;

    // 그룹
    const sql2 = `
              SELECT *
              FROM parent_categories;
            `;

    const [child] = await connection.execute<Category[]>(sql);
    const [parents] = await connection.execute<parentCategory[]>(sql2);

    parents.map((parent) => (parent.list = []));

    // parentId를 기준으로 그룹화
    const groupedByParentId = child.reduce((result, item) => {
      const parentId = item.parentId;

      result.find((parent) => parent.id === parentId)?.list.push(item);

      return result;
    }, parents as parentCategory[]);

    // 연결 반환
    connection.release();

    return {
      res: groupedByParentId,
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
