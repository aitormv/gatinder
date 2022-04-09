document.onload = function () {
	
	var io = require("socket.io");

	io.on("connection", function(socket) {
    	socket.on("send message", function(sent_msg, callback) {
			sent_msg = "[ " + getCurrentDate() + " ]: " + sent_msg;
			io.sockets.emit("update messages", sent_msg);
			callback();
    	});
	});

	function getCurrentDate() {
		var currentDate = new Date();
		var day = (currentDate.getDate()<10 ? '0' : '') + currentDate.getDate();
		var month = ((currentDate.getMonth() + 1)<10 ? '0' : '') + (currentDate.getMonth() + 1);
		var year = currentDate.getFullYear();
		var hour = (currentDate.getHours()<10 ? '0' : '') + currentDate.getHours();
		var minute = (currentDate.getMinutes()<10 ? '0' : '') + currentDate.getMinutes();
		var second = (currentDate.getSeconds()<10 ? '0' : '') + currentDate.getSeconds();
		return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
	};
	
};