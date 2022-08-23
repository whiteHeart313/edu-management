import "./App.css";
import { Box } from "@mui/system";
import SideNav from "../src/components/Drawer";
import { testEndPoints } from './components/test';

const postArr = ["atttendStudent",]
const getArr = ["/getStudents","getTodaysAttendence","getMonthlyMoneyForAllStudents"]

function App() {
  testEndPoints(getArr, "get")
  return (
    <div className="App">
      <SideNav />
    </div>
  );
}
export default App;
