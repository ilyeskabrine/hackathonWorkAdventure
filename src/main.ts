/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

const generateRandomNumber = () => {
    return Math.floor(Math.random() * 100) + 1;
}

const initState = () => {
    const waitingRoom = WA.state.loadVariable("waiting-room")
    if (!waitingRoom) {
        WA.state.saveVariable("waiting-room", {
            actualRoom: "hopital-1"
        });
    }
}

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ', WA.player.tags)
    initState()
    WA.room.area.onEnter('clock').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup", "It's " + time, []);
    })

    WA.room.area.onLeave('clock').subscribe(closePopup)

    WA.room.onEnterLayer("stairs_zone").subscribe(() => {
        const room = `hopital-${generateRandomNumber()}`
        WA.state.saveVariable("waiting-room", {
            actualRoom: room
        });
        WA.nav.goToRoom(`https://play.workadventu.re/_/${room}/localhost:5173/map.tmj`)
    })

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));



WA.room.area.onEnter('test-area').subscribe(() => {
    currentPopup = WA.ui.openPopup("clockPopup", "Bienvenue dans la magie clinique", []);
    console.log("Here welcome");
})

WA.room.area.onLeave('test-area').subscribe(closePopup);

function closePopup() {
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export { };
