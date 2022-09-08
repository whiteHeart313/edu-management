import { student , attendence, currentDate} from '../../types';

export interface StudentDao {
  getAllStudent(): Promise<student[] | undefined>;
  createStudent(student: student): Promise<void>;
  deleteStudent(id: string): Promise<void>;
  getStudentById(id: string): Promise<student | undefined>;
  getStudentbyPhone(phone: string): Promise<student | undefined>;
  changeGroup(id: string, switchedGroup: string): Promise<void>;
  attendStudent(randomId : string ,studentId: string): Promise<void> 
  // this is going to be a join between table students and attendence .... 
  getStudentAttendenceToday(studentId : string ): Promise<attendence | undefined> 
  getMonthlyAttendence(date : currentDate ): Promise<student[] | undefined >
  getWhoHasAttendedToday(group:string): Promise<student[] | undefined >
}
