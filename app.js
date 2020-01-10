const express=require('express');
const app = express();
var influxdb=require('influx-node')
var faker = require('faker');

const influx=new influxdb('localhost',9999,'Token yWD2zl_QXyOAWK5h6k-uPi64gshbwxPvqKcF1uiURJe-yVhfhKHt2uuiL45o2c4xONDxm0FdMLukx_5OOXH7VA==')
  var orgId='f9a810cf5d43d071';
  
  
  setInterval(()=>{
    var latitude=faker.fake("{{address.latitude}}")
    var longitude=faker.fake("{{address.longitude}}")
      influx.writeData(orgId,'api',`geostats latitude=${latitude},longitude=${longitude}`)
    .then(res=>{
      console.log(res)
    })
    .catch(error=>{
      console.log(error)
    })},10000)


    //const bodyParser = require('body-parser')

// var notification=''
// app.use(bodyParser.json({limit: '50mb'}));


  
  
// app.post('/alert',(req,res)=>{
//     //res.send(res)
//     console.log(req.body)
//     console.log(req.body._level)
//     //console.log(res)
//     notification=req.body._level + ' level is detected between '+ req.body._start +' - '+req.body._stop
//     res.send('sent success')
// })
// app.get('/alert',(req,res)=>{
//     res.send(notification)
// })
module.exports =app;