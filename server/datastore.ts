import { StudentDao } from './datastore/dao/studentDao';
import { models } from './sql/Database';

export interface datastore extends StudentDao {}

export let db: datastore;
export const initDB = async () => {
  db = await new models().openDb();
};
