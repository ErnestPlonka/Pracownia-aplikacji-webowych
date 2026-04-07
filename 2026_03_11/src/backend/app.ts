import express from 'express';
import postRouter from './routes/postRouter.ts';
import commentRouter from './routes/commentRouter.ts';

const app = express();
app.use(express.json());

app.use('/post', postRouter);
app.use('/comment', commentRouter);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));

export default app;