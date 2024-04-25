/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

const formContainer =document.getElementById("formContainer");
const firstName = document.getElementById("nom") as HTMLTextAreaElement;
const lastName = document.getElementById("prenom") as HTMLTextAreaElement;
const doctorName = document.getElementById("medecin") as HTMLTextAreaElement;
const message = document.getElementById("message") as HTMLTextAreaElement;

const submitButton = document.getElementById("submitButton") as HTMLButtonElement;


console.log('Script started successfully');

// Waiting for the API to be ready
WA.onInit().then(() => {
    WA.state.saveVariable('patients', {
    
    }).catch(e => console.error('Something went wrong while saving variable', e));

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

    //let pat=JSON.stringify(WA.state.patients);
    let patt=WA.state.patients;
    console.log("*************");
    console.log(patt);
    console.log("*************");



    

}).catch(e => console.error(e));












// let pat=JSON.stringify(patt);
// console.log(pat);

 

WA.room.area.onEnter("visibleNote").subscribe(async () => {
    console.log("Entering visibleNote layer");

});
export {};
