// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
//6
const handler = (req, res) =>{
  const { date } = req.params;
  const dateArr = date.split('-');
console.log(typeof new Date(date), 'date')

if(dateArr.length > 1){
  if (new Date(date) !== "Invalid Date"){
    let unix;
    if (dateArr.length === 3){
      unix = Date.UTC(Number(dateArr[0]), Number(dateArr[1]), Number(dateArr[2]))
    }else if(dateArr.length === 2){
      unix = Date.UTC(Number(dateArr[0]), Number(dateArr[1]))
    }
    res.json({
      "unix": unix,
      "utc": new Date(date).toUTCString()
    });
  }else{
    res.json({
      "error": "Invalid Date"
    })
  }
  
}else{
  if (new Date(Number(date)) !== "Invalid Date"){
    res.json({
      "unix": Number(date),
      "utc": new Date(Number(date)).toUTCString()
    });
  }else{
    res.json({
      "error": "Invalid Date"
    })
  }
}
 
}

// const handler2 = (req, res) =>{
//   const { unix } = req.params;
//   console.log(unix)
//   res.json({
//     "unix": Number(unix),
//     "utc": new Date(Number(unix)).toUTCString()
//   });
// }
const handler3 = (req, res) =>{
  res.json({
    "unix": Date.now(),
    "utc": new Date().toUTCString()
  });
}
app.get("/api", handler3)
app.get("/api/:date", handler)
// app.get("/api/:unix", handler2)

// console.log(new Date(2015-12-25).toUTCString())


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
