import { datastore } from '../datastore/datastore';

import { student, attendence, Exam, BooksMoney, money, MonthlyMoney, monthlyMoneyWithStudetData , currentDate} from '../types';
import { Database, open as sqliteOpen } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';

export class models implements datastore {
  private db!: Database<sqlite3.Database, sqlite3.Statement>;

  public async openDb() {
    // syntax only available for v. ^4.0.23
    this.db = await sqliteOpen({
      filename: path.join(__dirname, 'datafile.sqlite'),
      driver: sqlite3.Database,
    });
    await this.db.migrate({
      migrationsPath: path.join(__dirname, 'migrations'),
    });
    console.log('this is the db ', this.db);

    return this;
  }

  // Students Queries
  getAllStudent(): Promise<student[] | undefined> {
    return this.db.all(`SELECT * FROM students `);
  }

  async createStudent(student: student): Promise<void> {
    await this.db
      .run(
        'INSERT INTO students (id, name, phone, parentPhone, grade, group_ ,type ) VALUES (?,?,?,?,?,?,?)',
        student.id,
        student.name,
        student.phone,
        student.parentPhone,
        student.grade,
        student.group,
        student.type
      )
      .then(e => {
        console.log('added to the DB');
      });
  }
  async deleteStudent(id: string): Promise<void> {
    await this.db.run(`DELETE FROM students WHERE id = ? `, id);
  }

  getStudentbyPhone(phone: string): Promise<student | undefined> {
    return this.db.get<student>(`SELECT * FROM students WHERE phone = ? `, phone);
  }

  getStudentById(id: string): Promise<student | undefined> {
    return this.db.get(`SELECT * FROM students WHERE id = ? `, id);
  }
  async changeGroup(id: string, switchedGroup: string): Promise<void> {
    await this.db.run('UPDATE students SET group_ = ? WHERE id = ?', switchedGroup, id);
  }

  async attendStudent(randomId: string, studentId: string): Promise<void> {
    const today : currentDate = await this.getDate();

    await this.db
      .run('INSERT INTO attendence (id, st_id , day , month , year) VALUES (?,?,?,?,?)', randomId, studentId,today.day , today.month , today.year )
      .then(e => {
        console.log('added to DB');
      });
  }

  async getStudentAttendenceToday(studentId: string): Promise<attendence | undefined> {
    const today = await this.getDate();
    return this.db.get<attendence>(
      `SELECT * FROM attendence WHERE st_id = ? AND day = ?  AND month = ? AND year = ?`,
      studentId,
      today.day , 
      today.month , 
      today.year
    );
  }

  async getDate(): Promise<currentDate> {
    let ts = Date.now();

    let date_ob = new Date(ts);
    let day = date_ob.getDate().toString();
    let month = (date_ob.getMonth() + 1).toString();
    let year = date_ob.getFullYear().toString();
    console.log(year + '-' + month + '-' + day);
    const currentDate : currentDate = {
      day : day , 
      month : month , 
      year : year
    }
    return currentDate ; 
  }

  // Exams Queries

  async createDailyExam(exams: Exam): Promise<void> {
    await this.db
      .run(
        'INSERT INTO dailyExams (id, st_id , date , examResult ) VALUES (?,?,?,?)',
        exams.id,
        exams.st_id,
        exams.date,
        exams.examResult
      )
      .then(e => {
        console.log('added to DB');
      });
  }
  async createMonthlyExam(exams: Exam): Promise<void> {
    await this.db
      .run(
        'INSERT INTO monthlyExams (id, st_id , date , examResult ) VALUES (?,?,?,?)',
        exams.id,
        exams.st_id,
        exams.date,
        exams.examResult
      )
      .then(e => {
        console.log('added to DB in monthly exam ');
      });
  }
  async getExamByMonth(month: string): Promise<Exam[] | undefined> {
    return this.db.all(
      `SELECT  monthlyExams.examResult , students.name , students.grade
      FROM monthlyExams 
      INNER JOIN students 
      ON monthlyExams.st_id = students.id
      WHERE monthlyExams.date  = ?
     `,
      month
    );
  }

  getAllDailyExams(): Promise<Exam[]> {
    throw new Error('Method not implemented.');
  }
  getAllMonthlyExams(): Promise<Exam[]> {
    throw new Error('Method not implemented.');
  }
  getStudentDailyExams(): Promise<Exam[]> {
    throw new Error('Method not implemented.');
  }
  getStudentMonthlyExams(): Promise<Exam[]> {
    throw new Error('Method not implemented.');
  }

  /*
this is very costly  , 
every request to this endpoint is going to ask to perform this query 
  BETTER APPROACH : 

  is to have a cach to store the result of this query in at the beging of the day , which means that there is no stident has attended ..
  every request to this end endpoint is having students that has attended today , we just going to the cach and remove them from the cach 
  as DELETE function is a way faster that this complex query ....... 
**/

  async getTodaysAttendence(): Promise<student[] | undefined> {
    const today = await this.getDate();

    return this.db.all(
      `SELECT  *
      FROM students 
      WHERE NOT EXISTS (
       SELECT  * 
        FROM attendence 
      WHERE attendence.st_id = students.id AND attendence.day  = ? AND attendence.month  = ? AND attendence.year  = ?)
     `,
      today.day , 
      today.month , 
      today.year
    );
  }

  // async getMonthAttendence(): Promise<student[] | undefined> {
  //   const today = await this.getDate(false);

  //   return this.db.all(
  //     `SELECT  *
  //     FROM students 
  //     WHERE  EXISTS (
  //      SELECT  * 
  //       FROM attendence 
  //     WHERE attendence.st_id = students.id AND attendence.date  = ? )
  //    `,
  //     today
  //   );
  // }

  // money queries

  async getMonthlyMoney(): Promise<monthlyMoneyWithStudetData[] > {
    const currentMonth = await this.getDate()
    const month : string = currentMonth.month + '-' + currentMonth.year
    return this.db.all(
      `SELECT  
          monthlyMoney.date , 
          monthlyMoney.money , 
          students.name , 
          students.grade , 
          students.group_ ,
          students.type,  
          students.phone ,
          students.parentPhone 
      FROM monthlyMoney 
      INNER JOIN students 
      ON monthlyMoney.st_id = students.id
      WHERE monthlyMoney.date  = ?
     ` , 
     month
    );
  }
  getBooksMoney(): Promise<BooksMoney[] | undefined> {
    throw new Error('Method not implemented.');
  }
  PutMonthlyMoneyToStudents(monthlyMony: MonthlyMoney): Promise<void> {
    throw new Error('Method not implemented.');
  }
  PutBooksMoneyToStudets(BooksMony: money): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
