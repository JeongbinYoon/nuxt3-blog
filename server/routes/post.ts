import express from 'express';
import { db } from '../db/index';

const router = express.Router();

router
  .route('/post')
  .get(async (req, res) => {
    // console.log(req);
    return res.send({ result: 'get' });
  })
  .post(async (req, res) => {
    const posts = db.collection('posts');

    const doc = {
      title: 'Record of a Shriveled Datum',
      content: 'No bytes, no problem. Just insert a document, in MongoDB',
    };

    const result = await posts.insertOne(doc);

    if (result) return res.send({ result: 'post' });
  });

export default router;
