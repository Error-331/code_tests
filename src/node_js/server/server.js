const http = require('http');
const path = require('path');
const fs = require('fs');

const {SERVER_PORT, HTML_PAGES_DIRECTORY_NAME, RESOURCES_DIRECTORY_NAME} = require ('./js/constants');

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

function getFile(localPath, res) {
// read the file in and return it, or return a 500 if it can't be read
    fs.readFile(localPath, function(err, contents) {
        if (!err) {
// use defaults instead of res.writeHead()
            res.end(contents);
        } else {
            res.writeHead(500);
            res.end();
        }
    });
}

const loadLocalFile = async (fileAbsolutePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileAbsolutePath, (error, fileContents) => {
            if (error) {
                return reject(error);
            } else  {
                return resolve(fileContents);
            }
        });
    });
};

const serveStaticFile = (request, response, pathParams, queryParams, fileName, fileExtension) => {
    let pathToFile;

    if (fileExtension === 'html') {
        pathToFile = `${__dirname}/${HTML_PAGES_DIRECTORY_NAME}/${fileName}.${fileExtension}`;
    } else {
        const pathParamsCopy = pathParams;
        pathParams.pop();

        const pathToDirectory = pathParamsCopy.length > 0 ? `/${pathParamsCopy.join('/')}/` : '/';
        pathToFile = `${__dirname}/${RESOURCES_DIRECTORY_NAME}${pathToDirectory}${fileName}.${fileExtension}`;
    }

    const fileContents = await loadLocalFile(pathToFile);
console.log(fileContents);
    //console.log('path to file:', pathToFile);
};

const requestHandler = (request, response) => {
    const requestURL = request.url.toLowerCase();
    const decodedRequestURL = decodeURIComponent(requestURL);
    const preparedRequestURL = decodedRequestURL[0] === '/' ? decodedRequestURL.substring(1) : decodedRequestURL;

    const [urlPathString, urlQueryString] = preparedRequestURL.split('?');
    const urlPathParams = urlPathString.split('/');
    const urlPathParamsCount = urlPathParams.length;

    const lastPathParamValue = urlPathParams[urlPathParamsCount - 1];
    const requestedFileExtension = path.extname(lastPathParamValue);

    if (requestedFileExtension) {
        const requestedFileName = path.basename(lastPathParamValue, requestedFileExtension);
        const preparedRequestedFileExtension = requestedFileExtension.substring(1);
        console.log('buzz', requestedFileExtension, preparedRequestedFileExtension);

        serveStaticFile(request, response, urlPathParams, urlQueryString, requestedFileName, preparedRequestedFileExtension);
    }


   // var filename = path.basename(req.url) || "index.html",
     //   ext = path.extname(filename),
// __dirname is a built-in variable containing the path where the code is running
       // localPath = __dirname + "/public/";

 /*   if (ext == ".html") {
        localPath += filename;
// verify that this file actually exists and load it, or else return a 404
        path.exists(localPath, function(exists) {
            if (exists) {
                getFile(localPath, res);
            } else {
                res.writeHead(404);
                res.end();
            }
        });
    }*/


    response.writeHead(200, {
        'Content-Type': 'text/html',
        'Content-Length': commonResponse.length
    });

    console.log(`Requested URL: ${request.url}`);
    response.end(commonResponse);
};

const server = http.createServer(requestHandler);

server.listen(SERVER_PORT, (error) => {
    if (error) {
        return console.error('Error while starting server -', error);
    } else {
        console.log(`Server is listening on ${SERVER_PORT}`);
    }
});

// response.writeHead(404, {'Content-Type': 'text/html'});