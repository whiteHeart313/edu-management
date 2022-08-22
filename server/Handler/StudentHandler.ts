import { db } from '../datastore/datastore';
import { student, typeValidation, studentType } from '../types';
import crypto from 'crypto';

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
      res.status(400).send({ message: `Student : ${student} already attended !` });
      numberOfInvalidStudents++;
      continue;
    }

    await db.attendStudent(crypto.randomUUID(), student.id);
  }

  if (numberOfInvalidStudents == studentsIds.length)
    return res
      .status(400)
      .send({ message: 'no one of your students has been attended for various problems ' });
  return res.status(200).send({ message: `student has been attended successfully ` });
};

export const getTodaysAttendence: typeValidation<{}, { students: student[] }> = async (
  req,
  res
) => {
  return res.status(200).send({ students: await db.getTodaysAttendence() });
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
