



export const postArr = ["/atttendStudent",
'/getExamByMonth' ,
'/addStudent', 
'/deleteStudent',
'/changeGroup',
'/createExam' , 
'/getTodaysAttendence' , 
'/putStudentMoney'
]




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

// this object could be simplified , i don't know why i did it like that ?!!!!!
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
 , 
 {group : "1"}  , 




 {
  StudentsMonthlyMoney : [
    {
      st_id : "43526e39-059a-4e24-80cd-c450e711561f" , 
      money : 300
    } , 

    {
      st_id : "14d3dddb-249a-48c0-9069-194362561854" , 
      money : 300
    }

    ]
 }

];


export const getArr = ["/getStudents","getMonthlyMoneyForAllStudents"]
