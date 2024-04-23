/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)
   WA.room.area.onEnter("Panel").subscribe(() => {
        
    console.log("hello le world !");
      });
    WA.room.area.onEnter('clock').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup", "It's " + time, []);
    })
    WA.room.onEnterLayer('chat').subscribe(() => {
        WA.chat.open();
    });
    WA.room.area.onLeave('clock').subscribe(closePopup)

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

function closePopup(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};
