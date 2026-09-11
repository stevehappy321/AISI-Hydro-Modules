// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.760.48/runtimes/native1.12-tchmi/TcHmi.d.ts" />

const red = { color: 'rgba(255, 32, 32, 1)' };
const green = { color: 'rgba(0,255,0,1)' };

const cmd = {
    IDLE: 0,
    HOME: 21,
    POS1: 22,
    POS2: 23,
    MOVE_UP: 24,
    MOVE_DOWN: 25
}

const step = {
    EXECUTE: 0,
    WAIT_FOR_MOTION: 1,
    WAIT_FOR_COMPLETION: 2,
    FINISHED: 3,
}

class Robot {
    constructor(serverName) {
        this.robotName = serverName;
        this.bAtHome = false;
        this.bAtPos1 = false;
        this.bAtPos2 = false;
        this.bMoving = false;
        this.sensorStatus = false;

        this.taskFailed = false;

        console.log(this.robotName);
    }

    watchAtHome() {
        let robotName = this.robotName;

        this.bAtHome = new TcHmi.Symbol(`%s%PLC1.MAIN.${robotName}::bAtHome%/s%`);
        let symbol = this.bAtHome;
        var destroySymbol = symbol.watch(function (data) {
            if (data.error === TcHmi.Errors.NONE) {
                var value = data.value;
                console.log(value);
                if (value) {
                    TcHmi.Controls.get(`${robotName}AtHomeLed`).setFillColor(green);
                }
                else {
                    TcHmi.Controls.get(`${robotName}AtHomeLed`).setFillColor(red);
                }
            }
            else {
                console.log(
                    `could not watch
                    PLC1.MAIN.${robotName}::bAtHome`);
            }
            // Stop watch inline
            // data.destroy(); // Call the destroy function inline to stop the watch and free resources. 
        });
    }

    watchAtPos1() {
        let robotName = this.robotName;

        this.bAtPos1 = new TcHmi.Symbol(`%s%PLC1.MAIN.${robotName}::bAtPos1%/s%`);
        let symbol = this.bAtPos1;
        var destroySymbol = symbol.watch(function (data) {
            if (data.error === TcHmi.Errors.NONE) {
                var value = data.value;
                console.log(value);
                if (value) {
                    TcHmi.Controls.get(`${robotName}AtPos1Led`).setFillColor(green);
                }
                else {
                    TcHmi.Controls.get(`${robotName}AtPos1Led`).setFillColor(red);
                }
            }
            else {
                console.log(
                    `could not watch
                    PLC1.MAIN.${robotName}::bAtPos1`);
            }
        });
    }

    watchAtPos2() {
        let robotName = this.robotName;

        this.bAtPos2 = new TcHmi.Symbol(`%s%PLC1.MAIN.${robotName}::bAtPos2%/s%`);
        let symbol = this.bAtPos2;
        var destroySymbol = symbol.watch(function (data) {
            if (data.error === TcHmi.Errors.NONE) {
                var value = data.value;
                console.log(value);
                if (value) {
                    TcHmi.Controls.get(`${robotName}AtPos2Led`).setFillColor(green);
                }
                else {
                    TcHmi.Controls.get(`${robotName}AtPos2Led`).setFillColor(red);
                }
            }
            else {
                console.log(
                    `could not watch
                    PLC1.MAIN.${robotName}::bAtPos2`);
            }
        });
    }

    watchMoving() {
        let robotName = this.robotName;

        this.bMoving = new TcHmi.Symbol(`%s%PLC1.MAIN.${robotName}::bMoving%/s%`);
        let symbol = this.bMoving;
        var destroySymbol = symbol.watch(function (data) {
            if (data.error === TcHmi.Errors.NONE) {
                var value = data.value;
                console.log(value);
                if (value) {
                    TcHmi.Controls.get(`${robotName}MovingLed`).setFillColor(green);
                }
                else {
                    TcHmi.Controls.get(`${robotName}MovingLed`).setFillColor(red);
                }
            }
            else {
                console.log(
                    `could not watch
                    PLC1.MAIN.${robotName}::bMoving`);
            }
        });
    }

    watchDirection() {
        let robotName = this.robotName;

        let symbol = new TcHmi.Symbol(`%s%PLC1.MAIN.${robotName}::cmd%/s%`);
        var destroySymbol = symbol.watch(function (data) {
            if (data.error === TcHmi.Errors.NONE) {
                var value = data.value;
                console.log(`${robotName}.cmd = ` + value);

                if (value === cmd.MOVE_UP) {
                    TcHmi.Controls.get(`${robotName}MovingUp`).setVisibility('Visible');
                }
                else {
                    TcHmi.Controls.get(`${robotName}MovingUp`).setVisibility('Hidden');
                }

                if (value === cmd.MOVE_DOWN) {
                    TcHmi.Controls.get(`${robotName}MovingDown`).setVisibility('Visible');
                }
                else {
                    TcHmi.Controls.get(`${robotName}MovingDown`).setVisibility('Hidden');
                }
            }
            else {
                console.log(data.error)
                console.log(TcHmi.Errors)
            }
        });
    }

    watchTaskFailed() {
        let robotName = this.robotName;

        this.taskFailed = new TcHmi.Symbol(`%s%PLC1.MAIN.${robotName}.taskFailed%/s%`);
        let symbol = this.taskFailed;
        var destroySymbol = symbol.watch(function (data) {
            if (data.error === TcHmi.Errors.NONE) {
                var value = data.value;
                console.log(`${robotName}.taskFailed = ` + value);
                if (value) {
                    TcHmi.Controls.get(`${robotName}TaskFailedLed`).setFillColor(red);
                }
                else {
                    TcHmi.Controls.get(`${robotName}TaskFailedLed`).setFillColor(null);
                }
            }
            else {
                console.log(data.error)
                console.log(TcHmi.Errors)
                console.log(
                    `could not watch
                    PLC1.MAIN.${robotName}::taskFailed`);
            }
        });
    }

    watchSensor01Status() {
        let robotName = this.robotName;

        this.sensorStatus = new TcHmi.Symbol(`%s%PLC1.MAIN.sensorBlock::bit1%/s%`);
        let symbol = this.sensorStatus;
        var destroySymbol = symbol.watch(function (data) {
            if (data.error === TcHmi.Errors.NONE) {
                var value = data.value;
                console.log(`SensorStatus01 = ` + value);
                if (value) {
                    TcHmi.Controls.get(`${robotName}Sensor01StatusLed`).setFillColor(green);
                }
                else {
                    TcHmi.Controls.get(`${robotName}Sensor01StatusLed`).setFillColor(red);
                }
            }
            else {
                console.log(data.error)
                console.log(TcHmi.Errors)
                console.log(
                    `could not watch
                    PLC1.MAIN.sensorBlock::bit1`);
            }
        });
    }
}