
import {currentDate} from '../types';
  export const getDate = ()=> {

    let ts = Date.now();

    let date_ob = new Date(ts);
    let day = date_ob.getDate().toString();
    let month = (date_ob.getMonth() + 1).toString();
    let year = date_ob.getFullYear().toString();
    console.log(year + '-' + month + '-' + day);
    const currentDate : currentDate = {
      day : day , 
      month : month , 
      year : year
    }
    return currentDate ; 

  }