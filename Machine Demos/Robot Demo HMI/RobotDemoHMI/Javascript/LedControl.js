// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.760.48/runtimes/native1.12-tchmi/TcHmi.d.ts" />

TcHmi.EventProvider.register(`Robot1Panel.onAttached`, function (e, data) {
    let robot1 = new Robot(`robot1`);

    robot1.watchAtHome();
    robot1.watchAtPos1();
    robot1.watchAtPos2();
    robot1.watchMoving();
    robot1.watchTaskFailed();
    robot1.watchDirection();
    robot1.watchSensor01Status();
});


