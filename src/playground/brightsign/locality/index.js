'use strict';

import {chain, sortBy} from 'lodash';

export default async () => {
    console.log('BrightSign locality problem');
    console.log('===========================');
    console.log('');

    const selectedLocalities1 = sortBy(["/US/CO/Arapahoe County/", "/US/GA/", "/US/TX/Harris County/", "/US/CA/"], (localityName) => {return localityName.length;});
    let selectedLocalities = selectedLocalities1;

    const currentDevices = [
        {id: 1, name: "device 1", localityPath: "/CA/"},
        {id: 2, name: "device 2", localityPath: "/US/GA/Muscogee County/Columbus/"},
        {id: 3, name: "device 3", localityPath: "/US/CA/Los Angeles County/"},
        {id: 4, name: "device 4", localityPath: "/US/CA/San Mateo County/"},
        {id: 5, name: "device 5", localityPath: "/US/CO/Arapahoe County/Greenwood Village/"},
        {id: 6, name: "device 6", localityPath: "/US/TX/"},
        {id: 7, name: "device 7", localityPath: "/US/CO/Boulder County/"},
        {id: 8, name: "device 8", localityPath: "/US/MA/Suffolk County/"},
        {id: 9, name: "device 9", localityPath: "/US/MA/Suffolk County/Chelsea/"},
        {id: 10, name: "device 10", localityPath: "/US/NH/Hillsborough County/"},
        {id: 11, name: "device 11", localityPath: "/US/NH/Hillsborough County/Manchester/"}
    ];

    const deviceLocalityFilter = (deviceData) => {
        const selectedLocalitiesCount = selectedLocalities.length;

        for (let localityCounter1 = 0; localityCounter1 < selectedLocalitiesCount; localityCounter1++) {
            let localityPath = selectedLocalities[localityCounter1];

            if (deviceData.localityPath.indexOf(localityPath) === 0) {
                return true;
            }
        }

        return false;
    };

    const deviceLocalitySort = (deviceData) => {f
        return deviceData.localityPath.length;
    };

    let filteredDevices = chain(currentDevices).filter(deviceLocalityFilter).sortBy(deviceLocalitySort).value();

    console.log('fil:', filteredDevices);
/*

 var searchStringPermutations = this.state.searchValue ? stringService.createStringPermutations(this.state.searchValue.split(' ')) : [];


 .filter(function(item){
 var isItemMatch = this.state.searchValue ? false : true;

 _.each(searchStringPermutations, function(searchStringPermutation){
 var searchCombination = searchStringPermutation.join(" ").toLowerCase();
 var resultText = this._extractOptionCaption(item);

 resultText = resultText.toString().toLowerCase();

 if (resultText.indexOf(searchCombination) === 0) {
 isItemMatch = true;
 }
 }, this);

 return isItemMatch;
 }, this)


 createStringPermutations(stringsToPermute, recursiveMemo) {
 var permutations = [];
 var permutableString;
 var recursiveMemo = recursiveMemo || [];

 _.each(stringsToPermute, function(item, index) {
 permutableString = stringsToPermute.splice(index, 1);

 if (stringsToPermute.length === 0) {
 permutations.push(recursiveMemo.concat(permutableString));
 }

 var permutationResult = this.createStringPermutations(stringsToPermute, recursiveMemo.concat(permutableString));

 permutations = permutations.concat(permutationResult);
 stringsToPermute.splice(index, 0, permutableString[0]);
 }, this);

 return permutations;
 }


 var youngest = _
 .chain(users)
 .sortBy('age')
 .map(function(o) {
 return o.user + ' is ' + o.age;
 })
 .head()
 .value();

 */


    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}

/*


 0(pin): "/CA/"
 1(pin): "/US/CA/"
 2(pin): "/US/CO/"
 3(pin): "/US/CT/"
 4(pin): "/US/DE/"
 5(pin): "/US/FL/"
 6(pin): "/US/GA/"
 7(pin): "/US/IL/"
 8(pin): "/US/IN/"
 9(pin): "/US/KS/"
 10(pin): "/US/MA/"
 11(pin): "/US/MD/"
 12(pin): "/US/MO/"
 13(pin): "/US/NC/"
 14(pin): "/US/NH/"
 15(pin): "/US/NJ/"
 16(pin): "/US/NY/"
 17(pin): "/US/OH/"
 18(pin): "/US/OK/"
 19(pin): "/US/PA/"
 20(pin): "/US/SC/"
 21(pin): "/US/TN/"
 22(pin): "/US/TX/"
 23(pin): "/US/VA/"
 24(pin): "/US/VT/"
 25(pin): "/US/WA/"
 26(pin): "/US/CO/Arapahoe County/"
 27(pin): "/US/CO/Arapahoe County/Greenwood Village/"
 28(pin): "/US/CT/Hartford County/"
 29(pin): "/US/CT/Hartford County/Newington/"
 30(pin): "/US/DE/New Castle County/"
 31(pin): "/US/DE/New Castle County/Middletown/"
 32(pin): "/US/GA/Muscogee County/"
 33(pin): "/US/GA/Muscogee County/Columbus/"
 34(pin): "/US/IL/Cook County/"
 35(pin): "/US/IL/Cook County/Chicago/"
 36(pin): "/US/IN/Vanderburgh County/"
 37(pin): "/US/IN/Vanderburgh County/Evansville/"
 38(pin): "/US/MA/Suffolk County/"
 39(pin): "/US/MA/Suffolk County/Chelsea/"
 40(pin): "/US/NH/Hillsborough County/"
 41(pin): "/US/NH/Hillsborough County/Manchester/"
 42(pin): "/US/OH/Franklin County/"
 43(pin): "/US/OH/Franklin County/Columbus/"
 44(pin): "/US/SC/Richland County/"
 45(pin): "/US/SC/Richland County/Columbia/"
 46(pin): "/US/TX/Harris County/"
 47(pin): "/US/TX/Harris County/Spring/"
 48(pin): "/US/VT/Bennington County/"
 49(pin): "/US/"


 */