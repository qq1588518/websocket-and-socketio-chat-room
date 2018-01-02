var app = require('http').createServer()
var io = require('socket.io')(app);

var PORT = 3000;
var id=0
app.listen(PORT);


io.on('connection', function (socket) {
  id++;
  socket.nickname= '用户'+id;
  io.emit('enter',socket.nickname+'来了');
  socket.emit('user',socket.nickname)

  socket.on('message',function(str){
  	io.emit('message',socket.nickname+'说：'+str);
  })
  socket.on('disconnect',function(){
  	io.emit('leave',socket.nickname+'走了');
  })

});


console.log("websocket server listening on port" + PORT)