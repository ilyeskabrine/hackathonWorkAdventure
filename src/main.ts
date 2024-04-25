/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";



console.log('Script started successfully');

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
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
                height: "100vh",
                width: "50vw",
            },
            margin: {
                top: "10vh",
            },
            allowApi: true,
        });
        WA.controls.disablePlayerControls();
    });






    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

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

//let pat=JSON.stringify(WA.state.patients);
let patt=WA.state.patients;
console.log(patt.Patient1);
console.log("jhgf");

// let pat=JSON.stringify(patt);
// console.log(pat);

 

WA.room.area.onEnter("visibleNote").subscribe(async () => {
    console.log("Entering visibleNote layer");

});
export {};
