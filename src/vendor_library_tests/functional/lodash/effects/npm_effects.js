'use strict';

// external imports
const {spawn} = require('child_process');

// local imports

// effects implementation
const loadNPMPackageCurrentVersion = (npmPackageName) => {
    return new Promise((resolve, reject) => {
        let versionString = null;
        const processLink = spawn('npm', ['view', npmPackageName, 'version']);

        processLink.stdout.on('data', data => versionString = data);
        processLink.stderr.on('data', reject);
        processLink.on('close', () => resolve(versionString.toString()));
    });
};

// export
exports.loadNPMPackageCurrentVersion = loadNPMPackageCurrentVersion;