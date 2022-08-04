
import { db } from "../datastore";
import { student, typeValidation } from "../types"



export const  getStudents : typeValidation<{} , {students : student[]}> = async (req , res )=> {
    const students : (student)[] | undefined = await  db.getAllStudent() ; 
    console.log("this is the req in getStudents function " , req.body)
    return  res.status(200).send({students : students})

} 



