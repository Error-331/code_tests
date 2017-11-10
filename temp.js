
// https://gist.github.com/drueck/8480949
// https://medium.com/@GrahamWimbrow/anagrams-25dfcc8247a6

'hi';

function stringToObj(usrStr) {
    usrStr = usrStr.toLowerCase();
   // const testObj = {};

    for (let cnt1 = 0;  cnt1 < usrStr.length;  cnt1++) {
        const currentChar = usrStr.charAt(cnt1);

        if (currentChar === ' ' || currentChar === '\t') {
            continue;
        }

        testObj[currentChar] ? testObj[currentChar]++ : testObj[currentChar] = 1;


    }

    return testObj;
}

function testAnagram(usrStr1, usrStr2) {
    usrStr1 = usrStr1.toLowerCase();
    usrStr2 = usrStr2.toLowerCase();

    const testObj1 = stringToObj(usrStr1);
    const testObj2 = stringToObj(usrStr2);



    console.log(testObj1, testObj2);

    if (Object.keys(testObj1).length !== Object.keys(testObj2).length) {
        return false;
    }

    for (objKey in testObj1) {

        if (testObj2[objKey] === undefined || (testObj2[objKey] !== testObj1[objKey])) {
            return false;
        }
    }

    return true;
}

console.log(testAnagram('I am Lord	Voldemort', 'Tom Marvolo Riddle'));

 usrStr.split('').reduce((testObj, char) => {
    console.log('cg', char);
}, {});

 ///


const cache = {};

function apiCall(path: string): Promise<Data> {


}

function cleanCache(cacheRowsToDelete) {
    const cacheKeys = Object.keys(cache);
    const cnt1 = 0;

    for (cacheKey in cacheKeys) {
        if (cnt1 > cacheRowsToDelete) {
            return;
        }

        if (!cache[cachKey].isActive) {
            delete cache[cachKey];
            cnt1++;
        }
    }
}

funcion requestUsers(userId) {
    const reqPath = `/api/users/${userId}`;
    const cacheKeys = Object.keys(cache);

    if (cacheKeys.length >= 10) {
        cleanCache(1);
    }

    if (!cache[reqPath]) {
        const dataPromise = apiCall(reqPath);

        cache[reqPath] = {
            isActive: true,
            data: dataPromise;
    }

        dataPromise.then(_=> {
            cache[reqPath].isActive = false;
        })
    }

    return cache[reqPath];
}

requestUsers(12);


///

var regex = /[^a-z0-9]/gi;

var str1 = this.word1.replace(regex, ''),
    str2 = this.word2.replace(regex, '');

this.isAnagram = str1.length > 0 && str1.length === str2.length && (str1.toLowerCase().split('').sort().join('') === str2.toLowerCase().split('').sort().join(''));

///

function isAnagram(strFirst, strSecond) {

    if(strFirst.length != strSecond.length)
        return false;

    var tempString1 = strFirst.toLowerCase();
    var tempString2 = strSecond.toLowerCase();

    var matched = true ;
    var cnt = 0;
    while(tempString1.length){
        if(tempString2.length < 1)
            break;
        if(tempString2.indexOf(tempString1[cnt]) > -1 )
            tempString2 = tempString2.replace(tempString1[cnt],'');
        else
            return false;

        cnt++;
    }

    return matched ;

}

///

function isAnagram(strFirst, strSecond) {

    if(strFirst.length != strSecond.length)
        return false;

    var tempString1 = strFirst.toLowerCase();
    var tempString2 = strSecond.toLowerCase();

    var matched = true ;
    var cnt = 0;
    while(tempString1.length){
        if(tempString2.length < 1)
            break;
        if(tempString2.indexOf(tempString1[cnt]) > -1 )
            tempString2 = tempString2.replace(tempString1[cnt],'');
        else
            return false;

        cnt++;
    }

    return matched ;

}
