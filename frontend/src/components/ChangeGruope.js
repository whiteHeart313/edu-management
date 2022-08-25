import { axiosPublic } from "../api/axiosPublic";
import React from "react";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "الإسم", width: 130 },
  { field: "grade", headerName: "السنه", width: 130 },
  { field: "group_", headerName: "المجموعه", width: 130 },
  { field: "phone", headerName: "رقم الهاتف", type: "number", width: 150 },
  { field: "type", headerName: "المدرسه", width: 1 },
];

const groups = [
  {
    value: "السبت و الثلاثاء",
    label: "السبت و الثلاثاء",
  },
  {
    value: "الأحد و الأربعاء",
    label: "الأحد و الأربعاء",
  },
  {
    value: "الأثنين و الخميس",
    label: "الأثنين و الخميس",
  },
  {
    value: "الجمعة",
    label: "الجمعة",
  },
];

export default function ChangeGroup() {
  const [students, setStudents] = React.useState([]);
  const [id, setId] = React.useState("");
  const [group, setGroup] = React.useState("السبت و الثلاثاء");

  React.useEffect(() => {
    axiosPublic
      .get("/getStudents")
      .then((res) => setStudents(res.data.students))
      .then((err) => console.log(err));
  }, []);

  const handleSubmit = () => {
    axiosPublic
      .post("/deleteStudent", {
        id: id,
        switchedGroup: group,
      })
      .then((res) => {
        console.log(res);
        setId("");
      });
  };
  return (
    <Box sx={{ minWidth: 275, maxWidth: 575 }}>
      <Card>
        <React.Fragment>
          <CardContent>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 2.5, width: "40ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                {console.log(id)}
                <TextField
                  required
                  id="outlined-required"
                  label="id"
                  onChange={(e) => setId(e.target.value)}
                  value={id}
                />
                <TextField
                  id="outlined-select-group"
                  select
                  label="group"
                  value={group}
                  onChange={(e) => setGroup(e.target.value)}
                  helperText="Please select the group"
                >
                  {groups.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </Box>
          </CardContent>
        </React.Fragment>
      </Card>
      <Button onClick={() => handleSubmit()} variant="contained">
              change the Group for student
            </Button>
    </Box>
  );
}
