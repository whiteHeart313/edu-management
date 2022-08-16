import { db } from '../datastore';
import { Exam, typeValidation, exam } from '../types';
import crypto from 'crypto';

export const getDailyExams: typeValidation<{}, { exams: Exam[] }> = async (req, res) => {
  return res.status(200).send({ exams: await db.getAllDailyExams() });
};

export const getMonthlyExams: typeValidation<{}, { exams: Exam[] }> = async (req, res) => {
  return res.status(200).send({ exams: await db.getAllMonthlyExams() });
};

export const createExam: typeValidation<{studentsResults : {exam : exam}[] , ExamType : boolean , date : string }, {}> = async (req, res) => {
  // bunch of exame results and you need to loop over it 

  const stResults = req.body.studentsResults!
  let invalidExamResults : Array<exam> = []
  for(let i = 0 ; i < stResults.length; i++  ) {
    let result = stResults[i]

    if( !result.exam.st_id || !result.exam.examResult) {
      res.status(422).send({ message: 'all fields are required' });
      invalidExamResults.push(result.exam)

    }
    const exam: Exam = {
      id: crypto.randomUUID(),
      st_id: result.exam.st_id,
      date: req.body.date!,
      examResult: result.exam.examResult,
    }

    if (req.body.ExamType!) {
      console.log("this is the exam type ",req.body.ExamType)
      await db.createMonthlyExam(exam);
      //res.status(201).send({ message: 'cool monthly exame is added to this student' });
    }
    else {
      console.log("this is the exam type ",req.body.ExamType)
      await db.createDailyExam(exam);
    //res.status(201).send({ message: 'cool daily exame is added to this student' });

    }
  }

  if(invalidExamResults.length > 0 ) {
    return res.send({message : `some of your students is are not stored in the system , here they are :  ${invalidExamResults}, may be lack of fields `})
  }

  return res.status(201).send({message : 'cool exames results  are added to this student'})


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
