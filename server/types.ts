import { RequestHandler } from 'express';

export interface student {
  id: string;
  name: string;
  phone: string;
  parentPhone: string;
  grade: string;
  group: String;
  type: string;
}

export interface attendence {
  id: string;
  st_id: string;
  date: string;
}
export interface Exam {
  id: string;
  st_id: string;
  date: string;
  examResult: Number;
}

export interface MonthlyMoney {
  id: string;
  st_id: string;
  month: string;
  money: Number;
}

export interface BooksMoney {
  id: string;
  st_id: string;
  date: string;
  money: Number;
}


/* Type checking */

export type typeValidation<req, res> = RequestHandler<
  any,
  Partial<message<res>>,
  Partial<req>,
  any
>;
export type studentType = Pick<
  student,
  'name' | 'phone' | 'parentPhone' | 'grade' | 'group' | 'type'
>;

export type exam  = {st_id : string  , examResult : Number  }

export type JSONValue = string | number | boolean | { [x: string]: JSONValue } | Array<JSONValue>;

export type message<T> = T & { message: string };

export type money = {st_id : string  , money : number}

export type MonthlyMoneyType = Pick<MonthlyMoney , 'money' | 'month'>
export type monthlyMoneyWithStudetData = MonthlyMoneyType & studentType;

export type booksMoneyWithStudetData = BooksMoney & student;

export type currentDate = {day : string , month : string , year :string }


