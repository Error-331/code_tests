const assert = require('assert').strict;

const ServerRouterClass = require('./../js/classes/server_router_class');

// test data starts here
const rootHandlerReturnValue = 'main_root_path';

const testRawRoutesData1 = [
    { path: 'route3/{files*}', handler: () => {} },
    { path: '/', handler: () => rootHandlerReturnValue },
    { path: '/hello/{user}', handler: () => {} },
    { path: '/hello/{user?}   ', handler: () => {} },
    { path: ' /{any*}   ', handler: () => {} },
    { path: '/{files*2}', handler: () => {} },
    { path: '   /{files*}', handler: () => {} },

    { path: /\.[^.\\/:*?"<>|\r\n]+$/, handler: () => {} },

    { path: 'route3/sub1/sub2/sub3/{files*}', handler: () => {} },
    { path: 'route3/sub1/sub2/sub3', handler: () => {} },
    { path: 'route3/sub1/sub2/sub3/sub4', handler: () => {} },
    { path: 'route3/sub1/red5/sub3/sub4', handler: () => {} },
    { path: 'route3/sub3/sub2/sub3/sub4', handler: () => {} },
    { path: 'route3/sub1/sub2/sub3/{file}', handler: () => {} },
    { path: 'route3/sub1/{file}/sub3/sub4', handler: () => {} },
    { path: 'route3/sub1/sub2/sub3/{file?}', handler: () => {} },

    { path: 'route3/sub1/{files*}', handler: () => {} },
    { path: '/route1/sub1/sub2', handler: () => {} },

    { path: /aa(b-c).*$/, handler: () => {} },
    { path: 'route3/sub1/{file}/sub3/sub4', handler: () => {} },
    { path: 'route3/sub1/{file}/{red}/sub4', handler: () => {} },
    { path: 'route3/sub3/{file}/{red}/sub4', handler: () => {} },

    { path: 'route4/{file}/{name*}', handler: () => {} },
    { path: 'route4/{file}/sub2', handler: () => {} },
    { path: 'route4/{file}/{name?}', handler: () => {} },
    { path: 'route4/sub1/sub2', handler: () => {} },

    { path: '/route2/sub1/sub2', handler: () => {} },
    { path: '/sub1/sub2/route1', handler: () => {} },

    { path: 'route3/{files?}', handler: () => {} },

    { path: 'route3/sub1/sub2', handler: () => {} },
];

function checkHandlerData(handlerData, method, path, handlerReturnValue) {
    assert.strictEqual(handlerData.method, method);
    assert.strictEqual(handlerData.path, path);

    if (typeof handlerData.handler === 'function') {
        assert.strictEqual(handlerData.handler(), handlerReturnValue);
    } else {
        assert.strictEqual(handlerData.handler, handlerReturnValue);
    }
}

function testRoutesTreeCase1() {
    const testRouter = new ServerRouterClass(testRawRoutesData1);
    const routerGETTree = testRouter.routesTrees.get('get');

    const rootNode = routerGETTree.root;

    checkHandlerData(rootNode.data, 'get', '/', rootHandlerReturnValue);

   // console.log(rootNode.data);

    for (const child of rootNode.children) {
        console.log(child.data);
    }
}


testRoutesTreeCase1();
