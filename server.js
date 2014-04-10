var express = require('express');
var app = express();

app.configure(function() {
	app.use(express.static(_dir+'public/'));
});

console.log("Phoenix Report Server Started at Port 8000.");

app.listen(8000);