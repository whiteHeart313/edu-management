import { axiosPublic } from "../api/axiosPublic";
import React from "react";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";

const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "الإسم", width: 130 },
    { field: "grade", headerName: "السنه", width: 130 },
    { field: "group_", headerName: "المجموعه", width: 130 },
    { field: "phone", headerName: "رقم الهاتف", type: "number", width: 150 },
    { field: "type", headerName: "المدرسه", width: 160 },
  ];


export default function ChangeGroup() {
    const [students, setStudents] = React.useState([]);


    React.useEffect(() => {
      axiosPublic
        .get("/getStudents")
        .then((res) => setStudents(res.data.students))
        .then((err) => console.log(err));
    }, []);

    return (
        <>changeGroup</>
    )

}