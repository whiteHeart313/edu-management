import { db } from '../datastore/datastore';
import { monthlyMoneyWithStudetData, typeValidation } from '../types';

export const getMonthlyMoney: typeValidation<
  {},
  { StudentsMonthlyMoney: monthlyMoneyWithStudetData[] }
> = async (req, res) => {
  res.status(200).send({ StudentsMonthlyMoney: await db.getMonthlyMoney() });
};
