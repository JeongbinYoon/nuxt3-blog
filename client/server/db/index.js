import mysql from 'mysql2/promise';

// MySQL 연결 풀 생성
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// 풀에서 연결 가져오기
const getMySQLConnection = () => pool.getConnection();

// 모든 카테고리의 글 개수를 업데이트하는 함수
// 초기에 한 번 싱크 맞춰준 후 사용 X => 트리거에서 카운팅
const updateCategoryPostCount = async () => {
  try {
    const [categories] = await pool.query('SELECT id FROM child_categories');

    for (const category of categories) {
      const [postCountResult] = await pool.query(
        'SELECT COUNT(*) AS count FROM posts WHERE category = ?',
        [category.id]
      );

      const postCount = postCountResult[0].count;

      await pool.query(
        'UPDATE child_categories SET post_count = ? WHERE id = ?',
        [postCount, category.id]
      );
    }

    console.log('Category post counts updated successfully');
  } catch (err) {
    console.error('Error updating category post counts: ' + err.stack);
  }
};

// 글이 추가될 때마다 카테고리 테이블의 글 개수를 증가시키는 트리거 생성
const createTriggerQuery = `
CREATE TRIGGER after_post_insert
AFTER INSERT ON posts
FOR EACH ROW
BEGIN
  UPDATE child_categories
  SET post_count = post_count + 1
  WHERE id = NEW.category;
END;
`;

// 트리거 생성
const createTrigger = async () => {
  try {
    const [existingTriggers] = await pool.query(
      'SHOW TRIGGERS LIKE "after_post_insert"'
    );
    if (existingTriggers.length === 0) {
      await pool.query(createTriggerQuery);
      console.log('Trigger created successfully');
    }
  } catch (err) {
    console.error('Trigger creation failed: ' + err.stack);
  }
};

// 트리거 생성 함수 호출
createTrigger();

// 카테고리 글 개수 업데이트 함수 호출
// updateCategoryPostCount();

export default getMySQLConnection;
