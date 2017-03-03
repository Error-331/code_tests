'use strict';

export default async () => {
    class ExamplePersonClass1 {
        protected name: string;
        protected surname: string;

        protected age: number;

        public timestampCreated: number;

        constructor(name: string, surname: string, age: number) {
            this.timestampCreated = Date.now();

            this.name = name;
            this.surname = surname;

            this.age = age;
        }

        greet() {
            return 'Hello, ' + this.name + ' ' + this.surname;
        }
    }

    class ExamplePersonClass2 extends ExamplePersonClass1 {
        private docs: string[];

        constructor(name: string, surname: string, age: number, docs: string[]) {
            super(name, surname, age);

            this.docs = docs;
        }

        greet() {
            return 'Hi, ' + this.name;
        }

        getAvailableDocs() {
            return this.docs;
        }
    }


    class ExampleHumanClass {
        private name: string;

        constructor(name: string) {
            this.name = name;
        }
    }

    class ExampleAnimalClass {
        private name: string;

        constructor(name: string) {
            this.name = name;
        }
    }

    class ExamplePlankClass1 {
        protected readonly length: number;
        protected readonly width: number;

        public readonly perimeter: number;

        constructor(length: number, width: number) {
            this.length = length;
            this.width = width;

            this.perimeter = 2 * (width + length);
        }

        /*setLength(length) {
            this.length = length;
        }*/ // won't work
    }

    class ExamplePlankClass2 {
        public readonly perimeter: number;

        constructor(readonly length: number, readonly width: number) {
            this.perimeter = 2 * (width + length);
        }
    }

    class ExampleEmployeeClass1 {
        private _fullName: string;

        get fullName(): string {
            return this._fullName;
        }

        set fullName(newName: string) {
            this._fullName = 'Employee: ' + newName;
        }
    }

    class ExampleAPIFetcherClass1 {
        static apiURL = 'http://test.api.com/';

        getClientsURL(): string {
            return ExampleAPIFetcherClass1.apiURL + 'clients';
        }

        getSuppliersURL(): string {
            return ExampleAPIFetcherClass1.apiURL + 'suppliers';
        }
    }

    abstract class ExampleAbstractVehicleClass1 {
        protected name: string;

        constructor(protected type: string) {
        }

        public abstract move(): void;

        public setName(newName): void {
            this.name = newName;
        }
    }

    class ExampleCarClass1 extends  ExampleAbstractVehicleClass1 {
        public move() {
            return this.type + '(' + this.name + ')' + ' is moving ' + 'by wheels';
        }
    }

    let person1 = new ExamplePersonClass1('Maksim', 'Zaas', 26);
    let person2 = new ExamplePersonClass2('Peter', 'Zuskin', 55, ['passport', 'driver licence']);

    let humman1 = new ExampleHumanClass('Baz');
    let animal1 = new ExampleAnimalClass('Cherry');

    let plank1: ExamplePlankClass1;
    let plank2: ExamplePlankClass2;

    plank1 = new ExamplePlankClass1(10, 2);
    plank2 = new ExamplePlankClass2(15, 5);

    let employee1 = new ExampleEmployeeClass1();

    let apiFetcher1 = new ExampleAPIFetcherClass1();

    let car1 = new ExampleCarClass1('Car');
    car1.setName('Lamborghini');

    console.log('TypeScript classes examples');
    console.log('===========================');
    console.log('');

    console.log('Example class public property (ExamplePersonClass1.timestampCreated):', person1.timestampCreated);
    console.log('Example class public property (ExamplePersonClass2.timestampCreated):', person2.timestampCreated);

    console.log('');

    console.log('Example class method call (ExamplePersonClass1.greet()):', person1.greet());

    console.log('');

    console.log('Example class method call (ExamplePersonClass2.greet()):', person2.greet());
    console.log('Example class method call (ExamplePersonClass2.getAvailableDocs()):', person2.getAvailableDocs());

    console.log('');

    // humman1 = animal1; // Error: 'Animal' and 'Human' are not compatible

    console.log('Example plank 1 perimeter (ExamplePlankClass1):', plank1.perimeter);
    //plank1.perimeter = 30; // won't work

    console.log('Example plank 2 perimeter (ExamplePlankClass2):', plank2.perimeter);
    //plank2.perimeter = 50; // won't work

    console.log('');

    employee1.fullName = 'Tolik';
    console.log('Example employee 1 get/set example:', employee1.fullName);

    console.log('');

    console.log('Static method example 1 (ExampleAPIFetcherClass1):', apiFetcher1.getClientsURL());
    console.log('Static method example 2 (ExampleAPIFetcherClass2):', apiFetcher1.getSuppliersURL());

    console.log('');

    console.log('Example call to class method (move) that was specified in abstract class(ExampleAbstractVehicleClass1):', car1.move());

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}