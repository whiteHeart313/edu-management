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
  id  : string , 
  st_id : string , 
  date : string  
} 
export interface Exam {

  id  : string , 
  st_id : string , 
  date : string  , 
  examResult : Number

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

export type examType = Pick<
  Exam,
  'st_id' | 'examResult' 
>;


export type JSONValue =
    | string
    | number
    | boolean
    | { [x: string]: JSONValue }
    | Array<JSONValue>;


export type message<T> = T & { message: string };
