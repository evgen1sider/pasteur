const http = require('http');

const server = http.createServer((req, res) => {
    console.log("Url: " + req.url);
    console.log("Тип запиту: " + req.method);
    console.log("User-Agent: " + req.headers["user-agent"]);
    console.log("Все заголовки");
    console.log(req.headers);

    res.writeHead(200, {'Content-Type':'text/html'});
    res.end(`
        <!doctype>
        <html>
            <head>
                <meta name="viewport" content="width=device">
                <meta charset="utf-8">
                <title>Мій Сервер</title>
            </head>

            <body>
                <h1> Мій Сервак</h1>
            </body>
        </html>
    `);
});





server.listen(3000, () => console.log('Server pracyue'));