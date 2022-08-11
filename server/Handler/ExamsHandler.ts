import { db } from '../datastore';
import { Exam, typeValidation, exam } from '../types';
import crypto from 'crypto';

export const getDailyExams: typeValidation<{}, { exams: Exam[] }> = async (req, res) => {
  return res.status(200).send({ exams: await db.getAllDailyExams() });
};

export const getMonthlyExams: typeValidation<{}, { exams: Exam[] }> = async (req, res) => {
  return res.status(200).send({ exams: await db.getAllMonthlyExams() });
};

export const createExam: typeValidation<exam, {}> = async (req, res) => {
  if (!req.body.examResult || !req.body.st_id)
    return res.status(422).send({ message: 'all fields are required' });

  const exam: Exam = {
    id: crypto.randomUUID(),
    st_id: req.body.st_id!,
    date: req.body.date!,
    examResult: req.body.examResult!,
  };
  if (!req.body.dialyExam) {
    await db.createMonthlyExam(exam);
    return res.status(201).send({ message: 'cool monthly exame is added to this student' });
  }
  await db.createDailyExam(exam);
  return res.status(201).send({ message: 'cool daily exame is added to this student' });
};


export const getExamByMonth: typeValidation<{ month: string }, { exams: Exam[] }> = async (
  req,
  res
) => {

  if(!req.body.month) return res.status(422).send({ message: 'all fields are required' });
  const month  = req.body.month
  console.log("this is the output of the inner join " , await db.getExamByMonth(month))
  return res.status(200).send({exams : await db.getExamByMonth(month)})

};

export const getStudentDailyExams: typeValidation<exam, { exams: Exam[] }> = async (req, res) => {
  return res.status(200).send();
};
export const getStudentMonthlyExams: typeValidation<exam, { exams: Exam[] }> = async (req, res) => {
  return res.status(200).send();
};
