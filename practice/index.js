const http = require('http');
const dt = require('./myDateModule');

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('The date and time which is returned from the custom module \t' + dt.myDateTime());
    res.end();
}).listen(2000, ()=> {
    console.log("server Running successfully");
});