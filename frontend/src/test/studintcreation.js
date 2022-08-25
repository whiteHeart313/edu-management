import { axiosPublic } from "../api/axiosPublic"
import {all} from "./array-names"


export const names = all
function random_item(items)
{ 
return items[Math.floor(Math.random()*items.length)];    
}

const days = ["السبت و الثلاثاء","الجمعة","الأحد و الأربعاء","الأثنين و الخميس"]
const group = ["لغات","عام"]
const grade = [ "اول ثانوي","الثاني الثانوي","الثالث الثانوي"]

const postUser = async (name)=>{
    return await axiosPublic
    .post("/addStudent", {
        name :name,
        phone:`010307${random_item(name).charCodeAt() + random_item("qwertyhgfdsazxcvbnm").charCodeAt() }${random_item(name).charCodeAt() + random_item("qwertyhgfdsazxcvbnm").charCodeAt() }`,
        parentPhone:`0107${random_item(name).charCodeAt() + random_item("qwertyhgfdsazxcvbnnm").charCodeAt()}${random_item(name).charCodeAt() + random_item("qwertyhgfdsazxcvbnm").charCodeAt() }`,
        grade:random_item(grade), //  اولي ثانوي ...
        group :random_item(days), // سبت حد اربع
        type: random_item(group), // لغات عام
      }
    )

}


export const createUsers = async(names,numberofUsers = 20 )=>{
    for (let i=0 ; i<numberofUsers ; i++){
        const res = await postUser(`${ random_item(names) } ${random_item(names)}` )
        console.log(i)
        
    }
}
