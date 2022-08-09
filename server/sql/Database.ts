import { datastore } from '../datastore';

import { student } from '../types';
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
}
