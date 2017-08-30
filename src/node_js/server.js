const http = require('http');
const port = 3000;

const commonResponse = `
                       <!doctype html>
                       <html>
                        <head>
                            <title>Hello world</title>
                        </head>
                        <body>
                            <h1>Test server started</h1>
                        </body>
                       </html>
                       `;

const requestHandler = (request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/html',
        'Content-Length': commonResponse.length
    });

    console.log(`Requested URL: ${request.url}`);
    response.end(commonResponse);
};

const server = http.createServer(requestHandler);

server.listen(port, (error) => {
    if (error) {
        return console.error('Error while starting server -', error);
    } else {
        console.log(`Server is listening on ${port}`);
    }
});