'use strict';

const {writeFileSync, existsSync, unlinkSync} = require('fs');

module.exports = async () => {

    const currentDate = new Date().toLocaleDateString();
    const currentUserName = process.env.USER;

    const blogHeaderFileName = `${currentDate}.md`;

    const blogHeader = `
        --Date: ${currentDate}
        --User: ${currentUserName}
        --Title:
        ---------------------------`;

    console.log('NodeJS "fs" examples');
    console.log('====================');
    console.log('');

    console.log(`Writing file: ${blogHeaderFileName} (blog header)`);
    console.log('');

    writeFileSync(`${blogHeaderFileName}`, blogHeader);

    console.log('');
    console.log(`File: ${blogHeaderFileName}, exists - ${existsSync(blogHeaderFileName)}`);
    console.log('');

    console.log('');
    console.log(`File: ${blogHeaderFileName}, is being removed`);
    console.log('');

    unlinkSync(blogHeaderFileName);

    console.log('');
    console.log(`File: ${blogHeaderFileName}, exists - ${existsSync(blogHeaderFileName)}`);
    console.log('');

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
};
