/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { initState, onEntryEntryJistsiRooms, onEntryNavigationStairs, onEntryRegister } from "./navigation";
import { initAllDoors, onEntryDoorsPoint, listenDoorsVariables } from "./doors";



// Waiting for the API to be ready
WA.onInit().then(async () => {
    initState()

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
    onEntryEntryJistsiRooms()

}).catch(e => console.error(e));



WA.room.area.onEnter("visibleNote").subscribe(async () => {
    console.log("Entering visibleNote layer");

});
export { };
