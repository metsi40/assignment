const http = require('http');
const https = require('https');
const {htmlParser} = require("./html_parser");


http.createServer(function (req, res) {
    if(req.url === "/"){
        let content = `<p> Call this api to get 6 latest stories from www.https://time.com/: localhost:8080/get-latest-stories or <a href="/get-latest-stories" target="_self"> click here</a>`
        res.write(content);
        res.end(); 
    } else if(req.url === "/get-latest-stories"){
        try{
            https.get('https://time.com', (resp) => {
                let data = '';
        
                resp.on('data', (chunk) => {
                    data += chunk;
                });
        
                resp.on('end', () => {
                    let result = htmlParser(data);
                    //console.log(JSON.stringify(result))
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(result)); 
                });
        
            }).on("error", (err) => {
                res.writeHead(500, {'Content-Type': 'text/html'});
                res.write(`${err.message}.`);
                res.end(); 
            });
        } catch(err){
            res.writeHead(500, {'Content-Type': 'text/html'});
            res.write(`${err.message}.`);
            res.end(); 
        }
    } else{
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.write(`${req.headers["host"]}${req.url} not found`);
        res.end(); 
    }
}).listen(8080);
