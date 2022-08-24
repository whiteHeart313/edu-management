import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import { axiosPublic } from "../api/axiosPublic";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";

const grades = [
  {
    value: "اول ثانوي",
    label: "اول ثانوي",
  },
  {
    value: "الثاني الثانوي",
    label: "الثاني الثانوي",
  },
  {
    value: "الثالث الثانوي",
    label: "الثالث الثانوي",
  },
];

const types = [
  {
    value: "لغات",
    label: "لغات",
  },
  {
    value: "عام",
    label: "عام",
  },
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
  }
];

export default function OutlinedCard() {
  const [grade, setGrade] = React.useState("اول ثانوي");
  const [type, setType] = React.useState("عام");
  const [group, setGroup] = React.useState("السبت و الثلاثاء");
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [parentPhone, setParentPhone] = React.useState("");

  const handleSubmit = () => {
    // e.preventDefault();
    axiosPublic
      .post("/addStudent", {
        name,
        phone,
        parentPhone,
        grade, //  اولي ثانوي ...
        group, // سبت حد اربع
        type, // لغات عام
      })
      .then((res) => {
        console.log(res);
        setPhone("");
        setParentPhone("");
        setName("");
        setGrade("");
        setGroup("");
        setType("");
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
                <TextField
                  required
                  id="outlined-required"
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {console.log(name)}
                <TextField
                  required
                  id="outlined-required"
                  label="phone"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                />
                <TextField
                  required
                  id="outlined-required"
                  label="parentPhone"
                  value={parentPhone}
                  onChange={(e) => setParentPhone(e.target.value)}
                />
                <TextField
                  id="outlined-select-grade"
                  select
                  label="grade"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  helperText="Please select the grade"
                >
                  {grades.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="outlined-select-type"
                  select
                  label="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  helperText="Please select the grade"
                >
                  {types.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="outlined-select-group"
                  select
                  label="group"
                  value={group}
                  onChange={(e) => setGroup(e.target.value)}
                  helperText="Please select the grade"
                >
                  {groups.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </Box>
            <Button onClick={() => handleSubmit()} variant="contained">
              Add student
            </Button>
          </CardContent>
        </React.Fragment>
      </Card>
    </Box>
  );
}
