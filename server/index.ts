import express from 'express';
import asyncHandler from 'express-async-handler';
import { initDB } from './datastore/datastore';
import { getStudents, addStudents, deleteStudent, changeGroup , attendStudent , getTodaysAttendence} from './Handler/StudentHandler';
import {createExam , getExamByMonth } from './Handler/ExamsHandler' ; 
import { errHandler } from './Middleware/errorMidlware';
import { getMonthlyMoney } from './Handler/MoneyHandler';
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
  app.get('/v1/getTodaysAttendence', asyncHandler(getTodaysAttendence));
  app.get('/v1/getMonthlyMoneyForAllStudents' , asyncHandler(getMonthlyMoney)) ; 


  app.post('/v1/atttendStudent' , asyncHandler(attendStudent))
  app.post('/v1/getExamByMonth' , asyncHandler(getExamByMonth))
  app.post('/v1/addStudent', asyncHandler(addStudents));
  app.post('/v1/deleteStudent', asyncHandler(deleteStudent));
  app.post('/v1/changeGroup', asyncHandler(changeGroup));
  app.post('/v1/createExam' , asyncHandler(createExam))
  app.use(errHandler);
  app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
  });
})();
