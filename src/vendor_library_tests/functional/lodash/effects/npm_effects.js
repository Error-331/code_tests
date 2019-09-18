'use strict';

// external imports
const {spawn} = require('child_process');
const {identity} = require('lodash/fp');

// local imports
const {SEMVER_NPM_VERSION_SANITIZE_REG_EXP} = require('./../constants/semver_regexp_constants');

// effects implementation
const loadNPMPackageCurrentVersionBy = (transformCallback, npmPackageName) => {
    return new Promise((resolve, reject) => {
        let versionString = null;
        const processLink = spawn('npm', ['view', npmPackageName, 'version']);

        processLink.stdout.on('data', data => versionString = data);
        processLink.stderr.on('data', reject);
        processLink.on('close', () => resolve(transformCallback(versionString.toString().replace(SEMVER_NPM_VERSION_SANITIZE_REG_EXP, ''))))
    });
};

const loadNPMPackageCurrentVersion = (npmPackageName) => loadNPMPackageCurrentVersionBy(identity, npmPackageName);

// export
exports.loadNPMPackageCurrentVersionBy = loadNPMPackageCurrentVersionBy;
exports.loadNPMPackageCurrentVersion = loadNPMPackageCurrentVersion;