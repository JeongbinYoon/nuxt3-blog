import { ResultSetHeader } from 'mysql2';
import getMySQLConnection from '~/server/db/index';

export default defineEventHandler(async (e) => {
  let {
    title = '',
    contents = '',
    preview = '',
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
            INSERT INTO posts 
            (title, contents, preview, author, category, created) 
            VALUES ('${title}', '${contents}', '${preview}', '${author}', '${category}' ,NOW());
      `;

    const [data] = await connection.execute<ResultSetHeader>(sql);

    // 연결 반환
    connection.release();

    return {
      res: {
        postId: data.insertId,
        msg: '글이 게시되었습니다.',
      },
      status: 'ok',
    };
  } catch (error) {
    console.error(error);
    return {
      res: {
        msg: '게시에 실패하였습니다.',
      },
      status: 'bad',
    };
  }
});
