
import express from 'express';
import asyncHandler from "express-async-handler"
import { initDB } from './datastore';
import {getStudents} from './Handler/StudentHandler' ; 
import {errHandler} from './Middleware/errorMidlware' ; 



(async ()=> {
  await initDB()

const app = express();
const port = 3000;


app.use(express.json())


app.get('/', (req, res) => {
  res.send('Hello World!');
});



 app.get('/v1/getStudents' , asyncHandler(getStudents))


 app.use(errHandler)
app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
})


})();