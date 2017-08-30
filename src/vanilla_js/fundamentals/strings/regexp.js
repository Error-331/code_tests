let testString = 'string::[Device].<Country>:"Russia"';

var newValue1 = testString.replace(
    new RegExp( "\\[[A-Za-z]*\\]", "gi" ),
    "[ENTITY]"
);

var newValue2 = testString.replace(
    new RegExp( "(\\[)([A-Za-z]*)(\\])", "gi" ),
    "$1ENTITY$3"
);

var newValue3 = testString.replace(
    new RegExp( "(\\[)([A-Za-z]*)(\\])", "gi" ),
    function($0, $1, $2, $3) {
        return $1 + 'ENTITY' + $3;
    }
);



console.log(newValue1);
console.log(newValue2);
console.log(newValue3);

// https://www.bennadel.com/blog/1742-using-regular-expressions-in-javascript-a-general-overview.htm

/*


 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", boolean::[Device].<UserBoolean>: "True"}boolean::[Device].<UserBoolean>: "True"string::[Device].<Country>: "Russia"string::[Device].<Owned By>: "IMS"string::[Device].<city>: "Moscow"__proto__: Object
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "False", number::[Device].<int677523749348>: "937720286611"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", boolean::[Device].<UserBoolean>: "True"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int745892311096>: "394803560792", number::[Device].<int818783564012>: "867139779840", string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2013-07-10T05:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", number::[Device].<int5758032758>: "259792379328"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", number::[Device].<int620505538830>: "674297741127", boolean::[Device].<UserBoolean>: "True"}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2012-04-10T06:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2015-08-10T14:49:54.000Z", number::[Device].<int977715848321>: "622981673461"}
 DevicesTagGroupsSelector.js?1770:20 {string::[sys].[Device].<Serial>: "A1G19U000528", string::[sys].[Device].<Name>: "", string::[sys].[Device].<Description>: "14853 - Winchester VA - hardwi", string::[sys].[Device].<CurrentSubscription.Status>: "", dateTime::[sys].[Device].<CurrentSubscription.ActivationDate>: null, …}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2011-08-28T04:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int197709891328>: "764434840978", string::[sys].[Device].<Serial>: "A1G19V001428", string::[sys].[Device].<Name>: "", string::[sys].[Device].<Description>: "IO30864 - JL265REPL HD1010w", string::[sys].[Device].<CurrentSubscription.Status>: "", …}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int328110003146>: "878175414268", string::[sys].[Device].<Serial>: "A1G19W001791", string::[sys].[Device].<Name>: "", string::[sys].[Device].<Description>: "14845 - Annapolis MD", string::[sys].[Device].<CurrentSubscription.Status>: "", …}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int398246831681>: "816405088418"}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int77875134005>: "507076414972", string::[sys].[Device].<Serial>: "A1G19S000388", string::[sys].[Device].<Name>: "", string::[sys].[Device].<Description>: "14854 - Landover MD", string::[sys].[Device].<CurrentSubscription.Status>: "", …}
 DevicesTagGroupsSelector.js?1770:20 {string::[sys].[Device].<Serial>: "A1G194000415", string::[sys].[Device].<Name>: "", string::[sys].[Device].<Description>: "14848 - Fairfax VA", string::[sys].[Device].<CurrentSubscription.Status>: "", dateTime::[sys].[Device].<CurrentSubscription.ActivationDate>: null, …}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", dateTime::[Device].<UserDateTime>: "2010-04-16T04:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "True", dateTime::[Device].<UserDateTime>: "2011-03-15T08:49:54.000Z", string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int156355739647>: "197189396114"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", string::[sys].[Device].<Serial>: "A1G19U001358", string::[sys].[Device].<Name>: "", …}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int73720766570>: "649106187416", boolean::[Device].<UserBoolean>: "False"}
 DevicesTagGroupsSelector.js?1770:20 {string::[sys].[Device].<Serial>: "A1G19C001969", string::[sys].[Device].<Name>: "", string::[sys].[Device].<Description>: "IO41030 - Richmond VA - HD4K2K", string::[sys].[Device].<CurrentSubscription.Status>: "", dateTime::[sys].[Device].<CurrentSubscription.ActivationDate>: null, …}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2014-06-12T03:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "True"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int752475124395>: "654536458238", string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2015-08-10T14:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", string::[sys].[Device].<Serial>: "L2D4D4000735", string::[sys].[Device].<Name>: "", …}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int14787556691>: "153860967461", boolean::[Device].<UserBoolean>: "False"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", number::[Device].<int716110272442>: "671196849089"}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "True"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", string::[sys].[Device].<Serial>: "L2D53N001367", string::[sys].[Device].<Name>: "", …}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2016-02-13T05:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2015-08-10T14:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "True", dateTime::[Device].<UserDateTime>: "2016-03-26T05:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2014-01-28T07:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "True"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int985229937552>: "925092539070"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "False"}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2012-07-16T02:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2016-06-28T02:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int241463518284>: "493522124207", string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", dateTime::[Device].<UserDateTime>: "2016-07-14T07:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int133642549780>: "907013262032"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int209241120098>: "732146047822", number::[Device].<int932625078772>: "972209319884"}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "True"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "False", number::[Device].<int751490575556>: "461865568323"}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2014-08-27T01:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", boolean::[Device].<UserBoolean>: "True"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", boolean::[Device].<UserBoolean>: "True", dateTime::[Device].<UserDateTime>: "2012-06-19T03:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2012-05-18T06:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[sys].[Device].<Serial>: "L4D66H002652", string::[sys].[Device].<Name>: "", string::[sys].[Device].<Description>: "Qube 4 D Ventures, Inc. - Dorv", string::[sys].[Device].<CurrentSubscription.Status>: "", dateTime::[sys].[Device].<CurrentSubscription.ActivationDate>: null, …}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", boolean::[Device].<UserBoolean>: "True"}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "False", number::[Device].<int677523749348>: "937720286611"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", boolean::[Device].<UserBoolean>: "True"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int745892311096>: "394803560792", number::[Device].<int818783564012>: "867139779840", string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2013-07-10T05:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", number::[Device].<int5758032758>: "259792379328"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", number::[Device].<int620505538830>: "674297741127", boolean::[Device].<UserBoolean>: "True"}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2012-04-10T06:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2015-08-10T14:49:54.000Z", number::[Device].<int977715848321>: "622981673461"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {string::[sys].[Device].<Serial>: "A1G19U000528", string::[sys].[Device].<Name>: "", string::[sys].[Device].<Description>: "14853 - Winchester VA - hardwi", string::[sys].[Device].<CurrentSubscription.Status>: "", dateTime::[sys].[Device].<CurrentSubscription.ActivationDate>: null, …}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2011-08-28T04:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int197709891328>: "764434840978", string::[sys].[Device].<Serial>: "A1G19V001428", string::[sys].[Device].<Name>: "", string::[sys].[Device].<Description>: "IO30864 - JL265REPL HD1010w", string::[sys].[Device].<CurrentSubscription.Status>: "", …}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int328110003146>: "878175414268", string::[sys].[Device].<Serial>: "A1G19W001791", string::[sys].[Device].<Name>: "", string::[sys].[Device].<Description>: "14845 - Annapolis MD", string::[sys].[Device].<CurrentSubscription.Status>: "", …}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int398246831681>: "816405088418"}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int77875134005>: "507076414972", string::[sys].[Device].<Serial>: "A1G19S000388", string::[sys].[Device].<Name>: "", string::[sys].[Device].<Description>: "14854 - Landover MD", string::[sys].[Device].<CurrentSubscription.Status>: "", …}
 DevicesTagGroupsSelector.js?1770:20 {string::[sys].[Device].<Serial>: "A1G194000415", string::[sys].[Device].<Name>: "", string::[sys].[Device].<Description>: "14848 - Fairfax VA", string::[sys].[Device].<CurrentSubscription.Status>: "", dateTime::[sys].[Device].<CurrentSubscription.ActivationDate>: null, …}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", dateTime::[Device].<UserDateTime>: "2010-04-16T04:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "True", dateTime::[Device].<UserDateTime>: "2011-03-15T08:49:54.000Z", string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int156355739647>: "197189396114"}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2015-08-10T14:49:54.000Z", string::[sys].[Device].<Serial>: "X0F2DK000408", string::[sys].[Device].<Name>: "", string::[sys].[Device].<Description>: "BME4546 - Smoot XD230 041913", string::[sys].[Device].<CurrentSubscription.Status>: "", …}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", dateTime::[Device].<UserDateTime>: "2013-06-24T06:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "True"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "False"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "True"}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2011-06-28T04:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2010-06-20T04:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", dateTime::[Device].<UserDateTime>: "2012-03-24T01:49:54.000Z", number::[Device].<int151791570661>: "243571297951"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2015-08-10T14:49:54.000Z", string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "False", number::[Device].<int237599284551>: "373924819629"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", string::[sys].[Device].<Serial>: "A1G19U001358", string::[sys].[Device].<Name>: "", …}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int73720766570>: "649106187416", boolean::[Device].<UserBoolean>: "False"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int265016916174>: "345457213523"}
 DevicesTagGroupsSelector.js?1770:20 {string::[sys].[Device].<Serial>: "A1G19C001969", string::[sys].[Device].<Name>: "", string::[sys].[Device].<Description>: "IO41030 - Richmond VA - HD4K2K", string::[sys].[Device].<CurrentSubscription.Status>: "", dateTime::[sys].[Device].<CurrentSubscription.ActivationDate>: null, …}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int150493689789>: "335556443267", boolean::[Device].<UserBoolean>: "True", string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2015-08-10T14:49:54.000Z", string::[sys].[Device].<Serial>: "X0H42E000133", string::[sys].[Device].<Name>: "", string::[sys].[Device].<Description>: "17586 - Bristol, PA", string::[sys].[Device].<CurrentSubscription.Status>: "", …}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "False"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int190208200869>: "943231547350"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "True"}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2015-08-10T14:49:54.000Z", boolean::[Device].<UserBoolean>: "False"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "False", string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", dateTime::[Device].<UserDateTime>: "2016-04-10T01:49:54.000Z", …}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2016-07-27T04:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "False", string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int901124790037>: "222229186560"}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int363678041400>: "954129151312", dateTime::[Device].<UserDateTime>: "2011-04-23T00:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "True", string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", dateTime::[Device].<UserDateTime>: "2016-06-11T05:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2013-06-12T05:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int785395182249>: "936003060427", string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", string::[sys].[Device].<Serial>: "X0H42H001051", …}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "True"}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2015-08-10T14:49:54.000Z", number::[Device].<int936854052427>: "64267509770"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {string::[sys].[Device].<Serial>: "X0H429000451", string::[sys].[Device].<Name>: "Briang", string::[sys].[Device].<Description>: "Ancient", string::[sys].[Device].<CurrentSubscription.Status>: "", dateTime::[sys].[Device].<CurrentSubscription.ActivationDate>: null, …}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2015-06-26T07:49:54.000Z", number::[Device].<int919895342174>: "866333120735"}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int789932516640>: "706774476662"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2014-06-12T03:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "False", number::[Device].<int822338753754>: "785556405346"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int319340117082>: "319622039159", number::[Device].<int724909698008>: "489926153421", boolean::[Device].<UserBoolean>: "True"}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "True", number::[Device].<int283597141963>: "487934810092"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int800583167876>: "530986019430"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2015-08-10T14:49:54.000Z", number::[Device].<int658956025397>: "661114003742", string::[sys].[Device].<Serial>: "X1H43X000573", string::[sys].[Device].<Name>: "", string::[sys].[Device].<Description>: "LMC Corporate XD1030", …}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "True"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int752475124395>: "654536458238", string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2015-08-10T14:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", string::[sys].[Device].<Serial>: "L2D4D4000735", string::[sys].[Device].<Name>: "", …}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int14787556691>: "153860967461", boolean::[Device].<UserBoolean>: "False"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", number::[Device].<int716110272442>: "671196849089"}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "True"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", string::[sys].[Device].<Serial>: "L2D53N001367", string::[sys].[Device].<Name>: "", …}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2016-02-13T05:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2015-08-10T14:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "True", dateTime::[Device].<UserDateTime>: "2016-03-26T05:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2014-01-28T07:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2015-08-10T14:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "True"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int985229937552>: "925092539070"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "False"}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2012-07-16T02:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2016-06-28T02:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int241463518284>: "493522124207", string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", dateTime::[Device].<UserDateTime>: "2016-07-14T07:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int133642549780>: "907013262032"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int209241120098>: "732146047822", number::[Device].<int932625078772>: "972209319884"}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "True"}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "True", string::[sys].[Device].<Serial>: "X2G2DH000624", string::[sys].[Device].<Name>: "", string::[sys].[Device].<Description>: "OLD AM6527 - Tart Lumber Compa", string::[sys].[Device].<CurrentSubscription.Status>: "", …}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "False", number::[Device].<int751490575556>: "461865568323"}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2014-08-27T01:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", boolean::[Device].<UserBoolean>: "True"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", boolean::[Device].<UserBoolean>: "True", dateTime::[Device].<UserDateTime>: "2012-06-19T03:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2012-05-18T06:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[sys].[Device].<Serial>: "L4D66H002652", string::[sys].[Device].<Name>: "", string::[sys].[Device].<Description>: "Qube 4 D Ventures, Inc. - Dorv", string::[sys].[Device].<CurrentSubscription.Status>: "", dateTime::[sys].[Device].<CurrentSubscription.ActivationDate>: null, …}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<ContentType>: "image all"}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2016-06-10T05:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", number::[Device].<int820341130255>: "963829468361", number::[Device].<int762872199609>: "49135079612", …}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int86362041286>: "900242070541"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", number::[Device].<int508920848421>: "373403823175"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "False", string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", boolean::[Device].<UserBoolean>: "True"}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "False", number::[Device].<int677523749348>: "937720286611"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", boolean::[Device].<UserBoolean>: "True"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int745892311096>: "394803560792", number::[Device].<int818783564012>: "867139779840", string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2013-07-10T05:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", number::[Device].<int5758032758>: "259792379328"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", number::[Device].<int620505538830>: "674297741127", boolean::[Device].<UserBoolean>: "True"}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2012-04-10T06:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2015-08-10T14:49:54.000Z", number::[Device].<int977715848321>: "622981673461"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {string::[sys].[Device].<Serial>: "A1G19U000528", string::[sys].[Device].<Name>: "", string::[sys].[Device].<Description>: "14853 - Winchester VA - hardwi", string::[sys].[Device].<CurrentSubscription.Status>: "", dateTime::[sys].[Device].<CurrentSubscription.ActivationDate>: null, …}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2011-08-28T04:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int197709891328>: "764434840978", string::[sys].[Device].<Serial>: "A1G19V001428", string::[sys].[Device].<Name>: "", string::[sys].[Device].<Description>: "IO30864 - JL265REPL HD1010w", string::[sys].[Device].<CurrentSubscription.Status>: "", …}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int328110003146>: "878175414268", string::[sys].[Device].<Serial>: "A1G19W001791", string::[sys].[Device].<Name>: "", string::[sys].[Device].<Description>: "14845 - Annapolis MD", string::[sys].[Device].<CurrentSubscription.Status>: "", …}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int398246831681>: "816405088418"}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int77875134005>: "507076414972", string::[sys].[Device].<Serial>: "A1G19S000388", string::[sys].[Device].<Name>: "", string::[sys].[Device].<Description>: "14854 - Landover MD", string::[sys].[Device].<CurrentSubscription.Status>: "", …}
 DevicesTagGroupsSelector.js?1770:20 {string::[sys].[Device].<Serial>: "A1G194000415", string::[sys].[Device].<Name>: "", string::[sys].[Device].<Description>: "14848 - Fairfax VA", string::[sys].[Device].<CurrentSubscription.Status>: "", dateTime::[sys].[Device].<CurrentSubscription.ActivationDate>: null, …}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", dateTime::[Device].<UserDateTime>: "2010-04-16T04:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "True", dateTime::[Device].<UserDateTime>: "2011-03-15T08:49:54.000Z", string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int156355739647>: "197189396114"}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2015-08-10T14:49:54.000Z", string::[sys].[Device].<Serial>: "X0F2DK000408", string::[sys].[Device].<Name>: "", string::[sys].[Device].<Description>: "BME4546 - Smoot XD230 041913", string::[sys].[Device].<CurrentSubscription.Status>: "", …}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", dateTime::[Device].<UserDateTime>: "2013-06-24T06:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "True"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "False"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "True"}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2011-06-28T04:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2010-06-20T04:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", dateTime::[Device].<UserDateTime>: "2012-03-24T01:49:54.000Z", number::[Device].<int151791570661>: "243571297951"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2015-08-10T14:49:54.000Z", string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "False", number::[Device].<int237599284551>: "373924819629"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", string::[sys].[Device].<Serial>: "A1G19U001358", string::[sys].[Device].<Name>: "", …}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int73720766570>: "649106187416", boolean::[Device].<UserBoolean>: "False"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int265016916174>: "345457213523"}
 DevicesTagGroupsSelector.js?1770:20 {string::[sys].[Device].<Serial>: "A1G19C001969", string::[sys].[Device].<Name>: "", string::[sys].[Device].<Description>: "IO41030 - Richmond VA - HD4K2K", string::[sys].[Device].<CurrentSubscription.Status>: "", dateTime::[sys].[Device].<CurrentSubscription.ActivationDate>: null, …}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int150493689789>: "335556443267", boolean::[Device].<UserBoolean>: "True", string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2015-08-10T14:49:54.000Z", string::[sys].[Device].<Serial>: "X0H42E000133", string::[sys].[Device].<Name>: "", string::[sys].[Device].<Description>: "17586 - Bristol, PA", string::[sys].[Device].<CurrentSubscription.Status>: "", …}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "False"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int190208200869>: "943231547350"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "True"}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2015-08-10T14:49:54.000Z", boolean::[Device].<UserBoolean>: "False"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "False", string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", dateTime::[Device].<UserDateTime>: "2016-04-10T01:49:54.000Z", …}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2016-07-27T04:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "False", string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int901124790037>: "222229186560"}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int363678041400>: "954129151312", dateTime::[Device].<UserDateTime>: "2011-04-23T00:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "True", string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", dateTime::[Device].<UserDateTime>: "2016-06-11T05:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2013-06-12T05:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int785395182249>: "936003060427", string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", string::[sys].[Device].<Serial>: "X0H42H001051", …}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "True"}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2015-08-10T14:49:54.000Z", number::[Device].<int936854052427>: "64267509770"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {string::[sys].[Device].<Serial>: "X0H429000451", string::[sys].[Device].<Name>: "Briang", string::[sys].[Device].<Description>: "Ancient", string::[sys].[Device].<CurrentSubscription.Status>: "", dateTime::[sys].[Device].<CurrentSubscription.ActivationDate>: null, …}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2015-06-26T07:49:54.000Z", number::[Device].<int919895342174>: "866333120735"}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int789932516640>: "706774476662"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2014-06-12T03:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "False", number::[Device].<int822338753754>: "785556405346"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int319340117082>: "319622039159", number::[Device].<int724909698008>: "489926153421", boolean::[Device].<UserBoolean>: "True"}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "True", number::[Device].<int283597141963>: "487934810092"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int800583167876>: "530986019430"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2015-08-10T14:49:54.000Z", number::[Device].<int658956025397>: "661114003742", string::[sys].[Device].<Serial>: "X1H43X000573", string::[sys].[Device].<Name>: "", string::[sys].[Device].<Description>: "LMC Corporate XD1030", …}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "True"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int752475124395>: "654536458238", string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2015-08-10T14:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", string::[sys].[Device].<Serial>: "L2D4D4000735", string::[sys].[Device].<Name>: "", …}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int14787556691>: "153860967461", boolean::[Device].<UserBoolean>: "False"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", number::[Device].<int716110272442>: "671196849089"}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "True"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", string::[sys].[Device].<Serial>: "L2D53N001367", string::[sys].[Device].<Name>: "", …}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2016-02-13T05:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2015-08-10T14:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "True", dateTime::[Device].<UserDateTime>: "2016-03-26T05:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2014-01-28T07:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2015-08-10T14:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "True"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int985229937552>: "925092539070"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "False"}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2012-07-16T02:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2016-06-28T02:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int241463518284>: "493522124207", string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", dateTime::[Device].<UserDateTime>: "2016-07-14T07:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int133642549780>: "907013262032"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int209241120098>: "732146047822", number::[Device].<int932625078772>: "972209319884"}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "True"}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "True", string::[sys].[Device].<Serial>: "X2G2DH000624", string::[sys].[Device].<Name>: "", string::[sys].[Device].<Description>: "OLD AM6527 - Tart Lumber Compa", string::[sys].[Device].<CurrentSubscription.Status>: "", …}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "False", number::[Device].<int751490575556>: "461865568323"}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2014-08-27T01:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", boolean::[Device].<UserBoolean>: "True"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", boolean::[Device].<UserBoolean>: "True", dateTime::[Device].<UserDateTime>: "2012-06-19T03:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2012-05-18T06:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[sys].[Device].<Serial>: "L4D66H002652", string::[sys].[Device].<Name>: "", string::[sys].[Device].<Description>: "Qube 4 D Ventures, Inc. - Dorv", string::[sys].[Device].<CurrentSubscription.Status>: "", dateTime::[sys].[Device].<CurrentSubscription.ActivationDate>: null, …}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<ContentType>: "image all"}
 DevicesTagGroupsSelector.js?1770:20 {dateTime::[Device].<UserDateTime>: "2016-06-10T05:49:54.000Z"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", number::[Device].<int820341130255>: "963829468361", number::[Device].<int762872199609>: "49135079612", …}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {}
 DevicesTagGroupsSelector.js?1770:20 {number::[Device].<int86362041286>: "900242070541"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS", number::[Device].<int508920848421>: "373403823175"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {boolean::[Device].<UserBoolean>: "False", string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}
 DevicesTagGroupsSelector.js?1770:20 {string::[Device].<city>: "Moscow", string::[Device].<Country>: "Russia", string::[Device].<Owned By>: "IMS"}


 */