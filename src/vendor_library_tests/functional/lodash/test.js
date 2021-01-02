// const b1 = '1.2.3 - 2.3.4 ||   <3.5.6  || 2.5.6 -   2.6.0 | 5.0.0';
//const b2 = '1.2.3 - 2.3.4 ||   >=3.5.6  || 2.5.6 -   2.6.0 | >=   1.2.3 <   2.4.0 | 5.0.0';
//const b = '>=2.1.0 || >=2.1.0   -   dev.2 || >=2.2.0-dev || >=2.3.0-dev || >=2.4.0-dev || >=2.5.0-dev || >=2.6.0-dev || >=2.7.0-dev || >=2.8.0-dev || >=2.9.0-dev || >= 3.0.0-dev || >= 3.1.0-dev';


// const {stubTrue, split, replace, identity, slice, over, map, equals, pipe, nth, concat, spread, takeWhile, gte, gt, range, size, cond, times, constant} = require('lodash/fp');





// console.log('test', determineMaxVersionFromRanges(null, '1.2.3-alpha.58', '1.2.3-alpha.56'));
//console.log(normalizeSemverVersion('7.5.2', '2.*.5'))



// git+ssh
// 7.0.0-beta.55
// github:brightsign/workerpool
// ^1.0.0-beta.3
// github:brightsign/resize-img

// lodash
// >= 7.2.5
// >= 5.2.5

// 7.2.5

// <= 2.4.5


//initModulesTraversingProcessQueue(executeChildProcessTask(dbType, dbConnection), pathsToTraverse)
//  .then(() => getDBEffects(dbType).importFromJSON(dbConnection,`${__dirname}/../../../../test.json`))
//  .then(() => getDBEffects(dbType).importNPMModulesVersionsFromJSON(dbConnection, `${__dirname}/../../../../npm_modules_versions.json`))
//  .then(() => populateMissingNPMModulesVersions(dbConnection))
//   .then(() => getDBEffects(dbType).exportToJSON(dbConnection))
//   .then(exportedJSON => writJSONToFile(`${__dirname}/../../../../semver_modules_versions.json`, exportedJSON))
//
//  */




/* .then(() => populateNPMModulesVersions(dbConnection))
 .then(() => getDBEffects(dbType).exportNPMModulesVersionsToJSON(dbConnection))
 .then(exportedJSON => writJSONToFile(`${__dirname}/../../../../npm_modules_versions.json`, exportedJSON))
 .then(() => getDBEffects(dbType).exportToJSON(dbConnection))
 .then(exportedJSON => writJSONToFile(`${__dirname}/../../../../semver_modules_versions.json`, exportedJSON))
 .then(() => {
     getReportQueryWrappers(dbType).selectRootModulesFullData(dbConnection).then((data) => {

         console.log('fs', data);
     })
 })*/

// '>=2.1.0 || >=2.1.0-dev || >=2.2.0-dev || >=2.3.0-dev || >=2.4.0-dev || >=2.5.0-dev || >=2.6.0-dev || >=2.7.0-dev || >=2.8.0-dev || >=2.9.0-dev || >= 3.0.0-dev || >= 3.1.0-dev'


/*  getDBEffects(dbType)
      .importFromJSON(dbConnection,`${__dirname}/../../../../test.json`).then(() => {
      getReportQueryWrappers(dbType).selectRootModulesFullData(dbConnection).then((data) => {
          console.log('fs', data);
      })
  });*/


////




/*  console.log('Closing DB connection...');
  yield getDBEffects(dbType).closeConnectionToDB(dbConnection);*/