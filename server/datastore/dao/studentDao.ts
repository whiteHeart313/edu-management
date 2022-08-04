import { student } from "../../types";




export interface StudentDao {

    
    getAllStudent():Promise<void> ; 
    getStudent(id : string) : Promise <student | undefined > 
    createStudent(student : student) : Promise<void> 
    deleteStudent(id : string)  : Promise<void> 
}