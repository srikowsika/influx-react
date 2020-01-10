const express=require('express');
const app = express();
 var influxdb=require('./timeseriespackage')


const bodyParser = require('body-parser')
const cors = require('cors');

var notification=[]
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors())

  const influx=new influxdb('localhost',9999,'Token yWD2zl_QXyOAWK5h6k-uPi64gshbwxPvqKcF1uiURJe-yVhfhKHt2uuiL45o2c4xONDxm0FdMLukx_5OOXH7VA==')
  var orgId='f9a810cf5d43d071';
  
  
  app.get(`/metrics/:field/:precision`,(req,res)=>{
   // console.log('kk')
    if(req.params.field==="both")
    {
      
      query=`data_1 = from(bucket:"api")|> range(start:${req.params.precision})|> filter(fn: (r) => r._measurement == "geostats" and r._field == "latitude") data_2 = from(bucket:"api")|> range(start:${req.params.precision})|> filter(fn: (r) => r._measurement == "geostats" and r._field =="longitude") join(tables: {d1: data_1, d2: data_2}, on: ["_time"])`
    }
    else{
      
      query=`from(bucket: \"api\")|> range(start:${req.params.precision})|> filter(fn: (r) => r._measurement == \"geostats\")|> filter(fn: (r) => r._field == \"${req.params.field}\")`
    }
    
    influx.queryDB(orgId,query)
      .then(response=>{
        res.send(response)
      })
      .catch(error=>{
        console.log(error)
      })
     })
  
  app.post('/alert',(req,res)=>{
    //res.send(res)
    //console.log(req.body)
    console.log(req.body._level)
    //console.log(res)
    var notifyMessage={
      "time":req.body._time,
      "level":req.body._level,
      "message": req.body._message
    }
    notification.push(notifyMessage)
    res.send('sent success')
    })
    app.get('/alert',(req,res)=>{
        res.send(notification)
    })
  
  
  
    // influx.createBucket(orgId,'apisamplkdle')
  // .then(res=>{
  //   console.log(res)
  // })
  // .catch(error=>{
  //   console.log(error)
  // })

  // const options = {
//   hostname: 'localhost',
//   port: 9999,
//   path: '/api/v2/signin',
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//      Authorization: "Basic c3Jpa293c2lrYTprb3dzaSAxOTk4",
//      Connection: 'keep-alive'
//   }
// }

// const req = http.request(options, (res) => {
//   console.log(`SIGNIN status: ${res.statusCode}`);
//   res.on('data', (chunk) => {
//     console.log(`BODY: ${chunk}`);
//   });
//   res.on('end', () => {
//     // setInterval(function(){
//     //   writeData()
//     // },30000)
//     var latitude=faker.fake("{{address.latitude}}")
//     var longitude=faker.fake("{{address.longitude}}")
//     console.log(latitude,longitude)
//      result= writeData('f9a810cf5d43d071','api','Token yWD2zl_QXyOAWK5h6k-uPi64gshbwxPvqKcF1uiURJe-yVhfhKHt2uuiL45o2c4xONDxm0FdMLukx_5OOXH7VA==',`geostats latitude=${latitude},longitude=${longitude}`)
//     //console.log(result)
//   });
// }) 
// req.on('error', (e) => {
//   console.error(`problem with request: ${e.message}`);
// });
// req.end();
// async function f() {

//   let promise = new Promise((resolve, reject) => {
//     setTimeout(() => resolve("done!"), 1000)
//   })
//   promise.then(res=>{
//     console.log(res)
//   })
//   promise.then(res=>{
//     console.log(res)
//   })
//   let promise1=new Promise((resolve, reject) => {
//       setTimeout(() => resolve("done2!"), 1000)
//     }).then(res=>{
//       console.log(res)
//       return res+'j'
//     }).then(res=>{
//       console.log(res);
//       return res+'jjkjk'
//     })
  
//   // return  0;
//   let result = await promise1;
//   console.log('ji'+result) // wait until the promise resolves (*)
//    return result
//   //console.log(result); // "done!"
//   //return result
// }

// let value = f();
// value.then(res=>{
//   console.log(res)
// })
 //console.log(value)
// value.then(re=>{
//   console.log(re)
// })
// value.catch(e=>{
//   console.log(e)
// })

module.exports =app;