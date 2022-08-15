const obj1 = {
    subscriptionid: 502,
    subscriptioncustomer: 18,
};

// должна быть ошибка или undefined - но выведет 502
console.log(obj1[[[[ 'subscriptionid' ]]]]);

