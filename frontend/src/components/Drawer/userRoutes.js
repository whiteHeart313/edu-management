import StudDay from "../StudDay";
import AddStue from "../AddStu";
import Exam from "../Exam";
import { Routes, Route } from "react-router-dom";
import Delete from "../Delete";
import ChangeGroup from "../ChangeGruope";





export default function UserRutes(){
return (
    <Routes>
          <Route path="/" element={<StudDay />} />
          <Route path="/add" element={<AddStue />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="/delete" element={<Delete />} />
          <Route path="/Change" element={<ChangeGroup />} />
        </Routes>
)

}