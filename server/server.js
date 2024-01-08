import mongoDB from './mongo/index.js';
import express from 'express';

const app = express();

app.get('/', (req, res) => {});
app.get('/post', (req, res) => res.json({ msg: 'hello' }));

mongoDB();

app.listen(8080, () => console.log('listening 8080..'));
