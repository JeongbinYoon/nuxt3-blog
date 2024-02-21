import { ResultSetHeader } from 'mysql2';
import getMySQLConnection from '~/server/db/index';

export default defineEventHandler(async (e) => {
  const { id } = getQuery(e);
  let {
    title = '',
    contents = '',
    preview = '',
    thumbnail = '',
    author = '',
    category = '',
  } = await readBody(e);

  try {
    // 연결 풀에서 연결 가져오기
    const connection = await getMySQLConnection();

    // 미리보기 글 지정하지 경우 글 내용에서 400자
    if (!preview) {
      // HTML 태그 및 &nbsp; 제거
      preview = contents.replace(/<[^>]*>|&nbsp;/g, '').substring(0, 400);
    }

    const sql = `
            UPDATE posts 
            SET title='${title}', contents='${contents}', preview='${preview}', thumbnail='${thumbnail}',
            author='${author}', category='${category}', created=NOW()
            WHERE posts.id=${id};
      `;

    await connection.execute<ResultSetHeader>(sql);
    // 연결 반환
    connection.release();

    return {
      res: {
        msg: '수정되었습니다.',
      },
      status: 'ok',
    };
  } catch (error) {
    console.error(error);
    return {
      res: {
        msg: '수정에 실패하였습니다.',
      },
      status: 'bad',
    };
  }
});
