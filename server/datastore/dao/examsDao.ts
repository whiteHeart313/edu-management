

import { Exam} from '../../types';


export interface examsDao {

    createDailyExam(exams : Exam ): Promise<void>;
    createMonthlyExam(): Promise<void> ; 
    getExamByMonth() : Promise<Exam[]> ;
    getAllDailyExams(): Promise<Exam[]> ; 
    getAllMonthlyExams(): Promise<Exam[]> ; 
    getStudentDailyExams(): Promise<Exam[]> ; 
    getStudentMonthlyExams(): Promise<Exam[]> ; 

}