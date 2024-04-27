/// <reference types="@workadventure/iframe-api-typings" />

import { Popup } from "@workadventure/iframe-api-typings";
import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { initState, onEntryNavigationStairs, onEntryRegister } from "./navigation";
import { initAllDoors, onEntryDoorsPoint, listenDoorsVariables } from "./doors";



let currentPopup: Popup | undefined;

// Waiting for the API to be ready
WA.onInit().then(async () => {
    initState()
    WA.room.area.onEnter('clock').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup", "It's " + time, []);
    })

    WA.state.onVariableChange("room-state").subscribe((e) => {
        console.log("room-state", e)
    })

    let noteWebsite: any;
    WA.room.area.onEnter('getinfo').subscribe(async () => {
        const userInfo = WA.player.state.informations;
        if(!userInfo) {
            noteWebsite = await WA.ui.website.open({
                url: "./formulaire.html",
                position: {
                    vertical: "top",
                    horizontal: "middle",
                },
                size: {
                    height: "120vh",
                    width: "50vw",
                },
                margin: {
                    top: "3vh",
                },
                allowApi: true,
            });
        }
    });
    WA.room.area.onLeave("getinfo").subscribe(() => {
        noteWebsite.close();
    });

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

    initAllDoors()
    onEntryDoorsPoint()
    listenDoorsVariables()
    onEntryRegister()
    onEntryNavigationStairs()

}).catch(e => console.error(e));



WA.room.area.onEnter("visibleNote").subscribe(async () => {
    console.log("Entering visibleNote layer");

});
export { };
