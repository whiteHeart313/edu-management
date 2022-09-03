

import { Exam, student} from '../../types';


export interface examsDao {

    createDailyExam(exams : Exam ): Promise<void>;
    createMonthlyExam(exams : Exam): Promise<void> ; 
    getExamByMonth(month : string ) : Promise<Exam[] | undefined> ;
    getAllDailyExams(): Promise<Exam[]> ; 
    getAllMonthlyExams(): Promise<Exam[]> ; 
    getStudentDailyExams(): Promise<Exam[]> ; 
    getStudentMonthlyExams(): Promise<Exam[]> ; 
    getTodaysAttendence(group :string ):Promise<student[] | undefined> ; 
    getTodaysAttendence_(): Promise<student[] | undefined> ; 

}