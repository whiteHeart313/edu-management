import { axiosPublic } from "../api/axiosPublic";

export function testEndPoints(endpoint = ["/"], reqtype = "get", postData =[{}]) {
  let index =  0 
  for (let url of endpoint) {
    
    if (reqtype === "get") {
      axiosPublic
      .get(url)
        .then((res) => console.log(`${index } - get req res for : ${url}`,res.data))
        .then((err) => console.log(`${index } - get req error for : ${url}`,err));
    } else if (reqtype === "post") {
      postData ? axiosPublic
      .post(endpoint, postData[index])
      .then((res) => console.log(`${index} - post req for : ${url}`,res.data))
      .then((err) => console.log(`${index} - post req for : ${url}`,err)) 
      : console.log("no data provid req data for post req")
      
    }
    index ++
  }
}
