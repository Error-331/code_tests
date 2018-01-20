'use strict';

import {allPass, and, anyPass, both, complement, cond, defaultTo, either, ifElse, isEmpty, not, or, pathSatisfies, propSatisfies, unless, until, when} from 'ramda';

export default async () => {
    // test data
    const deviceData1 = {id: 1, model: 'xhx23', isNotWorking: false, isPlayer: true, isSupportStreaming: false, log: [], isConnected: false};
    const deviceData2 = {id: 2, model: 'xjj55', isNotWorking: false, isPlayer: true, isSupportStreaming: false};
    const deviceData3 = {id: 3, model: 'xhh54', isNotWorking: true, isPlayer: true, isSupportStreaming: true};
    const deviceData4 = {id: 4, model: 'fd24', isNotWorking: false, isPlayer: false, isSupportStreaming: true};
    const deviceData5 = {id: 5, model: 'zh524', isNotWorking: false, isPlayer: false, isSupportStreaming: false, isConnected: true};
    const deviceData6 = {id: 6, model: 'yt87', isNotWorking: false, isPlayer: true, isSupportStreaming: false};
    const deviceData7 = {id: 7, model: 'xhx23', isNotWorking: false, isPlayer: true, isSupportStreaming: true};
    const deviceData8 = {id: 8, model: 'gfd23', isNotWorking: true, isPlayer: true, isSupportStreaming: true};

    const deviceLogData1 = ['timeout', 'fail', 'fail', 'timeout', 'success'];

    const deviceGroupData1 = {
        id: 1,
        name: 'test_group_1',


        devices: [deviceData1],
        screenShotsSettings: {
            diagnosticScreenshotsEnabled: true,
            formats: {
                png: 'supported',
                gif: 'not supported',
                tiff: 'not supported'
            }
        }
    };

    const deviceGroupData2 = {
        id: 2,
        name: 'test_group_2',

        devices: [deviceData2, deviceData3, deviceData4, deviceData5, deviceData8],
        screenShotsSettings: {
            diagnosticScreenshotsEnabled: true,
            formats: {
                png: 'supported',
                gif: 'supported',
                tiff: 'supported'
            }
        }
    };

    // allPass
    const isDeviceOfRightModel1 = device => device.model === 'xhx23';
    const isDeviceSupportStreaming = device => device.isSupportStreaming;

    const isCorrectPlayerDevice1 = allPass([isDeviceOfRightModel1, isDeviceSupportStreaming]);

    // and
    const isDeviceSupportStreamingAndIsWorking = device => and(!device.isNotWorking, device.isSupportStreaming);

    // anyPass
    const isDeviceOfRightModel2 = device => device.model === 'yt87';
    const isDeviceOfRightModelOrSupportStreaming = anyPass([isDeviceOfRightModel2, isDeviceSupportStreaming]);

    // both
    const isDeviceWorking = device => !device.isNotWorking;
    const isDeviceSupportWorkingAndStreaming = both(isDeviceWorking, isDeviceSupportStreaming);

    // complement
    const isEven = x => x % 2 === 0;
    const isOdd = complement(isEven);

    // cond
    const isNeededDevice1 = cond([
        [device => device.model === 'zh524', device => `${device.id}: right model`],
        [isDeviceSupportStreaming, device => `${device.id}: supports streaming`],
        [() => true, device => `${device.id}: device not needed`]
    ]);

    // defaultTo
    const isDeviceConnected = device => defaultTo(false)(device.isConnected);

    // either
    const isDeviceWorkingOrIsConnected = either(isDeviceConnected, isDeviceWorking);

    // ifElse
    const isNeededDevice2 = ifElse(
        device => device.model.indexOf('x') !== -1,
        device => `${device.model}: needed (newer series)`,
        device => `${device.model}: not needed (older series)`,
    );

    // not
    const isDeviceNotAPlayer = device => not(device.isPlayer);

    // or
    const isDeviceIsAPlayerOrSupportStreaming = device => or(device.isPlayer, device.isSupportStreaming);

    // pathSatisfies
    const isGIFSupported = gifFormat => gifFormat === 'supported';

    // propSatisfies
    const isGroupContainsMultipleDevices = devices => devices.length > 1;

    // unless
    const isDeviceCanBeConnected = unless(isConnected => isConnected === undefined, () => true);

    // until
    const deviceTestFinishPredicate = device => device.log.length > 5 || device.log[device.log.length - 1] === 'success';
    const testDeviceTry = (device) => {
        const deviceTestPossibleState = ['success', 'fail', 'timeout'];

        const stateIndex = Math.floor(Math.random() * Math.floor(3));
        const deviceState = deviceTestPossibleState[stateIndex];

        device.log.push(deviceState);
        return device;
    };

    const testDevice = until(deviceTestFinishPredicate, testDeviceTry);

    // when
    const normalizeDeviceLogValue = when(
        logValue => logValue !== 'success',
        logValue => 'attempt'
    );

    console.log('');
    console.log('"Logic" category');
    console.log('----------------');

    console.log('');
    console.log('AllPass examples:');
    console.log('');

    console.log('isCorrectPlayerDevice1(deviceData1) -', isCorrectPlayerDevice1(deviceData1));
    console.log('isCorrectPlayerDevice1(deviceData2) -', isCorrectPlayerDevice1(deviceData2));
    console.log('isCorrectPlayerDevice1(deviceData7) -', isCorrectPlayerDevice1(deviceData7));

    console.log('');
    console.log('And examples:');
    console.log('');

    console.log('isDeviceSupportStreamingAndIsWorking(deviceData1) -', isDeviceSupportStreamingAndIsWorking(deviceData1));
    console.log('isDeviceSupportStreamingAndIsWorking(deviceData2) -', isDeviceSupportStreamingAndIsWorking(deviceData2));
    console.log('isDeviceSupportStreamingAndIsWorking(deviceData3) -', isDeviceSupportStreamingAndIsWorking(deviceData3));
    console.log('isDeviceSupportStreamingAndIsWorking(deviceData4) -', isDeviceSupportStreamingAndIsWorking(deviceData4));

    console.log('');
    console.log('AnyPass examples:');
    console.log('');

    console.log('isDeviceOfRightModelOrSupportStreaming(deviceData1) -', isDeviceOfRightModelOrSupportStreaming(deviceData1));
    console.log('isDeviceOfRightModelOrSupportStreaming(deviceData3) -', isDeviceOfRightModelOrSupportStreaming(deviceData3));
    console.log('isDeviceOfRightModelOrSupportStreaming(deviceData6) -', isDeviceOfRightModelOrSupportStreaming(deviceData6));
    console.log('isDeviceOfRightModelOrSupportStreaming(deviceData7) -', isDeviceOfRightModelOrSupportStreaming(deviceData7));

    console.log('');
    console.log('Both examples:');
    console.log('');

    console.log('isDeviceSupportWorkingAndStreaming(deviceData1) -', isDeviceSupportWorkingAndStreaming(deviceData1));
    console.log('isDeviceSupportWorkingAndStreaming(deviceData3) -', isDeviceSupportWorkingAndStreaming(deviceData3));
    console.log('isDeviceSupportWorkingAndStreaming(deviceData4) -', isDeviceSupportWorkingAndStreaming(deviceData4));
    console.log('isDeviceSupportWorkingAndStreaming(deviceData7) -', isDeviceSupportWorkingAndStreaming(deviceData7));

    console.log('');
    console.log('Complement examples:');
    console.log('');

    console.log('isEven(2) -', isEven(2));
    console.log('isEven(3) -', isEven(3));
    console.log('isOdd(2) -', isOdd(2));
    console.log('isOdd(3) -', isOdd(3));

    console.log('');
    console.log('Cond examples:');
    console.log('');

    console.log('isNeededDevice1(deviceData1) -', isNeededDevice1(deviceData1));
    console.log('isNeededDevice1(deviceData5) -', isNeededDevice1(deviceData5));
    console.log('isNeededDevice1(deviceData7) -', isNeededDevice1(deviceData7));

    console.log('');
    console.log('DefaultTo examples:');
    console.log('');

    console.log('isDeviceConnected(deviceData1.isSupportStreaming) -', isDeviceConnected(deviceData1));
    console.log('isDeviceConnected(deviceData2.isSupportStreaming) -', isDeviceConnected(deviceData2));
    console.log('isDeviceConnected(deviceData5.isSupportStreaming) -', isDeviceConnected(deviceData5));

    console.log('');
    console.log('Either examples:');
    console.log('');

    console.log('isDeviceWorkingOrIsConnected(deviceData1) -', isDeviceWorkingOrIsConnected(deviceData1));
    console.log('isDeviceWorkingOrIsConnected(deviceData3) -', isDeviceWorkingOrIsConnected(deviceData3));
    console.log('isDeviceWorkingOrIsConnected(deviceData5) -', isDeviceWorkingOrIsConnected(deviceData5));
    console.log('isDeviceWorkingOrIsConnected(deviceData8) -', isDeviceWorkingOrIsConnected(deviceData8));

    console.log('');
    console.log('IfElse examples:');
    console.log('');

    console.log('isNeededDevice2(deviceData1) -', isNeededDevice2(deviceData1));
    console.log('isNeededDevice2(deviceData5) -', isNeededDevice2(deviceData5));
    console.log('isNeededDevice2(deviceData7) -', isNeededDevice2(deviceData7));

    console.log('');
    console.log('IsEmpty examples:');
    console.log('');

    console.log('isEmpty(["a", "b", "c"]) -', isEmpty(['a', 'b', 'c']));
    console.log('isEmpty([] -', isEmpty([]));
    console.log('isEmpty("")' ,isEmpty(''));
    console.log('isEmpty(null) -', isEmpty(null));
    console.log('isEmpty(undefined) -', isEmpty(undefined));
    console.log('isEmpty(NaN) -', isEmpty(NaN));
    console.log('isEmpty({}) -', isEmpty({}));
    console.log('isEmpty({testProp1: "testVal1"}) -', isEmpty({testProp1: 'testVal1'}));

    console.log('');
    console.log('IsEmpty examples:');
    console.log('');

    console.log('isDeviceNotAPlayer(deviceData1) -', isDeviceNotAPlayer(deviceData1));
    console.log('isDeviceNotAPlayer(deviceData2) -', isDeviceNotAPlayer(deviceData2));
    console.log('isDeviceNotAPlayer(deviceData4) -', isDeviceNotAPlayer(deviceData4));
    console.log('isDeviceNotAPlayer(deviceData5) -', isDeviceNotAPlayer(deviceData5));

    console.log('');
    console.log('Or examples:');
    console.log('');

    console.log('isDeviceIsAPlayerOrSupportStreaming(deviceData1) -', isDeviceIsAPlayerOrSupportStreaming(deviceData1));
    console.log('isDeviceIsAPlayerOrSupportStreaming(deviceData3) -', isDeviceIsAPlayerOrSupportStreaming(deviceData3));
    console.log('isDeviceIsAPlayerOrSupportStreaming(deviceData4) -', isDeviceIsAPlayerOrSupportStreaming(deviceData4));
    console.log('isDeviceIsAPlayerOrSupportStreaming(deviceData5) -', isDeviceIsAPlayerOrSupportStreaming(deviceData5));

    console.log('');
    console.log('PathSatisfies examples:');
    console.log('');

    console.log('pathSatisfies(isGIFSupported, ["screenShotsSettings", "formats", "gif"], deviceGroupData1) -', pathSatisfies(isGIFSupported, ['screenShotsSettings', 'formats', 'gif'], deviceGroupData1));
    console.log('pathSatisfies(isGIFSupported, ["screenShotsSettings", "formats", "gif"], deviceGroupData2) -',  pathSatisfies(isGIFSupported, ['screenShotsSettings', 'formats', 'gif'], deviceGroupData2));

    console.log('');
    console.log('PropSatisfies examples:');
    console.log('');

    console.log('propSatisfies(isGroupContainsMultipleDevices, "devices", deviceGroupData1) -', propSatisfies(isGroupContainsMultipleDevices, 'devices', deviceGroupData1));
    console.log('propSatisfies(isGroupContainsMultipleDevices, "devices", deviceGroupData2) -', propSatisfies(isGroupContainsMultipleDevices, 'devices', deviceGroupData2));

    console.log('');
    console.log('Unless examples:');
    console.log('');

    console.log('isDeviceCanBeConnected(deviceData1.isConnected) -', isDeviceCanBeConnected(deviceData1.isConnected));
    console.log('isDeviceCanBeConnected(deviceData2.isConnected) -', isDeviceCanBeConnected(deviceData2.isConnected));
    console.log('isDeviceCanBeConnected(deviceData3.isConnected) -', isDeviceCanBeConnected(deviceData3.isConnected));
    console.log('isDeviceCanBeConnected(deviceData5.isConnected) -', isDeviceCanBeConnected(deviceData5.isConnected));

    console.log('');
    console.log('Until examples:');
    console.log('');

    console.log('device log(before test) -', deviceData1.log);
    console.log('device log(after test) -', testDevice(deviceData1).log);

    console.log('');
    console.log('When examples:');
    console.log('');

    for (let logCounter1 = 0; logCounter1 < deviceLogData1.length; logCounter1++) {
        const logValue = deviceLogData1[logCounter1];
        const normalizedLogValue = normalizeDeviceLogValue(logValue);

        console.log('normalized log value -', normalizedLogValue);
    }

    console.log('');
    console.log('***');
    console.log('');
};