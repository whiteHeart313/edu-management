import { StudentDao  } from './datastore/dao/studentDao';

import { examsDao  } from './datastore/dao/examsDao';

import { models } from './sql/Database';

export interface datastore extends StudentDao , examsDao {}

export let db: datastore;
export const initDB = async () => {
  db = await new models().openDb();
};
