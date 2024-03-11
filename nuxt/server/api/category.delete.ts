import { RowDataPacket } from 'mysql2';
import getMySQLConnection from '~/server/db/index';

export default defineEventHandler(async (e) => {
  try {
    const { id, categoryId, parentId, list, postCount } = await readBody(e);

    if (!parentId && list.length > 0) {
      throw new Error('해당 그룹에 카테고리가 존재하여 삭제할 수 없습니다.');
    } else if (categoryId && postCount > 0) {
      throw new Error('해당 카테고리가 포스트가 존재하여 삭제할 수 없습니다.');
    }

    // 연결 풀에서 연결 가져오기
    const connection = await getMySQLConnection();

    const targetTable = parentId ? 'child_categories' : 'parent_categories';
    const targetId = categoryId ? categoryId : id;
    const sql = `
        DELETE FROM ${targetTable}
        WHERE id=${targetId};
      `;

    await connection.execute(sql);
    // 연결 반환
    connection.release();

    return {
      status: 'ok',
    };
  } catch (error: unknown) {
    console.error(error);

    let errMsg = '';
    if (error instanceof Error) {
      errMsg = error.message;
    }
    return {
      msg: errMsg,
      status: 'bad',
    };
  }
});
