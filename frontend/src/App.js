import "./App.css";

import SideNav from "../src/components/Drawer";
// import { testEndPoints } from './test/test';
// import {postArr,getArr,postReq} from "./test/testData"


function App() {
// console.log(testEndPoints(postArr, "post",postReq))
// console.log(">>>>>>>>>>>>get test ",testEndPoints(getArr,"get"))
  return (
    <div className="App">
      <SideNav />
    </div>
  );
}
export default App;
