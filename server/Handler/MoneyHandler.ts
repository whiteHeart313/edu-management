import { db } from '../datastore/datastore';
import { monthlyMoneyWithStudetData, typeValidation , studentMonthlyMoney, MonthlyMoney } from '../types';
import crypto from 'crypto';
import { getDate } from './DateHandler';
export const getMonthlyMoney: typeValidation<
  {},
  { StudentsMonthlyMoney: monthlyMoneyWithStudetData[] }
> = async (req, res) => {
  res.status(200).send({ StudentsMonthlyMoney: await db.getMonthlyMoney() });
};



export const putStudentMoney: typeValidation<
  {StudentsMonthlyMoney: studentMonthlyMoney[] },
  { }
> = async (req, res) => {

  let stuedntsMoney = req.body.StudentsMonthlyMoney

  for(let i = 0  ; i < stuedntsMoney?.length! ; i++ ) {
    let studentMoney = stuedntsMoney![i]


    const money : MonthlyMoney =  {
      id: crypto.randomUUID(),
      st_id: studentMoney.st_id,
      month: getDate().month,
      money: studentMoney.money
    }

    retunr 

  }
  
};

// TODOS 

/*
     1- PutMonthlyMoneyToStudents
     2- getBooksMoney
     3- PutBooksMoneyToStudets

     4- should have a function that return BooksMoney data and monthlyMoney data related to specific student 
**/
