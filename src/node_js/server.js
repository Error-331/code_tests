const http = require('http');
const port = 3000;

const requestHandler = (request, response) => {
    console.log(`Requested URL: ${request.url}`);
    response.end('Test response message');
};

const server = http.createServer(requestHandler);

server.listen(port, (error) => {
    if (error) {
        return console.error('Error while starting server -', error);
    } else {
        console.log(`Server is listening on ${port}`);
    }
});