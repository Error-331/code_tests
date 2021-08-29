'use strict';

const queryString = require('querystring');

const { MAX_POST_DATA_SIZE } = require('./../../constants/general_server_constants');

class PostDataClass {
    #rawData = null;
    #data = null;

    async #extractRawPOSTDataFromRequest(request) {
        return new Promise((resolve, reject) => {
            let postData = '';

            request.rawRequest.on('data', postDataChunk => {
                postData += postDataChunk;

                if (postData.length > MAX_POST_DATA_SIZE) {
                    reject('POST data is to big');
                }
            });

            request.rawRequest.on('end', function() {
                resolve(postData);
            });
        });
    };

    get rawData() {
        return this.#rawData;
    }

    get data() {
        return this.#data
    }

    getValueByKey(key) {
        return this.#data[key];
    }

    async parse(request) {
        this.#rawData = await this.#extractRawPOSTDataFromRequest(request);
        this.#data = queryString.parse(this.#rawData)
    }

    constructor() {}
}

module.exports = PostDataClass;
