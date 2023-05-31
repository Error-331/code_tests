import { isNil } from './logic_utils';

function debounce(usrFunc, waitTime) {
    let timeoutCancel = null;

    return function() {
        if (!isNil(timeoutCancel)) {
            clearTimeout(timeoutCancel);
        }

        timeoutCancel = setTimeout(usrFunc, waitTime);
    }
}

export {
    debounce
}