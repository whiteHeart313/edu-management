import { student } from '../../types';

export interface StudentDao {
  getAllStudent(): Promise<student[] | undefined>;
  createStudent(student: student): Promise<void>;
  deleteStudent(id: string): Promise<void>;
  getStudentById(id: string): Promise<student | undefined>;
  getStudentbyPhone(phone: string): Promise<student | undefined>;
  changeGroup(id: string, switchedGroup: string): Promise<void>;
}
