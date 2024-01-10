export default defineEventHandler((e) => {
  const mysql = e.context.mysql;
  const sql = 'select * from posts';
  mysql.query(sql, function (err, rows, fields) {
    if (err) {
      console.error('error connecting: ' + err.stack);
    }
    console.log(rows);
  });

  return {
    status: 'GET',
  };
});
