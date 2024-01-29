import bcrypt from 'bcrypt';
import { RowDataPacket } from 'mysql2';
import getMySQLConnection from '~/server/db/index';

export default defineEventHandler(async (e) => {
  const { id, pw } = await readBody(e);
  try {
    // 연결 풀에서 연결 가져오기
    const connection = await getMySQLConnection();

    const checkUser = `
    SELECT * FROM user WHERE account='${id}';
    `;

    const [rows] = await connection.execute(checkUser);
    const user = (rows as RowDataPacket)[0];

    let msg = '';

    if (user) {
      const isPwCorrect = await bcrypt.compare(pw, user.password);
      if (isPwCorrect) {
        msg = '로그인 성공';
      } else {
        msg = '아이디 또는 패스워드가 틀렸습니다.';
      }
    } else msg = '아이디 또는 패스워드가 틀렸습니다.';

    // 연결 반환
    connection.release();

    return {
      res: {
        msg,
      },
      status: 'ok',
    };
  } catch (error) {
    console.error(error);
    return {
      res: {},
      status: 'bad',
    };
  }
});
