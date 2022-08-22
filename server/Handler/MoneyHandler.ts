import { db } from '../datastore/datastore';
import { monthlyMoneyWithStudetData, typeValidation } from '../types';

export const getMonthlyMoney: typeValidation<
  {},
  { StudentsMonthlyMoney: monthlyMoneyWithStudetData[] }
> = async (req, res) => {
  res.status(200).send({ StudentsMonthlyMoney: await db.getMonthlyMoney() });
};

// TODOS 

/*
     1- PutMonthlyMoneyToStudents
     2- getBooksMoney
     3- PutBooksMoneyToStudets

     4- should have a function that return BooksMoney data and monthlyMoney data related to specific student 
**/
