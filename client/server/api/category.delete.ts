import { RowDataPacket } from 'mysql2';
import getMySQLConnection from '~/server/db/index';

export default defineEventHandler(async (e) => {
  try {
    const data = await readBody(e);
    const { id, parentId, list } = await readBody(e);

    if (!parentId && list.length > 0) {
      throw new Error('해당 그룹에 카테고리가 존재하여 삭제할 수 없습니다.');
    }

    // 연결 풀에서 연결 가져오기
    const connection = await getMySQLConnection();

    const target = parentId ? 'child_categories' : 'parent_categories';
    const sql = `
        DELETE FROM ${target}
        WHERE id=${id};
      `;

    await connection.execute(sql);
    // 연결 반환
    connection.release();

    return {
      status: 'ok',
    };
  } catch (error) {
    console.error(error);
    return {
      status: 'bad',
    };
  }
});
