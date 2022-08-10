import { datastore } from '../datastore';

import { student, attendence, Exam } from '../types';
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
    const today = await this.getDate();

    await this.db
      .run('INSERT INTO attendence (id, st_id , date ) VALUES (?,?,?)', randomId, studentId, today)
      .then(e => {
        console.log('student has been attended today');
      });
  }

  async getStudentAttendenceToday(studentId: string): Promise<attendence | undefined> {
    const today = await this.getDate();
    console.log(today);
    return this.db.get<attendence>(
      `SELECT * FROM attendence WHERE st_id = ? AND date = ?`,
      studentId,
      today
    );
  }

  async getDate(): Promise<string> {
    let ts = Date.now();

    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    console.log(year + '-' + month + '-' + date);
    return year + '-' + month + '-' + date;
  }

  // Exams Queries

  async createDailyExam(exams: Exam): Promise<void> {
    await this.db
      .run(
        'INSERT INTO dailyExams (id, st_id , date , examResult ) VALUES (?,?,?)',
        exams.id,
        exams.st_id,
        exams.date,
        exams.examResult
      )
      .then(e => {
        console.log('student has been attended today');
      });
  }
  createMonthlyExam(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getExamByMonth(): Promise<Exam[]> {
    throw new Error('Method not implemented.');
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
}
