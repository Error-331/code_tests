'use strict';

export default async () => {
    function applyMixins(derivedCtor: any, baseCtors: any[]) {
        baseCtors.forEach(baseCtor => {
            Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            });
        });
    }

    class EngineMixin {
        isEngineWorking:boolean = false;

        public startEngine() {
            this.isEngineWorking = true;
        }

        public stopEngine() {
            this.isEngineWorking = false;
        }

        public getEngineStatus(): boolean {
            return this.isEngineWorking;
        }
    }

    class WheelsMixin {
        wheelsCount:number = 4;

        getWheelsCount(): number {
            return this.wheelsCount;
        }

        setWheelsCount(wheelsCount: number) {
            this.wheelsCount = wheelsCount;
        }
    }

    class VehicleClass implements EngineMixin, WheelsMixin {
        constructor() {

        }

        // Engine
        isEngineWorking: boolean = false;

        startEngine: () => void;
        stopEngine: () => void;
        getEngineStatus() {return false;}

        // Wheels
        wheelsCount: number = 4;

        getWheelsCount():number {return 0};
        setWheelsCount: (wheelsCount: number) => void;
    }

    applyMixins(VehicleClass, [EngineMixin, WheelsMixin]);
    let exampleVehicleObject1 = new VehicleClass();

    console.log('Mixins examples');
    console.log('================');
    console.log('');

    exampleVehicleObject1.startEngine();
    console.log('start => exampleVehicleObject1.getEngineStatus():', exampleVehicleObject1.getEngineStatus());

    exampleVehicleObject1.stopEngine();
    console.log('stop => exampleVehicleObject1.getEngineStatus():', exampleVehicleObject1.getEngineStatus());

    console.log('');

    exampleVehicleObject1.setWheelsCount(6);
    console.log('set 6 => exampleVehicleObject1.getWheelsCount()', exampleVehicleObject1.getWheelsCount());

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}