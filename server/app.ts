import express from 'express';
import mongoDB from './db/index.ts';

import indexRouter from './routes/index.ts';
import postRouter from './routes/post.ts';

const app = express();
const port = 8080;

app.use('/', indexRouter);
app.use('/', postRouter);

mongoDB();

app.listen(port, () =>
  console.log(`[Server]: Server is running at <http://localhost>:${port}`)
);
