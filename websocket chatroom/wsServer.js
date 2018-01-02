var ws = require('nodejs-websocket');
var PORT = 3000;

var count = 0;

var server = ws.createServer(function(conn){
	count++;
	conn.nickname = "用户" + count;
	var data = "系统消息："+conn.nickname + "comes in";

	var thisUser = conn.nickname

	broadCast('enter',data,thisUser)

	conn.on('text',function(str){
		var data=conn.nickname +"say："+ str;
		broadCast('message',data)
	})

	conn.on('close',function(code, reason){
		var data = "系统消息："+conn.nickname + "close";
		broadCast('leave',data)
	})

	conn.on('error',function(err){
		console.log("handle err")
        console.log(err)
	})



}).listen(PORT)


function broadCast(type,data,user='all'){
	var msg={}
	msg.type=type;
	msg.data=data;

	server.connections.forEach(function(conn){
		if(user==conn.nickname){
			msg.user=user;
		}
		conn.sendText(JSON.stringify(msg));
	})

}