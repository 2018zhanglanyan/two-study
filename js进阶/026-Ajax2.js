/*
var http = require('http');

var hostname = '127.0.0.1';
var port = 3000;

var server = http.createServer(function(req, res){
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  // res.end('Hello World\n');
  res.end('Hello KuaZhu');
});

server.listen(port, hostname, function(){
  console.log("Server running at http://"+hostname+":"+port+"/");
});
*/


var http = require('http');

var server = http.createServer(function(req,res){
	console.log(req.url);
	res.end('Hello');
});

server.listen(3000,'127.0.0.1',function(){
	console.log('Server is running at http://127.0.0.1:3000');
})
