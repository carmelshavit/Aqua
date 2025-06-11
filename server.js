import express from 'express';
import { userRouter } from './user.routes.js';

const app = express();

app.use(express.json());
app.use('/users', userRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});