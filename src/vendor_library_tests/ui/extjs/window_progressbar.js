let progressBarExt = null;
let progressBarContainerExt = null;
let progressBarWindowExt = null;

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