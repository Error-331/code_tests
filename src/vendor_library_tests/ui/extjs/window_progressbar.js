let progressBarExt = null;
let progressBarContainerExt = null;
let progressBarWindowExt = null;

const isArray = (input) => {
    return (
        input instanceof Array ||
        Object.prototype.toString.call(input) === '[object Array]'
    );
};

const isString = (input) => {
    return typeof input === 'string';
}

const isNil = (value) => {
    if (value === undefined || value === null) {
        return true;
    }

    return false;
};

const isNullOrEmpty = (value) => {
    if (isNil(value)) {
        return true;
    }

    if (isString(value)) {
        return value.length === 0;
    } else if (isArray(value)) {
        return value.length === 0;
    }

    return false;
};

function createProgressBarExt() {
    return Ext.create('Ext.Progress', {
        shadow: true,
        width: '100%',
        text: 'Loading...',
        value: 0
    });
}

function createProgressBarContainerExt(progressBar) {
    return Ext.create('Ext.Container', {
        extend: 'Ext.Container',
        xtype: 'progress-basic',

        layout: 'center',

        items: [
            progressBar
        ]
    });
}

function createProgressBarWindowExt(progressBarContainer) {
    return Ext.create('Ext.window.Window', {
        title: null,

        width: 500,
        minHeight: 'auto',

        header: false,
        frame: false,
        resizable: false,
        closable: false,
        modal: true,

        autoDestroy: true,

        items: [
            progressBarContainer
        ]
    });
}

function createProgressDialogBoxPartialsExt() {
    if (
        isNullOrEmpty(progressBarExt) ||
        isNullOrEmpty(progressBarContainerExt) ||
        isNullOrEmpty(progressBarWindowExt)
    ) {
        progressBarExt = createProgressBarExt();
        progressBarContainerExt = createProgressBarContainerExt(progressBarExt);
        progressBarWindowExt = createProgressBarWindowExt(progressBarContainerExt);
    }
}

function clearProgressBarDialogBoxExt() {
    createProgressDialogBoxPartialsExt();

    updateProgressBarDialogBoxExt({ test: 'Loading...', value: 0 })
}

function getProgressDialogBoxExt() {
    createProgressDialogBoxPartialsExt();
    return progressBarWindowExt;
}

function updateProgressBarDialogBoxExt(options = {}) {
    const {
        text = 'Loading...',
        value = 0,
    } = options;

    createProgressDialogBoxPartialsExt();

    progressBarExt.setText(text);
    progressBarExt.setValue(value);
}

function showProgressDialogBoxExt() {
    getProgressDialogBoxExt().show();
}

function hideProgressDialogBoxExt() {
    getProgressDialogBoxExt().hide();
}

function updateMapReduceProgressDialogBoxExt(stage) {
    let text = 'Pending...';
    let value = 0;

    switch(stage) {
        case 'BUSY': {
            text = 'Waiting in the queue...';
            value = 0.1;

            break;
        }

        case 'GET_INPUT': {
            text = 'Gathering input data...';
            value = 0.2;

            break;
        }

        case 'MAP': {
            text = 'Processing data...';
            value = 0.4;

            break;
        }

        case 'SHUFFLE': {
            text = 'Shuffling data...';
            value = 0.6;

            break;
        }

        case 'REDUCE': {
            text = 'Combining result data...';
            value = 0.8;

            break;
        }

        case 'SUMMARIZE': {
            text = 'Writing CSV data to a file...';
            value = 1;

            break;
        }

        default: {
            text = 'Pending...';
            value = 0;
        }
    }

    updateProgressBarDialogBoxExt({text, value});
}

showProgressDialogBoxExt();

const states = ['BUSY', 'GET_INPUT', 'MAP', 'SHUFFLE', 'REDUCE', 'SUMMARIZE']
let cnt = 0;

let intervalId = setInterval(() => {
    cnt++;

    updateMapReduceProgressDialogBoxExt(states[cnt]);

    if (cnt >= states.length) {
        clearInterval(intervalId);
        hideProgressDialogBoxExt()
    }
}, 2000);