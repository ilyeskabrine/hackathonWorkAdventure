/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { initAllDoors, onEntryDoorsPoint, listenDoorsVariables } from "./doors";


WA.onInit().then(() => {
    console.log('Player tags: ',WA.player.tags)

    console.log('Player ID: ', WA.player.id);
    let noteWebsite: any;
    WA.room.area.onEnter('getinfo').subscribe(async () => {
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
    });
    WA.room.area.onLeave("getinfo").subscribe(() => {
        noteWebsite.close();
    });

    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

    initAllDoors()
    onEntryDoorsPoint()
    listenDoorsVariables()

}).catch(e => console.error(e));













var Patient1 = {
    id:'1',
    nom: 'nom',
    prenom: 'prenom',
    age: 'age',
    symptomes: 'symptome'
};
var Patient2 = {
    id:'1',
    nom: 'nom',
    prenom: 'prenom',
    age: 'age',
    symptomes: 'symptome'
};


WA.state.saveVariable('patients', {
    Patient1,
    Patient2
 
}).catch(e => console.error('Something went wrong while saving variable', e));


WA.room.area.onEnter("visibleNote").subscribe(async () => {
    console.log("Entering visibleNote layer");

});
export {};
