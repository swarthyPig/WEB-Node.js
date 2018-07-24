var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;

    //console.log(url.parse(_url, true).pathname);
    //console.log(queryData.id);
    //console.log(queryData.name);

    //    if (_url == '/') {
    //        //_url = '/index.html';
    //        title = 'Welcome';
    //    }
    //    if (_url == '/favicon.ico') {
    //        return response.writeHead(404);
    //    }
    //사용자가 접속한 url에 따라서 파일을 읽어줌
    //response.end(fs.readFileSync(__dirname + _url));

    if (pathname === '/') { // 루트로 들어왔다면
        if (queryData.id === undefined) {
            fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
                var title = 'Welcome';
                var description = 'Hello, Node.js';
                var template = `
            <!doctype html>
            <html>
            <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
            </head>
            <body>
            <h1><a href="/">WEB</a></h1>
            <ul>
                <li><a href="/?id=HTML">HTML</a></li>
                <li><a href="/?id=CSS">CSS</a></li>
                <li><a href="/?id=JavaScript">JavaScript</a></li>
            </ul>
            <h2>${title}</h2>
            <p>${description}</p>
            </body>
            </html>
            `;
                //response.end(queryData.id);
                response.writeHead(200); // 200: 성공적으로 전송했다.
                response.end(template);
            });

        } else {
            fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
              var title = queryData.id;
              var template = `
            <!doctype html>
            <html>
            <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
            </head>
            <body>
            <h1><a href="/">WEB</a></h1>
            <ul>
                <li><a href="/?id=HTML">HTML</a></li>
                <li><a href="/?id=CSS">CSS</a></li>
                <li><a href="/?id=JavaScript">JavaScript</a></li>
            </ul>
            <h2>${title}</h2>
            <p>${description}</p>
            </body>
            </html>
            `;
                //response.end(queryData.id);
                response.writeHead(200); // 200: 성공적으로 전송했다.
                response.end(template);
            });
        }
    } else {
        response.writeHead(404);
        response.end('Not found');
    }
});
app.listen(3000);
