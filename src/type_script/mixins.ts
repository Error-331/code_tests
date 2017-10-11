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
        protected isEngineWorking:boolean = false;

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
        protected _wheelsCount = 4;

        get wheelsCount():number {
            return this._wheelsCount;
        }

        set wheelsCount(wheelsCount: number) {
            this._wheelsCount = wheelsCount;
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
        _wheelsCount: number = 4;

        get wheelsCount() {return 4;}
    }

    applyMixins(VehicleClass, [EngineMixin, WheelsMixin]);

    let exampleVehicleObject1 = new VehicleClass();


    exampleVehicleObject1.startEngine();
    console.log(exampleVehicleObject1.getEngineStatus());

    console.log('Mixins examples');
    console.log('================');
    console.log('');

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}