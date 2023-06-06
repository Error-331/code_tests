function objectPropertiesToNormalize(usrObject) {
    for (const key in usrObject) {
        const newKey = key[0].toLowerCase() + key.substr(1);

        usrObject[newKey] = usrObject[key];
        delete usrObject[key];
    }

    return usrObject;
}

export {
    objectPropertiesToNormalize,
}