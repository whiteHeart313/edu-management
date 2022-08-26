import "./App.css";

import SideNav from "../src/components/Drawer";
import { testEndPoints } from './test/test';
import {postArr,getArr,postReq} from "./test/testData"
import {createUsers,names} from "./test/studintcreation"
import {deleteStudents} from "./test/deletStu"

function App() {
  // createUsers(names,20)
// console.log(testEndPoints(postArr, "post",postReq))
// console.log(">>>>>>>>>>>>get test ",testEndPoints(getArr,"get"))
// deleteStudents()
  return (
    <div className="App">
      <SideNav />
    </div>
  );
}
export default App;
