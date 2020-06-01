const net = require('net');
const parser = require('./parser.js');
const render = require('./render.js');
const images = require('images');

class Request{
    //method, url = host + port + path
    //body: k/v
    //headers

    constructor(options){
        this.method = options.method || "GET";
        this.host = options.host;
        this.port = options.port || 80;
        this.body = options.body || {};
        this.path = options.path || "/";
        this.headers = options.headers || {};

        if(!this.headers["Content-Type"]){
            this.headers["Content-Type"] = "application/x-www-form-urlencoded";

        }

        if(this.headers["Content-Type"] === "application/json"){
            this.bodyText = JSON.stringify(this.body);       
        }else if(this.headers["Content-Type"] = "application/x-www-form-urlencoded"){
            this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&');
        }

        this.headers['Content-Length'] = this.bodyText.length;

    }

    toString(){
        return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}\r
\r
${this.bodyText}`
    }
    
    send(conn){
        return new Promise((resolve, reject) => {
            const parser = new ResponseParser();
            if(conn){
                conn.write(this.toString()); 
            }else{
                conn = net.createConnection({
                    host: this.host,
                    port: this.port
                }, () => {
                    conn.write(this.toString());
                });
            }
            conn.on('data', (data) => {
                parser.receive(data.toString());
                // resolve(data.toString());
                if(parser.isFinished){
                    resolve(parser.response);
                }
                // console.log(parser.headers);
                conn.end();
            });
            conn.on('error', (err) => {
                reject(err);
                conn.end();
            });

        });
        

        
    }
}

class Response{

}

class ResponseParser{
    constructor(){
        this.WAITING_STATUS_LINE = 0;
        this.WAITING_STATUS_LINE_END = 1;
        this.WAITING_HEADER_NAME = 2;
        this.WAITING_HEADER_SPACE = 3;
        this.WAITING_HEADER_VALUE = 4;
        this.WAITING_HEADER_LINE_END = 5;
        this.WAITING_HEADER_BLOCK_END = 6;

        this.WAITING_BODY = 7;

        this.current = this.WAITING_STATUS_LINE;
        this.statusLine = "";
        this.headers = {};
        this.headerName = "";
        this.headerValue = "";

        this.bodyParser = null;
    }
    get isFinished(){
        return this.bodyParser && this.bodyParser.isFinished;
    }
    get response(){
        this.statusLine.match(/HTTP\/1.1 ([0-9]+)([\s\S]+)/);
        return {
            statusCode: RegExp.$1,
            statusText: RegExp.$2,
            headers: this.headers,
            body: this.bodyParser.content.join("")
        }
    }
    receive(string){
        for(let i = 0; i < string.length; i++){
            this.receiveChar(string.charAt(i));
        }
    }
    receiveChar(char){

        //处理响应行
        if(this.current === this.WAITING_STATUS_LINE){
            if(char === '\r'){
                this.current = this.WAITING_STATUS_LINE_END;
            }
            if(char === '\n'){
                this.current = this.WAITING_HEADER_NAME;
            }else{
                this.statusLine += char;
            }
        //waitingStatusLineEnd   
        }else if(this.current === this.WAITING_STATUS_LINE_END){
            if(char === '\n'){
                this.current = this.WAITING_HEADER_NAME;
            }
        //处理响应头
        //headerName    
        }else if(this.current === this.WAITING_HEADER_NAME){
            if(char === ':'){
                this.current = this.WAITING_HEADER_SPACE;   
            }else if(char === '\r'){
                this.current = this.WAITING_HEADER_BLOCK_END;
                if(this.headers['Transfer-Encoding'] === 'chunked'){
                   this.bodyParser = new TrunkedBodyParser(); 
                }    
            }else{
                this.headerName += char;
            }
        //headerSpace    
        }else if(this.current === this.WAITING_HEADER_SPACE){
            if(char === ' '){
                this.current = this.WAITING_HEADER_VALUE;
            }
        //headerValue    
        }else if(this.current === this.WAITING_HEADER_VALUE){
            if(char === '\r'){
                this.current = this.WAITING_HEADER_LINE_END;
                this.headers[this.headerName] = this.headerValue;
                this.headerName = "";
                this.headerValue = "";
            }else{
                this.headerValue += char;
            }
        //waiting_header_line_end    
        }else if(this.current === this.WAITING_HEADER_LINE_END){
            if(char === '\n'){
                this.current = this.WAITING_HEADER_NAME;
            }
        //waiting_header_block_end  
        }else if(this.current === this.WAITING_HEADER_BLOCK_END){
            if(char === '\n'){
                this.current = this.WAITING_BODY;
            }
        //waitingHeadingBody  
        }else if(this.current === this.WAITING_BODY){
            this.bodyParser.receiveChar(char);    
        }
    }
}

class TrunkedBodyParser{
    //状态机
    constructor(){
        this.WAITING_LENGTH = 0;
        this.WAITING_LENGTH_LINE_END = 1;
        this.READING_TRUNK = 2;
        this.WAITING_NEW_LINE = 3;
        this.WAITING_NEW_LINE_END = 4;

        this.length = 0;
        this.content = [];
        this.isFinished = false;

        this.current = this.WAITING_LENGTH;
    }
    receiveChar(char){
        // console.log(JSON.stringify(char));
        if(this.current === this.WAITING_LENGTH){
            if(char === '\r'){
                if(this.length === 0){
                    // console.log(this.content);
                    // console.log("//////");
                    this.isFinished = true;
                }
                this.current = this.WAITING_LENGTH_LINE_END;
            }else{
                this.length *= 16;
                this.length += parseInt(char, 16);
            }   
        }else if(this.current === this.WAITING_LENGTH_LINE_END){
            if(char === '\n'){
                this.current = this.READING_TRUNK;
            }  
        }else if(this.current === this.READING_TRUNK){
            this.content.push(char);
            this.length --;
            if(this.length === 0){
                this.current = this.WAITING_NEW_LINE;
            }
        }else if(this.current === this.WAITING_NEW_LINE){
            if(char === '\r'){
                this.current = this.WAITING_NEW_LINE_END;
            }
        }else if(this.current === this.WAITING_NEW_LINE_END){
            if(char === '\n'){
                this.current = this.WAITING_LENGTH;
            }
        }
    }
}


void async function(){
    let request = new Request({
            method: "POST",
            host: "127.0.0.1",
            port: 8087,
            path: '/',
            headers: {
                ["X-Foo2"]:"customed"
            },
            body: {
                name: 'luke'
            }
    });
    let response = await request.send();

    let dom = parser.parseHTML(response.body);

    let viewport = images(800, 600);

    render(viewport, dom.children[0].children[3].children[1].children[1]);

    viewport.save("viewport.jpg")
    
}();


/* const client = net.createConnection({ host:"localhost", port: 8087 }, () => {
  // 'connect' listener.
  console.log('connected to server!');
  let request = new Request({
      method: "POST",
      host: "localhost",
      port: 8087,
      path: '/',
      headers: {
        ["X-Foo2"]:"customer2"
      },
      body: {
          name: 'luke'
      }
  });

  console.log(request.toString());
  client.write(request.toString());
});
client.on('data', (data) => {
  console.log(data.toString());
  client.end();
});
client.on('end', () => {
  console.log('disconnected from server');
}); */