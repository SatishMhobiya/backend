//http module

import http from 'http';
import * as obj from './features.js';
import fs from "fs"
import path from "path";

console.log(path)

const home = fs.readFileSync("./index.html")
const server = http.createServer((req, res)=>{
    console.log("request received", req.url, req.method);
    if(req.url === "/"){
        res.end(home);
    }else if(req.url === "/about"){
        console.log(obj, obj.myFun());
        res.end("<h1> About Page </h1>");
    }else{
        res.end("<h1> Page not found </h1>");
    }
})

server.listen(5000, () => {
    console.log("server listening on port 5000....");
})