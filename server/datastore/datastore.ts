import { StudentDao  } from './dao/studentDao';

import { examsDao  } from './dao/examsDao';

import { models } from '../sql/Database';

export interface datastore extends StudentDao , examsDao {}

export let db: datastore;
export const initDB = async () => {
  db = await new models().openDb();
};
