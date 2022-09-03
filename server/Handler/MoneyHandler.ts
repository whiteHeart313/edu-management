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
  {studentAleadyPaid :  studentMonthlyMoney[]}
> = async (req, res) => {

  console.log("am here ....................................")

  let stuedntsMoney = req.body.StudentsMonthlyMoney
  let studentHaspaid : studentMonthlyMoney[]= []
  for(let i = 0  ; i < stuedntsMoney?.length! ; i++ ) {
    let studentMoney = stuedntsMoney![i]

    if(await studentHasBeenAleardyPaid(studentMoney.st_id)) {
      studentHaspaid.push(studentMoney)
      continue ; 
    }
    const money : MonthlyMoney =  {
      id: crypto.randomUUID(),
      st_id: studentMoney.st_id,
      month: getDate().month,
      money: studentMoney.money
    }

    await db.PutMonthlyMoneyToStudents(money)

  }
  if(studentHaspaid.length == stuedntsMoney?.length) {
    return res.status(400).send({message : "all students has been paid this month already "})
  }
  else if(studentHaspaid.length > 0 ) {
    return res.status(201).send({studentAleadyPaid : studentHaspaid})

  }
  return res.status(201).send({message : "money added to all  students"})
  
};

async function studentHasBeenAleardyPaid(studentId : string) : Promise<boolean>{
  if(await db.getStudentMoneyByMonth(studentId , getDate().month)) {

    return true ; 
  }

  return false ; 
}

// TODOS 
/*
     2- getBooksMoney
     3- PutBooksMoneyToStudets
     4- should have a function that return BooksMoney data and monthlyMoney data related to specific student 
**/
