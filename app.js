
var http = require('http');
var express = require('express');
var path = require('path');
var app = express();
//necesario para subir archivos
var fs = require('fs');

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser({ 
    keepExtensions: true, 
    uploadDir: __dirname + '/tmp',
    limit: 'mb'
  }));

  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Routes
app.get('/', function(req, res) {
  res.render('index');
  title : 'Formulario para subir archivos con NodeJS y Express'
});



app.post('/', function(req, res) {

  /*var homedir = __dirname + '/tmp/'+ req.files.myFile.originalFilename;
  console.log(homedir);
  req.files.myFile.path = homedir; 
  
 // req.files.myFile.ws.WriteStream.path = homedir;
 var x = req.files.myFile.ws.WriteStream;
  console.log(x);*/
  res.end();
});

app.get("/files",function(req,res){

  fs.readdir('/home/saa/Desktop/filesharing/tmp/', function (err, files) {
    console.log(files);
   if (err){
      throw err;
   }
    var results = new Array();

   for (var index in files) {

   	if(fs.lstatSync("/home/saa/Desktop/filesharing/tmp/"+ files[index]).isFile())
      results[index]=files[index];
   }

      res.render("files",{ results:results});

   });

});

app.post("/download",function(req,res){
	var name = req.body.file;
	var dir="/home/saa/Desktop/filesharing/tmp/";
	res.download(dir+name);
})

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

