import { db } from "../datastore";
import { Exam, typeValidation , examType} from "../types";


export const getDailyExams: typeValidation<{}, { exams: Exam[] }> = async (req, res) => {
    return res.status(200).send({ exams: await db.getAllDailyExams() });
  };

  export const getMonthlyExams: typeValidation<{}, { exams: Exam[] }> = async (req, res) => {
    return res.status(200).send({ exams: await db.getAllMonthlyExams() });
  };


  export const createDailyExam: typeValidation<examType, {}> = async (req, res) => {
    return res.status(200).send();
  };

  export const createMonthlyExam: typeValidation<examType, {}> = async (req, res) => {
    return res.status(200).send();
  };

  export const getExamByMonth: typeValidation<{month : string} , {exams : Exam[]}>= async (req, res) => {

  }

  export const getStudentDailyExams: typeValidation<examType, {exams : Exam[]}> = async (req, res) => {
    return res.status(200).send();
  };
  export const getStudentMonthlyExams: typeValidation<examType, {exams : Exam[]}> = async (req, res) => {
    return res.status(200).send();
  };


