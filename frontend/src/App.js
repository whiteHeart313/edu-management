import "./App.css";
import SideNav from "../src/components/Drawer";
import { Box } from "@mui/system";
import StudDay from "./components/StudDay";
import AddStue from "./components/AddStu";
import Exam from "./components/Exam"
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Delete from "./components/Delete";

function App() {
  // const [students, setStudents] = useState([]);

  // // get all products from the backend
  // useEffect(() => {
  //   fetch("http://localhost:8080/v1/getStudents")
  //     .then((res) => res.json())
  //     .then((data) => setStudents(data))
  // }, []);

  return (
    <div className="App">
      {/* {console.log(students)} */}
      <SideNav />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <div style={{ marginLeft: "210px", marginTop: "50px" }}>
          <Routes>
            <Route path="/" element={<StudDay />} />
            <Route path="/add" element={<AddStue />} />
            <Route path="/exam" element={<Exam />} />
            <Route path="/delete" element={<Delete />} />

          </Routes>
        </div>
      </Box>
    </div>
  );
}

export default App;
