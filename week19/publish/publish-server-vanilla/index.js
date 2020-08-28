const http = require('http');
const fs = require('fs');
const unzip = require('unzipper');

const server = http.createServer((req, res) => {

    // let writeStream = fs.createWriteStream('../server/public/package');
    // req.pipe(writeStream);
    let writeStream = unzip.Extract({path:'../server/public'});
    req.pipe(writeStream);

    req.on('end', () => {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('okay'); 
    })
    
});

server.listen(8081);