const http = require('http');
const fs = require('fs');
const path = require('path');
const { RSA_NO_PADDING } = require('constants');

const server = http.createServer((req,res) => {
    
    fs.readFile(path.join(filePath, 'index.html'), (err, content) => {
        if (err) {
            console.log(error);
        }
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.end(content);
    });
})

const PORT = process.env.PORT || 5000;
const HOSTNAME = '127.0.0.1';

server.listen(PORT, HOSTNAME, ()=> {
    console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
})
