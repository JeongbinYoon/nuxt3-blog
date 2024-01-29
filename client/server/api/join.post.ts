import bcrypt from 'bcrypt';
import { RowDataPacket } from 'mysql2';
import getMySQLConnection from '~/server/db/index';

export default defineEventHandler(async (e) => {
  const { id, pw, name } = await readBody(e);
  try {
    const hashedPw = await bcrypt.hash(pw, 10);

    // 연결 풀에서 연결 가져오기
    const connection = await getMySQLConnection();

    const checkUser = `
        SELECT * FROM user WHERE account='${id}';
      `;

    const [rows] = await connection.execute(checkUser);

    const isIdExist = !!(rows as RowDataPacket[])[0]?.id;
    console.log(isIdExist);

    let msg = '';
    if (isIdExist) {
      msg = '이미 사용된 아이디입니다.';
    } else {
      const sql = `
            INSERT INTO user (account, password, name) VALUES('${id}','${hashedPw}','${name}');
          `;

      await connection.execute(sql);

      msg = '회원가입 완료';
    }

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
