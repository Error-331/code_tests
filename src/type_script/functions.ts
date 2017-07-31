'use strict';

export default () => {

    interface Person {
        name: string;
        surname: string;
        age: number;

        docs: string[];
    }

    interface Register {
        addBeforeRegisterListener(onBeforeRegister: (this: void, registerNumber: number) => void): void;
    }

    class Car {
        name: string;

        constructor(name: string) {
            this.name = name;
        }

        onBeforeRegister(this:void, registerNumber): void {
            console.log('register', registerNumber);
        }
    }

    let personObj1 = {
        name: 'Maksim',
        surname: 'Zaas',
        age: 26,

        docs: ['passport', 'foreign passport', 'driver licence'],

        log: function(this: Person) {
            console.log('Name:', this.name);
            console.log('Surname:', this.surname);
            console.log('Age:', this.age);
            console.log('Docs:', this.docs);
        }
    };

    class VehicleRegister implements Register {
        vehicleBeforeRegisterHandlers: any[] = [];

        addBeforeRegisterListener(handler): void {
            this.vehicleBeforeRegisterHandlers.push(handler)
        }

        registerVehicles(): void {
            this.vehicleBeforeRegisterHandlers.forEach((beforeCallback, index) => {
                beforeCallback(index + 1);
            });
        }
    }

    function exampleFunction1(param1: number, param2: number): number {
        return param1 + param2;
    }

    let exampleFunction2: (param1: number, param2: number) => number = function(param1: number, param2: number): number { return param1 + param2; }; // example function type

    function exampleFunction3(firstName: string, lastName?: string) {
        if (lastName)
            return firstName + " " + lastName;
        else
            return firstName;
    }

    function exampleFunction4(firstName: string, lastName: string = 'Smersh') {
        if (lastName)
            return firstName + " " + lastName;
        else
            return firstName;
    }

    function exampleFunction5(firstName: string = 'Misha', lastName: string) {
        if (lastName)
            return firstName + " " + lastName;
        else
            return firstName;
    }

    function exampleFunction6(firstName: string, ...restOfName: string[]) {
        return firstName + " " + restOfName.join("-");
    }

    function personHavePassport(person:Person): boolean;
    function personHavePassport(docs: string[]): boolean;
    function personHavePassport(data): any {
        if (data instanceof Array) {
            return data.indexOf('passport') !== -1;
        } else {
            return data.docs.indexOf('passport') !== -1;
        }
    }

    console.log('TypeScript functions examples');
    console.log('=============================');
    console.log('');

    console.log('Simple example function that adds two numbers:', exampleFunction1(2, 3));
    console.log('Same, but using function type:', exampleFunction2(4, 5));

    console.log('');

    console.log('Function that has optional parameters (one parameter):', exampleFunction3('Maksim'));
    console.log('Function that has optional parameters (two parameters):', exampleFunction3('Maksim', 'Zaas'));

    console.log('');

    console.log('Function that has default value for second parameter:', exampleFunction4('Boris'));
    console.log('Function that has default value for first parameter:', exampleFunction5(undefined, 'Zhenkov'));
    console.log('Function that implements "rest" parameter:', exampleFunction6('Peter', 'Kitai', 'Gorodsky'));

    console.log('');

    console.log('Testing object method while specifying "this":');
    console.log('');
    personObj1.log();
    console.log('');

    console.log('Example usage of "function as callback":');
    console.log('');

    let exampleCar1 = new Car('BMW');
    let vehicleRegister1 = new VehicleRegister();

    vehicleRegister1.addBeforeRegisterListener(exampleCar1.onBeforeRegister);
    vehicleRegister1.registerVehicles();

    console.log('');

    console.log('Function overload example:');
    console.log('');

    console.log(personHavePassport(personObj1));
    console.log(personHavePassport(personObj1.docs));

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}