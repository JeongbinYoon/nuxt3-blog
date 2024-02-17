import getMySQLConnection from '~/server/db/index';

type PostLikes = {
  id: number;
  isLiked: boolean;
};

export default defineEventHandler(async (e) => {
  try {
    const { id, isLiked } = getQuery<PostLikes>(e);

    // 연결 풀에서 연결 가져오기
    const connection = await getMySQLConnection();

    await connection.execute(
      `UPDATE posts 
      SET likes = likes ${isLiked === 'true' ? '+ 1' : '- 1'}
      WHERE posts.id = ${id}`
    );

    const [rows] = await connection.execute(
      `SELECT likes 
      FROM posts
      WHERE posts.id=${id}`
    );

    const likesCount = rows[0].likes;
    // 연결 반환
    connection.release();

    return {
      res: {
        likes: likesCount,
      },
      status: 'ok',
    };
  } catch (error) {
    console.error(error);
    return {
      status: 'bad',
    };
  }
});
