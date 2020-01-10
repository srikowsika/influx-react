var http = require('http')
const csv2json = require('csvjson-csv2json');



module.exports = class InfluxDB {
    constructor(hostname,port,auth) {
      // this.hostname = hostname;
      // this.port=port;
      // this.auth=auth
      this.option = {
        hostname: hostname,
        port: port,
        path: '',
        method: '',
        headers: {
          Authorization:auth,  
        }
    }
  }
writeData(orgID,bucketName,writeData)
{
  
  this.option.path=`/api/v2/write?orgID=${orgID}&bucket=${bucketName}`
  this.option.method='POST'

  return new Promise((resolve, reject)=> {
  const writeRequest = http.request(this.option, (res) => {
    //res.setEncoding('utf8');
    res.on('data', (chunk) => {
      
    });
    var response={
      status:res.statusCode,
      message:"Data written succesfully"
    }
    res.on('end', () => {
      resolve(response)
      // return response 
    });
  });
  
  writeRequest.on('error', (e) => {
    reject(e);
    // return e;
  });
  
  writeRequest.write(writeData);
  writeRequest.end();
});
}


queryDB(orgID,query)
{
  
  var chuncks=[]
  this.option.path=`/api/v2/query?orgID=${orgID}`
  this.option.method='POST'

  var query= {query : query}

  return new Promise((resolve, reject)=> {
    const queryRequest = http.request(this.option, (res) => {
      // console.log(`QUERY STATUS: ${res.statusCode}`);
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        chuncks=chuncks+chunk
      });

      res.on('end', () => {
        //console.log(chuncks.length)
        if(chuncks.length <=2)
        {
          var response={
            status:204,
            message:"No result"
          }
          resolve(response)
        }
        else{
          var json=csv2json(chuncks, {parseNumbers: true});
          var response={
              status:res.statusCode,
              data:json,
              message:"Metrics sent successfully"
            }
          resolve(response) 
        }
      });
    });
    
    queryRequest.on('error', (e) => {
     reject(e) ;
    });
    queryRequest.write(JSON.stringify(query));
    queryRequest.end();
  });
  
}

orgCreation(name)
{
   var option = {
    hostname: this.hostname,
    port: this.port,
    path: `/api/v2/orgs`,
    method: 'GET',
    // headers: {
    //   Authorization:'Token dwDOl933D1B69un6OBPW48Y4tuRKMVNFYlxyw478Xf7jYVGO8wVtkuuv1QXurAllSRwTfRuLEKsmWgV--myaKQ==',  
    // },
  }
  var organisationName=name
  return new Promise((resolve, reject)=> {
    const createRequest = http.request(option, (res) => {
      //console.log(res)
       //console.log(`QUERY STATUS: ${res.statusCode}`);
      // console.log(` message: ${res.statusMessage}`);
      //res.setEncoding('utf8');
      res.on('data', (chunk) => {
        //chuncks=chuncks+chunk
      });
      res.on('end', () => {
        resolve('status:'+ res.statusCode + ' message:'+ res.statusMessage)
        //console.log(res)
       // var json=csv2json(chuncks, {parseNumbers: true});
        //console.log('End event')
        //resolve(json) 
        //console.log(res.statusCode)JSON.stringify(orgName)
      });
    });
    
    var orgName= {"name" : organisationName}
    createRequest.on('error', (e) => {
     reject(e) ;
    });
    //createRequest.write();
    createRequest.end();
  });
  
}

}