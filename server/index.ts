import express from 'express';
import asyncHandler from 'express-async-handler';
import { initDB } from './datastore';
import { getStudents, addStudents, deleteStudent, changeGroup } from './Handler/StudentHandler';
import { errHandler } from './Middleware/errorMidlware';
(async () => {
  await initDB();
  const cors = require('cors')

  const app = express();
  const port = 8080;
  app.use(cors({
    origin: '*'
}));

  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.get('/v1/getStudents', asyncHandler(getStudents));
  app.post('/v1/addStudent', asyncHandler(addStudents));
  app.post('/v1/deleteStudent', asyncHandler(deleteStudent));
  app.post('/v1/changeGroup', asyncHandler(changeGroup));

  app.use(errHandler);
  app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
  });
})();
