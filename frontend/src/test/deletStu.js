import { axiosPublic } from "../api/axiosPublic"





const postDelet = async (id)=>{
    return await axiosPublic
    .post("/deleteStudent", {id})

}

export const gitAll = async ()=>{
    return await axiosPublic
    .get("/getStudents")
    .then((res) => {return res.data.students} )
}

export const deleteStudents = async(names,numberofUsers = 20 )=>{
   const allStu  = await gitAll()

   
    for (let i=0 ; i<allStu.length ; i++){
        await postDelet( allStu[i].id )
        console.log(i)
        
    }
}
