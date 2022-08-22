import { StudentDao  } from './dao/studentDao';

import { examsDao  } from './dao/examsDao';

import { models } from '../sql/Database';
import { MoneyDao } from './dao/moneyDao';

export interface datastore extends StudentDao , examsDao , MoneyDao{}

export let db: datastore;
export const initDB = async () => {
  db = await new models().openDb();
};
