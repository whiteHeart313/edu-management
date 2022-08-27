import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { axiosPublic } from "../api/axiosPublic";



const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "الإسم", width: 130 },
  { field: "grade", headerName: "السنه", width: 130 },
  { field: "group_", headerName: "المجموعه", width: 130 },
  { field: "phone", headerName: "رقم الهاتف", type: "number", width: 150 },
  { field: "type", headerName: "المدرسه", width: 160 },

];



export default function AtendedStud() {
 
  const [students, setStudents] = React.useState([]);
  const [relood,Setrelood] = React.useState(true)
 

  React.useEffect(() => {
    axiosPublic
      .get("/getTodaysAttendence ")
      .then((res) => setStudents(res.data.students))
      .then((err) => console.log(err));
  }, [relood]);



  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
      sx={{
        boxShadow: 2,
        border: 2,
        // backgroundColor:'primary.light',
        borderColor: 'primary.light',
        '& .MuiDataGrid-cell:hover': {
          color: 'primary.main',
          
        },
        "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "rgba(255,0,255,0)",
            color: "rgba(255,0,0,0.7)",
            fontSize: 20
          }
      }}
        rows={students}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}
