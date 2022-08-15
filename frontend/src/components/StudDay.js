import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { axiosPublic } from "../api/axiosPublic";
import { Button } from "@mui/material";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "الإسم", width: 130 },
  { field: "grade", headerName: "السنه", width: 130 },
  { field: "group_", headerName: "المجموعه", width: 130 },
  { field: "phone", headerName: "رقم الهاتف", type: "number", width: 150 },
  { field: "type", headerName: "المدرسه", width: 160 },
];

const student = [
  {
    id: "51",
    name: "Mohamed Gebo ",
    phone: "01095581022",
    parentPhone: "01015331077",
    grade: "9",
    group_: "group b",
    type: "لغات",
  },
  {
    id: "24cade4a-8be5-4ad2-b16c-ccf097ca7ea1",
    name: "Mohamed Gebo ",
    phone: "01012222222",
    parentPhone: "555555555",
    grade: "9",
    group_: "group G",
    type: "لغات",
  },
];

export default function StudDay() {
  const [ids,setIds] = React.useState([])
  const [students, setStudents] = React.useState([]);
  const [atttend, setAtttend] = React.useState([]);

  const SelectionHandeler = (id)=>{
    setAtttend((oldId)=>{
     return oldId.push({id:id})
     })

    }
  React.useEffect(() => {
    axiosPublic
      .get("/getStudents")
      .then((res) => setStudents(res.data.students))
      .then((err) => console.log(err));
  }, []);

  const idsFormater = (ids)=>{
    let arr = []
    for (let i =0 ;i<ids.length; i++) {
      console.log({id:ids[i]})

     arr.push({id:ids[i]})
    }
    return arr
  } 
  const atttendHandeler = () => {
    axiosPublic
      .post("/atttendStudent", {
        studentsIds:idsFormater(ids) ,
      })
      .then((res) => console.log(res))
      .then((err) => console.log(err));
  };
  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={students}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onSelectionModelChange={(e) => {
         setIds(e)
        }}
        isRowSelectable={(params) => {
        //  let x =  axiosPublic.
        //  post("/atttendStudent",{studentsIds:[{id:params.row.id}]})
        //  .then((res)=>  true)
        //  .then(err=>  false)
        return  true
         
          
        }}
      />
      {/* () => atttendHandeler() */}
      <Button onClick={()=>atttendHandeler()}> take atttend </Button>
    </div>
  );
}
