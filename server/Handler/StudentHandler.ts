import { db } from '../datastore/datastore';
import { student, typeValidation, studentType, currentDate } from '../types';
import crypto from 'crypto';
import {studentGroups} from './StudentGroupEnum'
export const getStudents: typeValidation<{}, { students: student[] }> = async (req, res) => {
  // get students with annotation of this student has attended or not
  return res.status(200).send({ students: await db.getAllStudent() });
};

// take student wothout id , you generate it
// store it to the DB
// difference between studentType and student that studentType don't have id but student have
// actually i dont need the client side to send me an id , i should generate it

export const addStudents: typeValidation<studentType, {}> = async (req, res) => {
  const student_ = req.body;
  if (
    !student_.name ||
    !student_.group ||
    !student_.grade ||
    !student_.phone ||
    !student_.type ||
    !student_.parentPhone
  ) {
    return res
      .status(422)
      .send({ message: 'Unprocessable entity , some parameters are required !' });
  }

  if (await studentAlreadyExist(student_)) {
    return res.status(400).send({ message: 'user already exists' });
  }

  const student: student = {
    id: crypto.randomUUID(),
    name: student_.name!,
    phone: student_.phone!,
    parentPhone: student_.parentPhone!,
    grade: student_.grade!,
    group: student_.group!,
    type: student_.type!,
    hour : student_.hour!
  };
  await db.createStudent(student);
  return res.status(201).send({ message: 'student has been created successfully ' });
};

async function studentAlreadyExist(student: Partial<studentType>) {
  if (await db.getStudentbyPhone(student.phone!)) {
    return true;
  }

  return false;
}

export const deleteStudent: typeValidation<{ id: string }, {}> = async (req, res) => {
  if (await studentNotExist(req.body.id!)) {
    return res.status(400).send({ message: 'Student is not existing in system !' });
  }
  console.log('this is the id ', req.body.id);
  await db.deleteStudent(req.body.id!);
  return res.send({ message: 'user has been deleted successfully  ' }).status(200);
};

export const changeGroup: typeValidation<{ id: string; switchedGroup: string }, {}> = async (
  req,
  res
) => {
  if (await studentNotExist(req.body.id!)) {
    return res.status(400).send({ message: 'Student is not existing in system !' });
  }

  await db.changeGroup(req.body.id!, req.body.switchedGroup!);
  return res
    .status(200)
    .send({ message: `student  has been moved to ${req.body.switchedGroup}  successfully  ` });
};

export const attendStudent: typeValidation<{ studentsIds: { id: string }[] }, {}> = async (
  req,
  res
) => {
  const studentsIds = req.body.studentsIds!;
  let numberOfInvalidStudents = 0;
  for (let i = 0; i < studentsIds.length; i++) {
    const student = studentsIds[i];
    console.log('this is the student ', student);

    if (await studentNotExist(student.id)) {
      res.status(400).send({ message: `Student :  ${student} is not existing in the system !` });
      numberOfInvalidStudents++;
      continue;
    } else if (await studentHasBeenAttended(student.id)) {
      /*
         To Solve Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client ,
         Here You Need To use return statement to solve this error.
         Error Is occurs Because Of Your res.status(400).json is executing and then your function is not going to stop. 
         Thats Why You Are Facing this error. So that Just add return statement in your request handler function Just like This: 
         return res.status(400).json
      */

        console.log("hello world ")

      numberOfInvalidStudents++;
      continue;
    }

    await db.attendStudent(crypto.randomUUID(), student.id);
  }

  if (numberOfInvalidStudents == studentsIds.length)
    return res.status(400).send({ message: 'all of your students have been attended already  ' });

  if (numberOfInvalidStudents > 0) {
    return res.status(200).send({
      message: `some of your students already attended and the other successfully attended `,
    });
  }
  return res.status(200).send({ message: `student has been attended successfully ` });
};



// here i want to add some more data in the response object : 
// like if he has paid this month or not and if he has a notes on him or not 
export const getTodaysAttendence: typeValidation<{group : string }, { students: student[] , studentsWhoHasBeenAttended: student[] }> = async (
  req,
  res
) => {
  let group = '' 
  if(req.body.group) {
    group = studentGroups.get(req.body.group)!
    return res.status(200).send({ students: await db.getTodaysAttendence(group) , studentsWhoHasBeenAttended: await db.getWhoHasAttendedToday(group) });

  }
  return res.status(200).send({ students: await db.getTodaysAttendence_() });
  
};





export const getMonthAttendence: typeValidation<{date : currentDate}, { students: student[] }> = async (req, res) => {
  if(!req.body.date) return res.status(400).send({message : "i need to specidy the date you want , please provide a date as an object "})
  return res.status(200).send({ students: await db.getMonthlyAttendence(req.body.date!) });
};

async function studentNotExist(id: string) {
  if (!(await db.getStudentById(id))) return true;
  return false;
}

async function studentHasBeenAttended(id: string) {
  if (await db.getStudentAttendenceToday(id)) {
    return true;
  }
  return false;
}


// TODOS : 
// add to student model : hour besides every student group 
// add getStudentByGroupAndHour() function in the handler  
