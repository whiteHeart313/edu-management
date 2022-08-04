
import { student, typeValidation } from "../types"



export const  getStudents : typeValidation<{} , {students : student[]}> = async (req , res )=> {

    console.log("this is the req in getStudents function " , req.body)
    return  res.status(200).send({})

} 



