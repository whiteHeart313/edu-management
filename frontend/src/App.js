import './App.css';
import SideNav from "../src/components/Drawer"
import { Box } from '@mui/system';
// import StudDay from "./components/StudDay"
import AddStue from "./components/AddStu"
function App() {
  return (
    <div className="App">
      <SideNav/>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >

      <div style={{marginLeft:"210px",marginTop:"50px"}}>
      {/* <StudDay/> */}
      <AddStue/>
      </div>
      </Box>
    </div>
  );
}

export default App;
