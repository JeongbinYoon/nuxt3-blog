import jwt, { Secret } from 'jsonwebtoken';

export default defineEventHandler((e) => {
  // http요청시 토큰 검증 후 쿠키에 로그인 여부 저장
  const token = getCookie(e, 'authToken');

  const secretKey = process.env.JWT_SECRET_KEY as Secret;

  if (token) {
    jwt.verify(token, secretKey, (error, decoded) => {
      setCookie(e, 'isLogin', error ? 'N' : 'Y');
    });
  } else {
    setCookie(e, 'isLogin', 'N');
  }
});
