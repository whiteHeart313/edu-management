import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { axiosPublic } from '../api/axiosPublic';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'الإسم', width: 130 },
  { field: 'grade', headerName: 'السنه', width: 130 },
  { field: 'group_', headerName: 'المجموعه', width: 130 },
  {field: 'phone', headerName: 'رقم الهاتف',type: 'number',width: 150,},
  {field: 'type',headerName: 'المدرسه',width: 160,},
];

const student =     [
  {
      "id": "51","name": "Mohamed Gebo ","phone": "01095581022",
      "parentPhone": "01015331077","grade": "9","group_": "group b","type": "لغات"
  },
  {
      "id": "24cade4a-8be5-4ad2-b16c-ccf097ca7ea1",
      "name": "Mohamed Gebo ",
      "phone": "01012222222",
      "parentPhone": "555555555",
      "grade": "9",
      "group_": "group G",
      "type": "لغات"
  }
]



export default function StudDay() {
  const [students,setStudents] = React.useState([{
    "id": "24cade4a-8be5-4ad2-b16c-ccf097ca7ea1",
    "name": "Mohamed Gebo ",
    "phone": "01012222222",
    "parentPhone": "555555555",
    "grade": "9",
    "group_": "group G",
    "type": "لغات"
}])

  React.useEffect( ()=>{
    axiosPublic
    .get("/getStudents")
    .then((res) => setStudents(res.data.students))
    .then((err)=>console.log(err))
    
  }
  ,[])
  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={students}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onSelectionModelChange={(e)=>{console.log(e[0]||"")}}
      />
    </div>
  );
}
