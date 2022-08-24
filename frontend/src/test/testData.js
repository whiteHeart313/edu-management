export const postArr = ["/atttendStudent",
'/getExamByMonth' ,
'/addStudent', 
'/deleteStudent',
'/changeGroup',
'/createExam']




export const postReq = [
  {studentsIds:[{id:"007ebbc0-ba27-4c6f-a03a-962f7ab95b73"}],},
  {month:"7"},
  {
    name:"any hit ",
    phone:"0555552" ,
    parentPhone:"0465418334512" ,
    grade:" اولي ثانوي", 
    group:" اولي ثانوي",
    type:" اولي ثانوي",
  },
  {id:"1d42946f-fafa-4c1e-857a-90115cec3064"},
  { id: "007ebbc0-ba27-4c6f-a03a-962f7ab95b73",switchedGroup: "جمعه" },
  {
    "studentsResults": 
    [
      {
        "exam" : {
          "st_id": "007ebbc0-ba27-4c6f-a03a-962f7ab95b73",
          "examResult": 5
        } 
      }  
      
    ] , 
    "ExamType" : true  , 
    "date" : "7/9/2022"
    
}

];


export const getArr = ["/getStudents","getTodaysAttendence","getMonthlyMoneyForAllStudents"]
