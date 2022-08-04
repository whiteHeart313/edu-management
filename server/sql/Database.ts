import { datastore } from "../datastore";

import { student } from "../types";
import { Database, open as sqliteOpen } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';


export class models implements datastore {

    private db! : Database<sqlite3.Database, sqlite3.Statement> ;


    public async openDb () {
        // syntax only available for v. ^4.0.23
         this.db = await sqliteOpen({
        
            filename: path.join(__dirname, 'datafile.sqlite'),
            driver: sqlite3.Database, 
          });
          await this.db.migrate({
              migrationsPath : path.join(__dirname, 'migrations')
          })
          console.log("this is the db " , this.db)
   

        return this ; 
    }


    getAllStudent(): Promise<student[] | undefined> {
        return this.db.get(`SELECT * FROM students`  ); 
    }
    getStudent(id: string): Promise<student> {
        throw new Error("Method not implemented.");
    }
    createStudent(student: student): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deleteStudent(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

   

}