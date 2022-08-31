import * as React from "react";
import {DataGrid} from "@mui/x-data-grid";
import { axiosPublic } from "../api/axiosPublic";
import { Button } from "@mui/material";
import AtendedStud from "./AtendedStu";
import { useLocation } from "react-router";


const columns = [
  { field: "name", headerName: "الإسم", width: 150 },
  { field: "grade", headerName: "السنه", width: 130 },
  { field: "group_", headerName: "المجموعه", width: 130 },
  { field: "phone", headerName: "رقم الهاتف", type: "number", width: 150 },
  { field: "type", headerName: "المدرسه", width: 160 },
  {
    field: "mony1",
    headerName: "test mony input 1",
    width: 100,
    editable: true,
    preProcessEditCellProps: (props) => console.log("in cell", props),
    bgcolor: "'#376331'",
  },
  {
    field: "mony2",
    headerName: "test mony input 2",
    width: 100,
    editable: true,
    preProcessEditCellProps: (props) => console.log(props),
    stopCellEditMode: true,
    bgcolor: "'#376331'",
  },
];


export default function StudDay(props) {
  const location = useLocation();
  const [ids, setIds] = React.useState([]);
  const [students, setStudents] = React.useState([]);
  const [relood, Setrelood] = React.useState(true);
  const [val, setVal] = React.useState("");


  console.log("loc group", location.state.group)
  React.useEffect(() => {
    axiosPublic
      .post("/getTodaysAttendence",{group: location.state.group.toString()})
      .then((res) => {
        console.log(res.data.students);
        return setStudents(res.data.students);
      })
      .then((err) => console.log(err));
  }, [relood,location.state.group]);

  const idsFormater = (ids) => {
    let arr = [];
    for (let i = 0; i < ids.length; i++) {
      console.log({ id: ids[i] });

      arr.push({ id: ids[i] });
    }
    return arr;
  };

  /////////////
  const studintformater = (array) => {
    return array.map((elem) => {
      elem.mony1 = "00";
      elem.mony2 = "00";
      return elem;
    });
  };
  /////////////
  const atttendHandeler = async () => {
    await axiosPublic
      .post("/atttendStudent", {
        studentsIds: idsFormater(ids),
      })
      .then((res) => console.log(res))
      .then((err) => console.log(err));
    Setrelood(!relood);
  };

  const handleCellEditStop = (params) => {
    if (true) {
      console.log(params);
    }
  };
  return (
    <div style={{ height: 500, width: "100%" }}>
      {console.log()}
      <DataGrid
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: "primary.light",
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
        }}
       rowHeight={true ? 25 : null } 
        onValueChange={(params) => console.log("on", params)}
        rows={studintformater(students)}
        columns={columns}
        experimentalFeatures={{ newEditingApi: true }}
        pageSize={15}
        rowsPerPageOptions={[10]}
        checkboxSelection
        onCellEditStop={handleCellEditStop}
        onSelectionModelChange={(e) => {
          setIds(e);
        }}
        isRowSelectable={(params) => {
          return true;
        }}
      />

      <Button variant="contained" sx={{margin : 2, fontSize:20}} 
      onClick={() => atttendHandeler()}> take atttend </Button>

      <AtendedStud />
    </div>
  );
}
