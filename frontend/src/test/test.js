import { axiosPublic } from "../api/axiosPublic";


export function testEndPoints(endpoint = ["/"], reqtype = "get", postData =[{}]) {
  let index =  0 
  let reqArr = []
  for (let url of endpoint) {
    if (reqtype === "get") {
      axiosPublic
      .get(url)
        .then((res) => reqArr.push(`${index } - get req res for : ${url}`,res.data))
        .then((err) => reqArr.push(`${index } - get req error for : ${url}`,err));
    } else if (reqtype === "post") {
      postData ? axiosPublic
      .post(url, postData[index])
      .then((res) => reqArr.push(`${index} - post req for : ${url}`,res.data))
      .then((err) => reqArr.push(`${index} - post req  error for : ${url}`,err)) 
      :reqArr.push("no data provid req data for post req")
      
    }
    index ++
  }
  return reqArr
}


