import "./App.css";
import SideNav from "../src/components/Drawer";
import { Box } from "@mui/system";
import StudDay from "./components/StudDay";
import AddStue from "./components/AddStu";
import { useState, useEffect } from "react";

function App() {
  const [Products, setProducts] = useState([]);

  // get all products from the backend
  useEffect(() => {
    fetch("http://localhost:8080/v1/getStudents")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .then(console.log(Products));
  }, []);

  return (
    <div className="App">
      <SideNav />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <div style={{ marginLeft: "210px", marginTop: "50px" }}>
          <StudDay />
          {/* <AddStue/> */}
        </div>
      </Box>
    </div>
  );
}

export default App;
