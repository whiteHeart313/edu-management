import * as React from "react";
import { DataGrid, GridEditSingleSelectCell,
  GridCellEditStopReasons } from "@mui/x-data-grid";
import { axiosPublic } from "../api/axiosPublic";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import  AtendedStud from  "./AtendedStu"



const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "الإسم", width: 130 },
  { field: "grade", headerName: "السنه", width: 130 },
  { field: "group_", headerName: "المجموعه", width: 130 },
  { field: "phone", headerName: "رقم الهاتف", type: "number", width: 150 },
  { field: "type", headerName: "المدرسه", width: 160 },
  { field: "mony1", headerName: "test mony input 1", width: 100 , editable: true,preProcessEditCellProps:(props)=>console.log(props), bgcolor:"'#376331'"},
  { field: "mony2", headerName: "test mony input 2", width: 100 , editable: true,preProcessEditCellProps:(props)=>console.log(props), stopCellEditMode:true,bgcolor:"'#376331'"},


];



export default function StudDay() {
  const [ids,setIds] = React.useState([])
  const [students, setStudents] = React.useState([]);
  const [relood,Setrelood] = React.useState(true)
  const [val,setVal] = React.useState("")

  React.useEffect(() => {
    axiosPublic
      .get("/getTodaysAttendence ")
      .then((res) => setStudents(res.data.students))
      .then((err) => console.log(err));
  }, [relood]);

  const idsFormater = (ids)=>{
    let arr = []
    for (let i =0 ;i<ids.length; i++) {
      console.log({id:ids[i]})

     arr.push({id:ids[i]})
    }
    return arr
  } 

  /////////////
  const handleValueChange = (val) => {
    console.log("handleValueChange",val)
    };
  /////////////
  const atttendHandeler = async () => {
    await axiosPublic
      .post("/atttendStudent", {
        studentsIds:idsFormater(ids) ,
      })
      .then((res) => console.log(res))
      .then((err) => console.log(err));
    Setrelood(!relood)

  };

  const handleCellEditStop = (params) => {
    if (true) {
    console.log(params)
    }
  };
  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
      sx={{
        boxShadow: 2,
        border: 2,
        borderColor: 'primary.light',
        '& .MuiDataGrid-cell:hover': {
          color: 'primary.main',
        },
      }}
      onValueChange={handleValueChange}
        rows={students}
        columns={columns}
        experimentalFeatures={{ newEditingApi: true }}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onCellEditStop={handleCellEditStop}
        onSelectionModelChange={(e) => {
         setIds(e)
        }}
        isRowSelectable={(params) => {return  true}}
      />
    
      <Button onClick={()=>atttendHandeler()}> take atttend </Button>

      <AtendedStud/>
    </div>
  );
}
