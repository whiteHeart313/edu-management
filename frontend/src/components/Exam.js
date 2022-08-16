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

export default function Exam() {
  const [ids, setIds] = React.useState([]);
  const [students, setStudents] = React.useState([]);


  React.useEffect(() => {
    axiosPublic
      .get("/getStudents")
      .then((res) => setStudents(res.data.students))
      .then((err) => console.log(err));
  }, []);

  const idsFormater = (ids) => {
    let arr = [];
    for (let i = 0; i < ids.length; i++) {
      console.log({ id: ids[i] });

      arr.push({ id: ids[i] });
    }
    return arr;
  };
  const examHandeler = () => {
    axiosPublic
      .post("/createExam", {
        studentsResults: [
          {
            st_id: "9dc091f0-1a1f-4f85-b8d8-340a71567f12",
            examResult: 5,
          },
        ] , 
        examType : true , // dialy eam 
        date : "7/9/2022"
        ,
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
        // checkboxSelection
        // onSelectionModelChange={(e) => {
        //   setIds(e);
        // }
    // }
        // isRowSelectable={(params) => {
        //   //  let x =  axiosPublic.
        //   //  post("/atttendStudent",{studentsIds:[{id:params.row.id}]})
        //   //  .then((res)=>  true)
        //   //  .then(err=>  false)
        //   return true;
        // }
    // }
      />
      <Button onClick={() => examHandeler()}> take exam ruselt </Button>
    </div>
  );
}
